import { AiFillHome, AiOutlineHistory } from "react-icons/ai";
import { MdExplore } from "react-icons/md";
import { HiLibrary } from "react-icons/hi";
import { SiYoutubegaming } from "react-icons/si";
import Link from "next/link";

export default function SideBar() {
  return (
    <div className="">
      <div className="flex sidebar flex-col w-26  h-screen space-y-10">
        <div className="home">
          <span className="text-white">
            <AiFillHome />
          </span>
          Home
        </div>

        <div className="explore">
          <span className="text-white">
            <MdExplore />
          </span>
          Explore
        </div>

        <div className="history">
          <span className="text-white">
            <SiYoutubegaming />
          </span>
          Shorts
        </div>

        <div className="history">
          <span className="text-white">
            <HiLibrary />
          </span>
          Library
        </div>
        <div className="history text-sm cursor-pointer">
          <span className="text-white">
            <SiYoutubegaming />
          </span>
          <Link href="/subscriptions">Subscriptions</Link>
        </div>

        <div className="history">
          <span className="text-white">
            <AiOutlineHistory />
          </span>
          History
        </div>
      </div>
    </div>
  );
}
