"use client";

import { ProductType } from "@/Interfaces/productInterfaces";
import RatingDisplay from "./ui/RatingDisplay";
import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import MediaGallery from "./MediaGallery ";
import { addToRecentView } from "@/utils/recentViewHelper";
import RecentViewProducts from "./RecentViewProducts";
import { useWishlist } from "@/hooks/useWishlist";
import { useUser } from "@/hooks/useUser";
import LoginMsgModal from "./ui/LoginMsgModal";
import { useCart } from "@/hooks/useCart";
import { useCartSummary } from "@/hooks/useCartSummary";
import { CheckoutDataType } from "@/Interfaces/checkoutDataInterface";
import { useAppDispatch } from "@/redux/hooks/reduxHook";
import { setCheckoutData } from "@/redux/features/checkoutSlice/checkoutSlice";
import { useRouter } from "next/navigation";

interface Props {
  product: ProductType;
}

const ProductDetailsContent: React.FC<Props> = ({ product }) => {
  // const [quantity, setQuantity] = useState(1);
  const { isWishlisted, toggleWishlist } = useWishlist();
  const [showLoginModal, setLoginModal] = useState<boolean>(false);
  const { user } = useUser();
  const {addToCart}= useCart()
   const dispatch = useAppDispatch();
  const router = useRouter();

  const cartItems=[
    {
      productId: product._id.toString(),
      quantity: 1,
      addedAt: new Date().toISOString(),
    }
  ]

  
  
    const {
      subtotal,
      totalDiscount,
      totalAfterDiscount,
      couponDiscountAmount,
      grandTotal,
      totalQuantity,
      cartProducts,
    } = useCartSummary(cartItems, [product],  0);

  useEffect(() => {
    if (product?._id) {
      addToRecentView(product._id.toString());
    }
  }, [product]);

  const isOfferActive = (() => {
    const offer = product.offer;
    if (!offer?.isActive || !offer.startDate || !offer.endDate) return false;

    const now = new Date().getTime();
    const start = new Date(offer.startDate).getTime();
    const end = new Date(offer.endDate).getTime();

    return now >= start && now <= end;
  })();

  const hasDiscount = isOfferActive && product.discount > 0;
  const originalPrice = product.price;
  const discountedPrice = hasDiscount
    ? Math.round(originalPrice - (originalPrice * product.discount) / 100)
    : originalPrice;

  const isOutOfStock = product.stock === 0;

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addToCart(product?._id.toString())
  };

  const handleBuyNow = () => {
    if (isOutOfStock) return;
    if (!user) {
      setLoginModal(true);
      return;
    }
       const data: CheckoutDataType = {
          cartProducts: cartProducts,
          coupon: null,
          pricing: {
            subtotal,
            totalDiscount,
            totalAfterDiscount,
            couponDiscountAmount,
            grandTotal,
            totalQuantity,
          },
          shippingInfo: undefined,
          paymentInfo: undefined,
          meta: {
            checkoutAt: new Date().toISOString(),
            userEmail: user?.email || "guest@example.com",
            userId: user?.id || "guest",
            userName: user?.name || "Guest",
            orderStatus: "pending",
          },
        };
    
      
        dispatch(setCheckoutData(data));
    
        router.push("/checkout");


  };


  const handleWishClick = () => {
    if (!user) {
      setLoginModal(true);
      return;
    }
    toggleWishlist(product._id.toString());
  };

  return (
    <div className=" md:grid gap-2  grid-cols-12">
      {/* main content  */}
      <div className="col-span-9  grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-800 bg-white rounded-lg shadow p-4">
        {/* Left: Image */}
        <div className="w-full max-w-md mx-auto">
          <MediaGallery media={product?.media || []}></MediaGallery>
        </div>

        {/* Right: Product Details */}
        <div className="flex flex-col space-y-4 justify-between">
          {/* Title & Rating */}
          <div>
            <h1 className="text-2xl font-bold text-brandDark">
              {product.title}
            </h1>
            <p className="text-sm text-gray-500">Brand: {product.brand}</p>
            <RatingDisplay avgRating={product.ratings?.avg || 0} />
            <p className="text-sm text-gray-500 mt-1">
              {product.ratings?.count || 0} reviews
            </p>
          </div>

          {/* Price */}
          <div>
            {hasDiscount && (
              <p className="text-sm text-gray-500 line-through">
                TK {originalPrice}
              </p>
            )}
            <p className="text-xl font-semibold text-brandPrimary">
              TK {discountedPrice}
            </p>
            {hasDiscount && (
              <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded">
                {product.discount}% OFF
              </span>
            )}
          </div>

          {/* Stock */}
          <div>
            <span
              className={`text-sm font-medium ${
                isOutOfStock ? "text-red-600" : "text-green-600"
              }`}
            >
              {isOutOfStock ? "Out of Stock" : `In Stock (${product.stock})`}
            </span>
          </div>

  

          {/* Actions */}
          <div className="flex gap-4">
            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className={`btn-base ${
                isOutOfStock ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              disabled={isOutOfStock}
              className={`btn-base  ${
                isOutOfStock ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Buy Now
            </button>
            <button
              onClick={handleWishClick}
              className=" btn-bordered rounded-sm"
            >
              {isWishlisted(product._id.toString()) ? "❤️" : <FaHeart />}
            </button>
          </div>

          {/* Source Info */}
          {product.sourceInfo && (
            <div className="text-sm space-y-1 mt-4 border-t pt-3">
              <h3 className="font-medium text-brandDark">
                Shipping & Source Info
              </h3>
              <p>Source: {product.sourceInfo.supplierName || "Unknown"}</p>
              {product.sourceInfo.deliveryTime && (
                <p>Delivery: {product.sourceInfo.deliveryTime}</p>
              )}
              {/* {product.sourceInfo.shippingCost && (
              <p className="bb">Shipping: TK {product.sourceInfo.shippingCost}</p>
            )} */}
              {product.sourceInfo.returnPolicy && (
                <p>Return: {product.sourceInfo.returnPolicy}</p>
              )}
              {/* {product.sourceInfo.productSourceLink && (
              <p>
                Source Link:{" "}
                <a
                  href={product.sourceInfo.productSourceLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  View Original
                </a>
              </p>
            )} */}
            </div>
          )}

          {/* Description */}
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Description</h3>
            <p className="text-sm text-gray-700 whitespace-pre-wrap">
              {product.description || "No description available."}
            </p>
          </div>
        </div>
      </div>
      <aside className=" col-span-3 md:block hidden">
        <RecentViewProducts></RecentViewProducts>
      </aside>
      <LoginMsgModal open={showLoginModal} setOpen={setLoginModal} />
    </div>
  );
};

export default ProductDetailsContent;
