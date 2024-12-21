import Header from "@/components/header";
export default function TabLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <Header />
      {children}
    </div>
  );
}
