import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import Link from "next/link";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Brain, BrainCircuit, BrainCog } from "lucide-react";

const Nav = () => {
  return (
    <main>
      <div className="flex justify-between p-3">
        <div className="flex gap-2 items-center">
          <Brain className="w-10 h-10 " />
          <Link className="text-2xl font-semibold" href="/">
            AI Chat
          </Link>
        </div>
        <div className="flex gap-3 items-baseline">
          <Link href="/saved-results">Saved Results</Link>
          <LogoutLink>
            <Button>Logout</Button>
          </LogoutLink>
        </div>
      </div>
      <Separator className="shadow" />
    </main>
  );
};
export default Nav;
