import Navbar from "/pages/components/Navbar";
import prisma from "lib/prisma";
import { getVideo, getVideos } from "lib/data";
import Link from "next/link";
import timeago from "lib/timeago";
import Video from "pages/components/Video";
import Head from "next/head";
import dynamic from "next/dynamic";
import { useEffect } from 'react'
const ReactPlayer = dynamic(() => import("react-player/lazy"), { ssr: false });

export default function SingleVideo({ video, videos }) {
  if (!video) return "no video in singlevideo page";
  
	useEffect(() => {
	  const incrementViews = async () => {
      await fetch('/api/view', {
        body: JSON.stringify({
          video: video.id,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      })
    }
    incrementViews()
  }, [])


  return (
    <div className="bg-black h-full text-white">
      <Head>
        <title>{video.title}</title>
        <meta name="description" content={video.title} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="navigation-bar">
        <Navbar />
      </div>
      <header className="grid grid-cols-3">
        {/* video for id */}
        <div className="col-span-2">
          <div className="p-4">
            <div className="">
              <div className="">
                <ReactPlayer
                  className="react-player h-3/5"
                  url={video.url}
                  width="100%"
                  controls={true}
                  light={video.thumbnail}
                />
              </div>

              <div className="minutes w-10 bg-black">
                <span>
                  {Math.floor(video.length / 60)
                    .toString()
                    .padStart(2, "0")}
                  :{(video.length % 60).toString().padStart(2, "0")}
                </span>
              </div>
            </div>

            <div className="attributes relative bottom-6 py-2">
              <div className="author cursor-pointer text-gray-400 border-b-2 border-gray-600 py-2">
                <Link href={`/video/${video.id}`}>
                  <h5 className="text-xl text-white hover:text-gray-500 tracking-widest">
                    {video.title}
                  </h5>
                </Link>

                <p>
                  {video.views + 1} Views·
                  <span>{timeago.format(new Date(video.createdAt))}</span>
                </p>
              </div>

              <div className="author-name-views-timeago text-gray-400 cursor-pointer flex space-x-4 py-4">
                <div className="">
                  {video.author.image && (
                    <Link href={`/video/${video.id}`}>
                      <img
                        src={video.author.image}
                        className="w-10 h-10 rounded-full"
                      />
                    </Link>
                  )}
                </div>
                <div className="">
                  <Link href={`/channel/${video.author.username}`}>
                    <p className="hover:border-b border-gray-400 w-24">
                      {video.author.name}
                    </p>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* video for others */}
        <div className="hidden md:block flex flex-wrap py-4 px-4">
          {videos.map((video, index) => (
            <Video video={video} key={index} />
          ))}
        </div>
      </header>
    </div>
  );
}

export async function getServerSideProps(context) {
  let video = await getVideo(context.params.id, prisma);
  video = JSON.parse(JSON.stringify(video));

  let videos = await getVideos({ take: 3 }, prisma);
  videos = JSON.parse(JSON.stringify(videos));

  return {
    props: {
      video,
      videos,
    },
  };
}
