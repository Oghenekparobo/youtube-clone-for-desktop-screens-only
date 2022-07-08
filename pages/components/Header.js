import MiniNav from "./MiniNav";
import Video from "./Video";
import LoadMore from "lib/config";
import { useState } from "react";
import { amount } from "lib/config";

export default function Header({ videos, setVideos , subscriptions}) {
  const [loadmore, showLoadmore] = useState(videos.length < amount);

  if (!videos) return "no videos in homepage";
  return (
    <div className="header">
      <MiniNav />
      <div className="">
        {videos.length === 0 && (
          <p className="flex justify-center mt-20">No videos found!</p>
        )}

        <div className="grid grid-cols-3 px-4 ">
          {videos.map((video, index) => (
            <Video video={video} key={index} />
          ))}
        </div>
        <div className="pagination text-center py-2">
          {!loadmore && (
            <LoadMore
              videos={videos}
              setVideos={setVideos}
              showLoadmore={showLoadmore}
              subscriptions={subscriptions}
            />
          )}
        </div>
      </div>
    </div>
  );
}
