import Header from "./components/Header";
import Navbar from "./components/Navbar";
import SideBar from "./components/SideBar";
import prisma from "lib/prisma";
import { getVideos } from "lib/data";
import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

export default function Home({ initialVideos }) {
  const [videos, setVideos] = useState(initialVideos);

  const { data: session, status } = useSession();
  const router = useRouter();

  const loading = status === "loading";

  if (loading) {
    return 'loading';
  }

  if (session && !session.user.name) {
    router.push('/setup');
  }

  return (
    <div className="bg-black text-white relative">
      <Head>
        <title>YouTube Clone</title>
        <meta name="description" content="A great YouTube Clone" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="navigation-bar shadow">
        <Navbar />
      </div>

      <div className="section flex  relative">
        <div className="sidebar-section h-full">
          <SideBar />
        </div>

        <div className="header-section">
          <Header videos={videos} setVideos={setVideos} />
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  let videos = await getVideos({}, prisma);
  videos = JSON.parse(JSON.stringify(videos));

  return {
    props: {
      initialVideos: videos,
    },
  };
}
