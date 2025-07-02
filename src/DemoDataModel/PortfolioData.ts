//  export const data ={
//   _id: "666abcd1234567890def1234",
//   title: "Responsive Portfolio Website",
//   slug: "responsive-portfolio-website",
//   description: "একটি সম্পূর্ণ রেসপন্সিভ পার্সোনাল পোর্টফোলিও ওয়েবসাইট।",
//   content: "এই প্রজেক্টে Next.js, Tailwind CSS এবং MongoDB ব্যবহার করে একটি প্রফেশনাল পোর্টফোলিও তৈরি করা হয়েছে যেখানে বিভিন্ন প্রজেক্ট, স্কিলস এবং যোগাযোগ ফর্ম রয়েছে। এটি মোবাইল ও ডেস্কটপ উভয়েই সুন্দরভাবে কাজ করে।",
//   media: [
//     {
//       type: "image",
//       url: "https://res.cloudinary.com/shah-alom/image/upload/v1718610001/portfolio1.jpg",
//       thumbnail: "https://res.cloudinary.com/shah-alom/image/upload/w_300/portfolio1.jpg",
//       caption: "হোমপেজ ভিউ",
//       publicId: "portfolio/portfolio1"
//     },
//     {
//       type: "video",
//       url: "https://res.cloudinary.com/shah-alom/video/upload/v1718610200/demo-video.mp4",
//       thumbnail: "https://res.cloudinary.com/shah-alom/image/upload/v1718610300/video-thumb.jpg",
//       caption: "লাইভ ডেমো ভিডিও",
//       publicId: "portfolio/demo-video"
//     }
//   ],
//   techStack: ["Next.js", "Tailwind CSS", "MongoDB", "NextAuth"],
//   tags: ["portfolio", "responsive", "fullstack"],
//   liveLink: "https://shah-alom-portfolio.vercel.app",
//   repoLink: "https://github.com/shah-alom-official/portfolio",
//   featured: true,
//   order: 1,
// //   createdAt: ISODate("2024-06-01T12:00:00Z"),
// //   updatedAt: ISODate("2024-06-05T15:30:00Z")
// }

// // interfaces 

// export interface MediaItem {
//   type: "image" | "video";
//   url: string;
//   thumbnail?: string;       // optional: thumbnail for video or preview
//   caption?: string;         // optional: caption text
//   publicId?: string;        // optional: for delete from external host
// }

// export interface Project {
//   _id: string;              // MongoDB ObjectId as string
//   title: string;
//   slug: string;
//   description: string;
//   content?: string;         // optional: long description
//   media: MediaItem[];       // image/video gallery
//   techStack: string[];      // list of used technologies
//   tags?: string[];          // optional: for filtering/search
//   liveLink?: string;        // optional: live preview URL
//   repoLink?: string;        // optional: GitHub repo
//   featured?: boolean;       // optional: highlight in homepage
//   order?: number;           // optional: custom sort order
//   createdAt: string;        // ISODate string
//   updatedAt: string;        // ISODate string
// }

