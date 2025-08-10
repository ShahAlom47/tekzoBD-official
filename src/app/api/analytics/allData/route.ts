// app/api/analytics/route.ts
import { NextResponse } from "next/server";
import { BetaAnalyticsDataClient } from "@google-analytics/data";
import path from "path";

// const analyticsDataClient = new BetaAnalyticsDataClient();
const PROPERTY_ID = process.env.NEXT_PUBLIC_GA4_PROPERTY_ID || "";

const analyticsDataClient = new BetaAnalyticsDataClient({
  keyFilename: path.join(process.cwd(), process.env.NEXT_PUBLIC_GOOGLE_APPLICATION_CREDENTIALS || '')
});

export async function GET() {
    console.log(PROPERTY_ID,analyticsDataClient)
  try {
    // প্রয়োজন হলে URL থেকে query param নেয়া যাবে, এখন ধরে নিচ্ছি 7 দিন আগ থেকে আজ পর্যন্ত ডেটা চাই
    const [response] = await analyticsDataClient.runReport({
      property: `properties/${PROPERTY_ID}`,
      dateRanges: [{ startDate: "7daysAgo", endDate: "today" }],
      metrics: [
        { name: "screenPageViews" },    // পেজ ভিউ
        { name: "addToCarts" },         // Add to Cart event count (GA4 এ event হিসেবে থাকা দরকার)
        { name: "purchaseRevenue" }     // বিক্রয়ের রেভিনিউ (অথবা যেটা দরকার)
      ],
      dimensions: [{ name: "pagePath" }],
    });

    return NextResponse.json(
      {
        success: true,
        data: response,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("GET /api/analytics error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch GA4 data",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
