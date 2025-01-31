export default function EditAvatar({
  avatar,
  userId,
}: {
  avatar: string | undefined;
  userId: number;
}) {
  return (
    <>
      <div className="flex justify-center">
        <div className="relative w-32 h-32">
          <div className="absolute inset-0 rounded-full overflow-hidden border-4 border-gray-300"></div>
        </div>
      </div>
      <div className="flex justify-center gap-4">
        <input type="file" accept="image/*" className="cursor-pointer" />
      </div>
    </>
  );
}
