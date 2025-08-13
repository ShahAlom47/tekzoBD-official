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
    const orderCollection = await getOrderCollection();
    const productCollection = await getProductCollection();
    const categoryCollection = await getCategoryCollection();

    // Get filter type from query (week, month, year, all)
    const url = new URL(req.url);
    const filterType = url.searchParams.get("filter") || "week";

    const now = new Date();
    let startDate: Date | null = null;

    switch (filterType) {
      case "week":
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7);
        break;
      case "month":
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        break;
      case "year":
        startDate = new Date(now.getFullYear(), 0, 1);
        break;
      case "all":
        startDate = null; // No date filter
        break;
      default:
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7);
    }

    const dateFilter = startDate
      ? { createdAt: { $gte: startDate, $lte: now } }
      : {};

    // Users
    const totalUsers = await userCollection.countDocuments({});
    const newUsers = await userCollection.countDocuments(dateFilter);

    // Orders
    const totalOrders = await orderCollection.countDocuments({});
    const pendingOrders = await orderCollection.countDocuments({ "meta.orderStatus": "pending" });
    const completedOrders = await orderCollection.countDocuments({ "meta.orderStatus": "delivered" });
    const cancelledOrders = await orderCollection.countDocuments({ "meta.orderStatus": "cancelled" });

    // Sales
    const salesAgg = await orderCollection.aggregate([
      { $match: { "meta.orderStatus": "delivered", ...(startDate ? { createdAt: { $gte: startDate, $lte: now } } : {}) } },
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

    // Response
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
