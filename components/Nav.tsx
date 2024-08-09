import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import Link from "next/link";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

const Nav = () => {
  return (
    <main>
      <div className="flex justify-between items-center p-3">
        <div className="flex gap-2 items-center">
          <Link href="/">AI Chat</Link>
          <Link href="/saved-results">Saved Results</Link>
        </div>
        <LogoutLink>
          <Button>Logout</Button>
        </LogoutLink>
      </div>
      <Separator className="shadow" />
    </main>
  );
};
export default Nav;
