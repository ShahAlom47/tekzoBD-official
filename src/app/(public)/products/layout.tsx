// app/portfolio/layout.tsx

import React, { ReactNode } from "react";

export default function ProductsLayout({ children }: { children: ReactNode }) {
  return (
    <section className="max-w mx-auto p-4 ">
    
      {children}
    </section>
  );
}
