import { SignIn } from "@clerk/nextjs";
import Link from "next/link";

const SignInPage = () => {
  return (
      <div className="w-full h-screen bg-center bg-gradient-to-t from-blue-300 to-violet-100 flex flex-col gap-12 justify-center items-center">
        <SignIn />
          <Link href="/">
              <p className="font-medium underline-offset-2 underline">Go back</p>
          </Link>
      </div>
  );
}
export default SignInPage
