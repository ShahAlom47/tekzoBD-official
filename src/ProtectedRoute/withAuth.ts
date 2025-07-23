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

// pages/api/orders/[id].ts
// import { NextApiRequest, NextApiResponse } from "next";
// import { withAuth } from "@/lib/withAuth";
// import { getOrderCollection } from "@/lib/database/db_collections";
// import { ObjectId } from "mongodb";

// async function handler(req: NextApiRequest, res: NextApiResponse) {
//   const { id } = req.query;
//   const { status } = req.body;
//   const user = req.user;

//   if (!id || typeof id !== "string") {
//     return res.status(400).json({ message: "Order ID required" });
//   }

//   // শুধু নিজের order update করতে পারবে user role হলে
//   if (user.role === "user") {
//     const orderCollection = await getOrderCollection();
//     const order = await orderCollection.findOne({ _id: new ObjectId(id) });
//     if (!order) return res.status(404).json({ message: "Order not found" });
//     if (order.userId.toString() !== user.id) {
//       return res.status(403).json({ message: "Forbidden: Not your order" });
//     }
//   }

//   // এখন order update করার লজিক
//   // ...

//   res.status(200).json({ message: "Order updated successfully" });
// }

// // allowedRoles: শুধু admin আর user access পাবে
// export default withAuth(handler, { allowedRoles: ["admin", "user"] });
