import NavBar from "@/components/NavBar";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex justify-center mt-9">
        <NavBar />
      </div>
      <div className="flex flex-1 items-center justify-center">
        {children}
      </div>
    </div>
  );
}
