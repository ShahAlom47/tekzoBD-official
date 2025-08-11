import { NextRequest, NextResponse } from "next/server";
import { BetaAnalyticsDataClient } from "@google-analytics/data";
import path from "path";

const PROPERTY_ID = process.env.NEXT_PUBLIC_GA4_PROPERTY_ID || "";

const analyticsDataClient = new BetaAnalyticsDataClient({
  keyFilename: path.join(
    process.cwd(),
    process.env.NEXT_PUBLIC_GOOGLE_APPLICATION_CREDENTIALS || "/keys/service-account.json"
  ),
});

export async function GET(req: NextRequest) {
  try {
 
   // query params থেকে তারিখগুলো নেওয়া
    const { searchParams } = new URL(req.url);
    const startDate = searchParams.get("startDate") || "30daysAgo";
    const endDate = searchParams.get("endDate") || "today";

    const [response] = await analyticsDataClient.runReport({
      property: `properties/${PROPERTY_ID}`,
      dateRanges: [{ startDate, endDate }],
      metrics: [
        { name: "eventCount" },      // মোট ইভেন্ট সংখ্যা
        { name: "totalUsers" },      // মোট ইউজার সংখ্যা
        { name: "screenPageViews" }, // পেজ ভিউ
      ],
      dimensions: [
        { name: "pagePath" },     // কোন পেজ
        { name: "pageTitle" },    // পেজের নাম
        { name: "eventName" },    // ইভেন্টের নাম (page_view, click ইত্যাদি)
        { name: "linkText" },     // লিঙ্ক বা বাটনের টেক্সট (যদি ক্লিক ইভেন্টে পাঠাও)
        { name: "date" },         // কোন দিনে হয়েছে
      ],
      orderBys: [
        { metric: { metricName: "eventCount" }, desc: true }
      ]
    });

    return NextResponse.json({ success: true, data: response }, { status: 200 });
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
