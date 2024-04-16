import Link from "next/link";
import { UserButton, auth } from "@clerk/nextjs";
export default async function Home() {
  const {userId} = auth();
  let href = userId ? '/journal' : '/new-user';

  return (
    <div className="w-screen h-screen bg-black flex justify-center items-center text-white">
      <div className="w-full max-w-[45ch] m-auto">
        <h1 className="text-6xl mb-4">MOOD</h1>
        <p className="text-2xl text-white/60 mb-4">Track your modd though out your life. All you have to do is be honest.</p>
        <div>
            <Link href={href}>
                <button className="bg-blue-600 py-2 px-4 rounded-lg font-semibold">Get started</button>
            </Link>
            <div className="absolute top-24 right-24">
                <UserButton/>
            </div>
        </div>
      </div>
    </div>
  );
}
