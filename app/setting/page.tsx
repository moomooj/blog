import DeleteAccount from "./ui/deleteAccount";
import EditEmail from "./ui/editEmail";
import EditUsername from "./ui/editUsername";
import EditAvatar from "./ui/editAvatar";
import getSession from "@/lib/session";
import { notFound } from "next/navigation";
import { getUser } from "./action";

export default async function SettingsPage() {
  const session = await getSession();
  if (!session.id) {
    return notFound();
  }
  const user = await getUser();

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg space-y-6">
      <EditAvatar avatar={user?.avatar} userId={session.id} />
      <EditUsername username={user?.username} userId={session.id} />
      <EditEmail email={user?.email} userId={session.id} />
      <DeleteAccount />
    </div>
  );
}
