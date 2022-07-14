import prisma from "lib/prisma";
import { getUser, getVideos } from "lib/data.js";
import Link from "next/link";
import timeago from "lib/timeago";
import Image from "next/image";
import Navbar from "pages/components/Navbar";
import SubscribedButton from "pages/components/subscribedButton";
import Head from "next/head";
import LoadMore from "lib/config";
import { useState } from "react";
import { amount } from "lib/config";
import { getSubscribersCount, isSubscribed } from "lib/data";
import { useSession, getSession } from "next-auth/react";
import SideBar from "pages/components/SideBar";
import dynamic from "next/dynamic";
const ReactPlayer = dynamic(() => import("react-player/lazy"), { ssr: false });

export default function Channel({
  user,
  initialVideos,
  subscribers,
  subscribed,
}) {
  const [videos, setVideos] = useState(initialVideos);
  const [loadmore, showLoadmore] = useState(videos.length < amount);
  const { data: session, status } = useSession();

  const loading = status === "loading";

  if (loading) return "loading";

  if (!user)
    return <p className="text-center p-5">Channel does not exist 😞</p>;

  return (
    <div className="bg-black text-white h-full">
      <Head>
        <title>Channel of {user.name}</title>
        <meta name="description" content={`Channel of ${user.name}`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="navigation-bar">
        <Navbar />
      </div>

      <div className="flex">
        <div>
          <SideBar />
        </div>
        <div className="px-8">
          <div className="flex justify-center border-b border-gray-800">
            <div className=" ">
              <div className="flex  m-5">
                <div className="">
                  {user.image && (
                    <img
                      className="w-20 h-20 mt-2 mr-2 rounded-full"
                      src={user.image}
                    />
                  )}
                </div>

                <div className="mt-5">
                  <div className="flex space-x-4">
                    <div className="">
                      <p className="text-lg font-bold text-white">
                        {user.name}
                      </p>
                      <p>{subscribers} subscribers</p>
                    </div>

                    <div className="">
                      {session && user.id === session.user.id ? (
                        <>
                          <Link href={`/upload`}>
                            <a className="bg-green-500 px-3 py-2  rounded-md">
                              Upload new video
                            </a>
                          </Link>
                        </>
                      ) : (
                        <SubscribedButton user={user} subscribed={subscribed} />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="" w-full>
            {videos.map((video, index) => (
              <div className="px-4 py-8" key={index}>
                <div className="thumbnail-minutes">
                  <div className="w-fit">
                    {video.thumbnail && (
                      <Link href={`/video/${video.id}`}>
                        <ReactPlayer
                          className="react-player"
                          url={video.url}
                          width="2000%"
                          controls={true}
                          light={video.thumbnail}
                        />
                      </Link>
                    )}
                  </div>
                  <div className="w-10 minutes bg-black left-10 text-red-500 bottom-8">
                    <span>
                      {Math.floor(video.length / 60)
                        .toString()
                        .padStart(2, "0")}
                      :{(video.length % 60).toString().padStart(2, "0")}
                    </span>
                  </div>
                </div>

                <div className="attributes relative bottom-6 flex space-x-6">
                  <div className="author cursor-pointer">
                    {video.author.image && (
                      <Link href={`/video/${video.id}`}>
                        <img
                          src={video.author.image}
                          className="w-10 h-10 rounded-full"
                        />
                      </Link>
                    )}
                  </div>

                  <div className="title-name-views-timeago text-gray-400 cursor-pointer">
                    <Link href={`/video/${video.id}`}>
                      <h5 className="text-xl text-white hover:text-gray-500">
                        {video.title}
                      </h5>
                    </Link>
                    <Link href={`/channel/${video.author.username}`}>
                      <p className="hover:border-b border-gray-400 w-24">
                        {video.author.name}
                      </p>
                    </Link>
                    <p>
                      <span>{video.views} Views·</span>
                      <span>{timeago.format(new Date(video.createdAt))}</span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="pagination text-center py-2">
            {!loadmore && (
              <LoadMore
                videos={videos}
                setVideos={setVideos}
                showLoadmore={showLoadmore}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  let user = await getUser(context.params.username, prisma);
  user = JSON.parse(JSON.stringify(user));

  let videos = await getVideos({ author: user.id }, prisma);
  videos = JSON.parse(JSON.stringify(videos));

  let subscribers = await getSubscribersCount(context.params.username, prisma);
  subscribers = JSON.parse(JSON.stringify(subscribers));

  const session = await getSession(context);

  let subscribed = null;
  if (session) {
    subscribed = await isSubscribed(session.user.username, user.id, prisma);
  }

  return {
    props: {
      initialVideos: videos,
      user,
      subscribers,
      subscribed,
    },
  };
}
