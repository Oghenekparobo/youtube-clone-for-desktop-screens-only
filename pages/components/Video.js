import timeago from "lib/timeago";
import Link from "next/link";
// import Image from "next/image";
import dynamic from "next/dynamic";
const ReactPlayer = dynamic(() => import("react-player/lazy"), { ssr: false });

export default function Video({ video }) {
  return (
    <div className="px-4">
      <div className="">
        <div className="thumbnail-minutes py-4">
          <div className="">
            <ReactPlayer
              className="react-player h-3/5"
              url={video.url}
              width="100%"
              controls={true}
              light={video.thumbnail}
            />
          </div>
          <div className="minutes  w-10 bg-black">
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
              {video.views} Views·
              <span>{timeago.format(new Date(video.createdAt))}</span>
            </p>
          </div>
        </div>
      </div>

    
    </div>
  );
}
