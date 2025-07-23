// lib/withAuth.ts
import authOptions from "@/app/api/auth/authOptions/authOptions";
import { getServerSession } from "next-auth/next";
import { NextApiRequest, NextApiResponse, NextApiHandler } from "next";
import { Users } from "@/Interfaces/userInterfaces";

// Extend request with user info
declare module "next" {
  interface NextApiRequest {
    user?:Users
  }
}

interface WithAuthOptions {
  allowedRoles?: string[];
  matchUserParamId?: boolean; // Optional: check if user.id === req.query.id
}

export function withAuth(
  handler: NextApiHandler,
  options: WithAuthOptions = {}
) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getServerSession(req, res, authOptions);

    if (!session) {
      return res.status(401).json({ message: "Unauthorized: No session found" });
    }

    const { user } = session;
    const { allowedRoles = [], matchUserParamId = false } = options;

    // ✅ Role check
    if (
      allowedRoles.length > 0 &&
      (!user.role || !allowedRoles.includes(user.role))
    ) {
      return res.status(403).json({ message: "Forbidden: Role not allowed" });
    }

    // ✅ Ownership check if enabled
    if (matchUserParamId && req.query.id && user.role === "user") {
      const paramId = Array.isArray(req.query.id) ? req.query.id[0] : req.query.id;
      if (user.id !== paramId) {
        return res.status(403).json({ message: "Forbidden: Cannot access others' data" });
      }
    }

    // Attach user to req object with required properties
    const { id, role = "", email = "", name } = user;
    req.user = {
      _id: id ?? "",
      role: role ?? "",
      email: email ?? "",
      name: name ?? "",
      password: "", // Password is required by Users interface, but should not be exposed
    };

    // Proceed to original handler
    return handler(req, res);
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
