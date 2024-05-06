import Link from "next/link";
import { UserButton, auth } from "@clerk/nextjs";
export default async function Home() {
  const {userId} = auth();
  let href = userId ? '/journal' : '/new-user';

  return (
      <div className="w-screen h-screen max-h-full bg-white flex justify-center items-center text-black/80 bg-center  px-4"
      >

          <div className="w-full max-w-[95ch] m-auto backdrop-blur-3xl text-white pt-12 pb-8 pl-12 pr-24 rounded-2xl bg-white/40">
              <h1 className="text-5xl mb-4 text-transparent font-semibold bg-gradient-to-br from-indigo-900 via-indigo-300 to-550% to-blue-800 bg-clip-text">Mood AI</h1>
              <p className="mb-16 text-black/75">Track your mood though out your life. Fully encrypted journal with history chart and AI summaries for your well being.</p>
              <div>
                  <Link href={href}>
                      <button className="bg-gradient-to-br from-violet-100 to-blue-200 py-2 px-4 rounded-lg font-semibold text-emerald-950">Get started</button>
                  </Link>
              </div>
          </div>
          <div className="absolute top-8 right-8">
              <UserButton/>
          </div>
      </div>
  );
}
