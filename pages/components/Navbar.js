import { useSession } from "next-auth/react";
import { BsYoutube, BsListStars } from "react-icons/bs";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Navbar() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const loading = status === "loading";
  if (loading) return null;
  if (!session) {
    router.push("/");
  }

  return (
    <div className="grid grid-cols-3 items-center p-4 nav ">
      <div className="">
        <div className="banner flex space-x-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
          <span className="flex items-center cursor-pointer">
            <span className="text-red-500">
              <BsYoutube />
            </span>
            <span className="font-bold hover:text-gray-300">
              <Link href="/"> YouTube</Link>
            </span>
          </span>
        </div>
      </div>

      <div className="search-bar flex">
        <input
          type="search"
          name=""
          id=""
          className=" bg-black outline-none h-8 relative top-1 py-3 w-80"
          placeholder="search"
        />
        <div className="sch p-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      <div className="flex justify-evenly">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
          />
        </svg>
        <span className="text-xl">
          <BsListStars />
        </span>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
          />
        </svg>
        {!session ? (
          <a
            href="api/auth/signin"
            className="flex rounded hover:text-blue-900 text-blue-500 border border-blue-500 py-0.5 px-2 hover:bg-blue-300 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 pr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            SIGN IN
          </a>
        ) : (
          <div className="flex space-x-2">
            <span>
              <img
                src={session.user.image}
                className="h-8 mr-2 mb-2 -mt-1 w-8 rounded-full"
              />
            </span>
            <span>{session.user.name}</span>
            <a
              href=""
              className="flex rounded hover:text-blue-900 text-blue-500 border border-blue-500 py-0.5 px-2 hover:bg-blue-300 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 pr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              LOGOUT
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
