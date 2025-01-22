import getSession from "@/lib/session";
import { redirect } from "next/navigation";
import { getUser, logOut } from "./actions";

export default async function Profile() {
  const user = await getUser();

  return (
    <div>
      <h1>Welcome! {user?.username}!</h1>
      <form action={logOut}>
        <button>Log out</button>
      </form>
    </div>
  );
}
