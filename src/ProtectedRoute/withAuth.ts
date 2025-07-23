/* eslint-disable @typescript-eslint/no-explicit-any */
// lib/withAuth.ts
import { getServerSession } from "next-auth/next";
import authOptions from "@/app/api/auth/authOptions/authOptions";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

interface User {
  id: string;
  role: string;
  email: string;
  name?: string;
}

interface WithAuthOptions {
  allowedRoles?: string[];
  matchUserParamId?: boolean;
}

// Custom interface to extend NextRequest with user info
declare module "next/server" {
  interface NextRequest {
    user?: User;
  }
}

export function withAuth(
  handler: (req: NextRequest, context: { params: any }) => Promise<Response | NextResponse>,
  options: WithAuthOptions = {}
) {
  return async (req: NextRequest, context: { params: any }) => {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { message: "Unauthorized: No session found" },
        { status: 401 }
      );
    }

    const user = session.user as User;
    const { allowedRoles = [], matchUserParamId = false } = options;

    // Role check
    if (
      allowedRoles.length > 0 &&
      (!user.role || !allowedRoles.includes(user.role))
    ) {
      return NextResponse.json(
        { message: "Forbidden: Role not allowed" },
        { status: 403 }
      );
    }

    // Ownership check (optional)
    if (matchUserParamId && context.params.id && user.role === "user") {
      if (user.id !== context.params.id) {
        return NextResponse.json(
          { message: "Forbidden: Cannot access others' data" },
          { status: 403 }
        );
      }
    }

    // Attach user to request object (TypeScript ignore needed for augmentation)
    
    req.user = user;

    return handler(req, context);
  };
}


// uses example:


// const handler = async (req: NextRequest, context: { params: { id: string } }) => {
//   if (req.method !== "PATCH") {
//     return NextResponse.json(
//       { message: "Method Not Allowed" },
//       { status: 405 }
//     );
//   }

//   const { id } = context.params;
//   const body = await req.json();
 
// // related  code 
 
//   const user = req.user as User ; // Type assertion for user

//   // If user role is "user", only update own order
//   if (
//     user?.role === "user" &&
//     (!order.userId || order.userId.toString() !== user.id)
//   ) {
//     return NextResponse.json(
//       { message: "Forbidden: cannot update others' orders", success: false },
//       { status: 403 }
//     );
//   }


//   return NextResponse.json(
//     { message: "Order status updated successfully", success: true },
//     { status: 200 }
//   );
// };

// export const PATCH = withAuth(handler, {
//   allowedRoles: [ "admin", "user"],
// });