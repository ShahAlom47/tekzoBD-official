// app/(auth)/login/page.tsx
import { Suspense } from "react";
import Login from "./LogingContent";

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Login />
    </Suspense>
  );
}
