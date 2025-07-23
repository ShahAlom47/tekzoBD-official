// app/api/orders/[id]/route.ts
import { Users } from "@/Interfaces/userInterfaces";
import { getOrderCollection } from "@/lib/database/db_collections";
import { withAuth } from "@/ProtectedRoute/withAuth";
import { ObjectId } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = req.query;

    if (!id || typeof id !== "string") {
      return res.status(400).json({ message: "ID is required", success: false });
    }

    if (req.method !== "PATCH") {
      return res.status(405).json({ message: "Method Not Allowed", success: false });
    }

    const body = req.body;
    const { status } = body;

    const allowedStatuses = [
      "pending",
      "confirmed",
      "shipped",
      "delivered",
      "cancelled",
    ];

    if (!status) {
      return res.status(400).json({ message: "Status is required", success: false });
    }

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value", success: false });
    }

    const orderCollection = await getOrderCollection();

    const order = await orderCollection.findOne({ _id: new ObjectId(id) });

    if (!order) {
      return res.status(404).json({ message: "Order not found", success: false });
    }

    // User role check: user can only update own order
    const user = req.user as Users;
    if (
      user?.role === "user" &&
      (!order?.userId || order.userId.toString() !== user?._id.toString())
    ) {
      return res.status(403).json({ message: "Forbidden: cannot update others' orders", success: false });
    }

    // Update order status
    const result = await orderCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { "meta.orderStatus": status } }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Order not found", success: false });
    }

    return res.status(200).json({ message: "Order status updated successfully", success: true });
  } catch (error) {
    console.error("Error updating order status:", error);
    return res.status(500).json({
      message: "An error occurred while updating order status",
      success: false,
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

export default withAuth(handler);
