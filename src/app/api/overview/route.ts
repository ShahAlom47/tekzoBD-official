import { NextRequest, NextResponse } from "next/server";
import {
  getUserCollection,
  getOrderCollection,
  getProductCollection,
  getCategoryCollection,
} from "@/lib/database/db_collections";

export async function GET(req: NextRequest) {
  try {
    const userCollection = await getUserCollection();
    const orderCollection =await getOrderCollection();
    const productCollection =await getProductCollection();
    const categoryCollection = await getCategoryCollection();

    // Get date range from query params or default to last 7 days for new users
    const url = new URL(req.url);
    const startDateStr = url.searchParams.get("startDate");
    const endDateStr = url.searchParams.get("endDate");
    const now = new Date();
    const startDate = startDateStr ? new Date(startDateStr) : new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const endDate = endDateStr ? new Date(endDateStr) : now;

    // Users
    const totalUsers = await userCollection.countDocuments({});
    const newUsers = await userCollection.countDocuments({
      createdAt: { $gte: startDate, $lte: endDate },
    });

    // Orders
    const totalOrders = await orderCollection.countDocuments({});
    const pendingOrders = await orderCollection.countDocuments({ "meta.orderStatus": "pending" });
    const completedOrders = await orderCollection.countDocuments({ "meta.orderStatus": "delivered" });
    const cancelledOrders = await orderCollection.countDocuments({ "meta.orderStatus": "cancelled" });

    // Total sales amount (sum grandTotal of completed/delivered orders)
    const salesAgg = await orderCollection.aggregate([
      { $match: { "meta.orderStatus": "delivered" } },
      {
        $group: {
          _id: null,
          totalSalesAmount: { $sum: "$pricing.grandTotal" },
        },
      },
    ]).toArray();
    const totalSalesAmount = salesAgg[0]?.totalSalesAmount || 0;

    // Products
    const totalProducts = await productCollection.countDocuments({});
    const inStockProducts = await productCollection.countDocuments({ stock: { $gt: 0 } });
    const outOfStockProducts = await productCollection.countDocuments({ stock: { $lte: 0 } });

    // Categories
    const totalCategories = await categoryCollection.countDocuments({});

    // Compose response
    const responseData = {
      users: { totalUsers, newUsers },
      orders: { totalOrders, pendingOrders, completedOrders, cancelledOrders },
      sales: { totalSalesAmount },
      products: { totalProducts, inStockProducts, outOfStockProducts },
      categories: { totalCategories },
    };

    return NextResponse.json({ success: true, data: responseData }, { status: 200 });
  } catch (error) {
    console.error("GET /api/dashboard/overview error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch dashboard overview data",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
