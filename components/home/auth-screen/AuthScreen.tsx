import {
  LoginLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { ArrowRightIcon } from "@radix-ui/react-icons";

const AuthScreen = () => {
  return (
    <main className="flex items-center bg-center bg-no-repeat bg-cover bg-[url('https://www.microsoft.com/en-us/research/uploads/prod/2023/03/AI_Microsoft_Research_Thumbnail_1400x788.png')] bg-gray-500 bg-blend-multiply h-[100vh] ">
      <div className="px-4 mx-auto max-w-screen-xl max-h-full text-center py-24 lg:py-56">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">
          AI Chat
        </h1>
        <p className="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">
          Engage Smarter: Your AI-Powered Chat Companion.
        </p>
        <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
          <LoginLink className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">
            Sign in
            <ArrowRightIcon className="w-5 h-5 ml-2" />
          </LoginLink>

          <RegisterLink className="inline-flex justify-center hover:text-gray-900 items-center py-3 px-5 sm:ms-4 text-base font-medium text-center text-white rounded-lg border border-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-400">
            Sign Up
          </RegisterLink>
        </div>
      </div>
    </main>
  );
};
export default AuthScreen;
