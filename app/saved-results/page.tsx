import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "../db/prisma";
import { Separator } from "@/components/ui/separator";
import Nav from "@/components/Nav";

const Page = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const chatResults = await prisma.chat.findMany({
    where: {
      userId: user?.id,
    },
  });

  return (
    <main>
      <Nav />
      <div className="m-5">
        {chatResults.map((chatResult) => (
          <div key={chatResult.id} className="m-3">
            <div className="text-2xl font-semibold mb-3">{chatResult.title}</div>
            <div>{chatResult.message}</div>
            <Separator className="my-5"/>
          </div>
        ))}
      </div>
    </main>
  );
};
export default Page;
