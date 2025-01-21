import getSession from "@/lib/session";
import { redirect } from "next/navigation";
import { getUser } from "./actions";

export default async function Profile() {
  const user = await getUser();
  console.log(user);
  const logOut = async () => {
    "use server";
    const session = await getSession();
    await session.destroy();
    redirect("/");
  };

  return (
    <div>
      <h1>Welcome! {user?.username}!</h1>
      <form action={logOut}>
        <button>Log out</button>
      </form>
    </div>
  );
}
