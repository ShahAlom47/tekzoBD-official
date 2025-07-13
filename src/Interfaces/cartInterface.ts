export interface CartItem {
  productId: string;    // প্রোডাক্টের ইউনিক আইডি
  quantity: number;     // প্রোডাক্ট কতটা কার্টে আছে
  addedAt?: string;     // (optional) যোগ করার সময়, ISO string
}

export interface Cart {
  _id: string;          // কার্টের ইউনিক আইডি
  userEmail: string;       // ইউজারের আইডি (foreign key)
  items: CartItem[];    // কার্টে থাকা সব প্রোডাক্ট আইটেম
  updatedAt: string;    // সর্বশেষ আপডেট সময় (ISO string)
  createdAt: string;    // কার্ট তৈরি সময় (ISO string)
}
