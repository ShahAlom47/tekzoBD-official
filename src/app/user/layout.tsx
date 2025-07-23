import UserLayoutWrapper from "@/components/wrappers/UserLayoutWraper";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UserLayoutWrapper>
      {children}
    </UserLayoutWrapper>
  );
}
