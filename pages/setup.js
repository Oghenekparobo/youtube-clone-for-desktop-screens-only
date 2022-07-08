import Head from "next/head";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Setup() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const { data: session, status } = useSession();
  const router = useRouter();

  const loading = status === "loading";

  if (loading) return "loading";

  if (session.user.name) {
    router.push("/");
  }

  return (
    <div className="flex justify-center pt-20">
      <Head>
        <title>Setup Account</title>
        <meta name="description" content="set up username" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="">
        <div className="signin-form space-y-6 border px-10 py-4 shadow">
          <div className="text text-center space-y-2">
            <h6 className="text-2xl font-bold">
              <span className="text-blue-500">G</span>
              <span className="text-red-500">o</span>
              <span className="text-yellow-500">o</span>
              <span className="text-blue-500">g</span>
              <span className="text-green-500">l</span>
              <span className="text-orange-500">e</span>
            </h6>
            <h4 className="text-2xl">Sign in</h4>
            <p className="">
              to continue to YouTube
              <span className="text-gray-300"> by Stephen</span>
            </p>
          </div>

          <div className="form">
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const body = new FormData();
                body.append("name", name);
                body.append("username", username);
                body.append("image", image);

                await fetch("/api/setup", {
                  body,
                  method: "POST",
                });

                session.user.name = name;
                session.user.username = username;
                router.push('/');
              }}
            >
              <div className="flex flex-col justify-center space-y-8">
                <div className="">
                  <p className="input-placeholder input-name"></p>
                  <input
                    name="name"
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    className="border   border-blue-700 w-full py-2 outline-none hover:border-blue-800 transition"
                    required
                  />
                  <p className=" text-blue-700">Enter name</p>
                </div>

                <div className="">
                  <p className="input-placeholder input-name"></p>
                  <input
                    name="username"
                    type="text"
                    onChange={(e) => setUsername(e.target.value)}
                    className="border   border-blue-700 w-full py-2 outline-none hover:border-blue-800 transition"
                    required
                  />
                  <p className=" text-blue-700">Forgot username?</p>
                </div>

                <div className="text-sm text-gray-600 ">
                  <label className="relative font-medium cursor-pointer underline my-3 block">
                    {!imageUrl && (
                      <p className=" text-blue-700">select profile pic</p>
                    )}
                    <img src={imageUrl} className="h-20   w-full" />
                    <input
                      name="image"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      required
                      onChange={(event) => {
                        if (event.target.files && event.target.files[0]) {
                          if (event.target.files[0].size > 3072000) {
                            alert("Maximum size allowed is 3MB");
                            return false;
                          }
                          setImage(event.target.files[0]);
                          setImageUrl(
                            URL.createObjectURL(event.target.files[0])
                          );
                        }
                      }}
                    />
                  </label>
                </div>
                {/* <div className="cursor-pointer">
                  {!imageUrl && (
                    <p className=" text-blue-700">select profile pic</p>
                  )}

                  <img src={imageUrl} className="h-20   w-full " />
                  <input
                
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        if (e.target.files[0].size > 3072000) {
                          alert("image is greater 3mb");
                          return false;
                        }

                        setImage(e.target.files[0]);
                        setImageUrl(URL.createObjectURL(e.target.files[0]));
                      }
                    }}
                    className="border border-blue-700 h-20 hidden   w-full py-2 outline-none hover:border-blue-800 transition"
                    
                  />
                </div> */}

                <div className="">
                  <div className="c-text">
                    <p className="text-sm">
                      Not your computer? Use Guest mode to sign in privately
                    </p>
                    <a href="#" className="text-blue-700">
                      Learn more
                    </a>
                  </div>
                </div>

                <div className="">
                  <div className="links flex justify-between">
                    <a href="#" className="text-blue-700">
                      Create account
                    </a>
                    <button
                      type="submit"
                      className="bg-blue-700 text-white py-2 px-4 rounded"
                    >
                      submit
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>

        <div className="t-c flex justify-between py-4">
          <div className="">
            <select disabled>
              <option value="eng">English(United States)</option>
            </select>
          </div>
          <div className="">
            <ul className="flex space-x-4">
              <li>
                <a href="#">Help</a>
              </li>
              <li>
                <a href="#">Privacy</a>
              </li>
              <li>
                <a href="$">Terms</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
