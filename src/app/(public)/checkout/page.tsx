"use client";

import { useSelector } from "react-redux";
import { useState } from "react";
import toast from "react-hot-toast";
import { RootState } from "@/redux/store/store";
import PageHeading from "@/components/PageHeading";
import CustomModal from "@/components/ui/CustomModal";
import OrderSuccessContent from "@/components/OrderSuccessContent";
import { clearCheckoutData } from "@/redux/features/checkoutSlice/checkoutSlice";
import { useAppDispatch } from "@/redux/hooks/reduxHook";
import { useRouter } from "next/navigation";
import { CheckoutDataType } from "@/Interfaces/checkoutDataInterface";
import { useCart } from "@/hooks/useCart";

const DELIVERY_CHARGE = 100;

const CheckoutPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const checkoutData = useSelector(
    (state: RootState) => state.checkout.checkoutData
  );
  const { clearCart } = useCart();
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [finalOrder, setFinalOrder] = useState<CheckoutDataType | null>(null);

  const [shippingInfo, setShippingInfo] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
    deliveryMethod: "home-delivery" as const,
  });

  const [paymentMethod, setPaymentMethod] = useState<"full" | "cod">("cod");
  const [transactionId, setTransactionId] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleConfirmOrder = () => {
    if (!shippingInfo.name || !shippingInfo.phone || !shippingInfo.address) {
      toast.error("Please fill all required shipping fields");
      return;
    }

    if (paymentMethod === "full" && !transactionId) {
      toast.error("Please enter your Bkash transaction ID");
      return;
    }

    const order: CheckoutDataType = {
      cartProducts: checkoutData?.cartProducts ?? [],
      coupon: checkoutData?.coupon ?? null,
      pricing: {
        subtotal: checkoutData?.pricing?.subtotal ?? 0,
        totalDiscount: checkoutData?.pricing?.totalDiscount ?? 0,
        totalAfterDiscount: checkoutData?.pricing?.totalAfterDiscount ?? 0,
        couponDiscountAmount: checkoutData?.pricing?.couponDiscountAmount ?? 0,
        totalQuantity: checkoutData?.pricing?.totalQuantity ?? 0,
        grandTotal: (checkoutData?.pricing?.grandTotal ?? 0) + DELIVERY_CHARGE,
      },
      shippingInfo,
      paymentInfo: {
        method: paymentMethod === "full" ? "bkash" : "cash-on-delivery",
        paymentStatus: paymentMethod === "full" ? "paid" : "unpaid",
        transactionId: paymentMethod === "full" ? transactionId : undefined,
      },
      meta: {
        checkoutAt: new Date().toISOString(),
        userEmail: checkoutData?.meta?.userEmail || "guest@example.com",
        orderStatus: "pending",
      },
    };

    setFinalOrder(order);
    setSuccessModalOpen(true);
  };

  const handleModalConfirm = async () => {
    console.log("Modal confirm clicked");
    if (!finalOrder) {
      toast.error("No order data available");
      return;
    }
    try {
      // Simulated API call
      // await axios.post("/api/orders", finalOrder);
      console.log("Order placed sess:", finalOrder);
      toast.success("✅ Order placed successfully!");
      router.push("/shop");
      dispatch(clearCheckoutData());
      clearCart();
      setSuccessModalOpen(false);
    } catch {
      toast.error("❌ Something went wrong while placing order.");
    }
  };

  if (!checkoutData) {
    return <div className="text-center py-10">No checkout data found.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <PageHeading title="Checkout" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* Shipping Info */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Shipping Information</h2>
          <div className="space-y-3">
            {["name", "phone", "address", "city", "zipCode"].map((field) => (
              <input
                key={field}
                name={field}
                placeholder={field[0].toUpperCase() + field.slice(1)}
                onChange={handleInputChange}
                className="w-full border rounded p-2"
              />
            ))}
          </div>
        </div>

        {/* Order Summary & Payment */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Order Summary</h2>
          <div className="text-sm font-medium space-y-1 bg-gray-100 p-4 rounded border">
            <p>Subtotal: {checkoutData.pricing?.subtotal} TK</p>
            <p>Discount: -{checkoutData.pricing?.totalDiscount} TK</p>
            <p>After Discount: {checkoutData.pricing?.totalAfterDiscount} TK</p>
            <p>
              Coupon Discount: -{checkoutData.pricing?.couponDiscountAmount} TK
            </p>
            <p className="font-semibold">
              Delivery Charge: +{DELIVERY_CHARGE} TK
            </p>
            <p className="font-bold text-lg">
              Grand Total:{" "}
              {(checkoutData.pricing?.grandTotal || 0) + DELIVERY_CHARGE} TK
            </p>
          </div>

          {/* Payment */}
          <div className="mt-6 space-y-2">
            <h3 className="font-medium">Payment Method:</h3>
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  checked={paymentMethod === "cod"}
                  onChange={() => setPaymentMethod("cod")}
                />
                Cash on Delivery
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="payment"
                  value="full"
                  checked={paymentMethod === "full"}
                  onChange={() => setPaymentMethod("full")}
                />
                Full Bkash Payment
              </label>
            </div>

            {paymentMethod === "full" && (
              <div className="mt-4 space-y-2">
                <p className="text-sm font-medium text-gray-700">
                  Pay to: <span className="font-bold">017XXXXXXXX</span>
                </p>
                <input
                  type="text"
                  placeholder="Transaction ID"
                  value={transactionId}
                  onChange={(e) => setTransactionId(e.target.value)}
                  className="w-full border p-2 rounded"
                />
              </div>
            )}
          </div>

          <button className="btn-base w-full mt-6" onClick={handleConfirmOrder}>
            Confirm Order
          </button>
        </div>
      </div>

      {/* Success Modal */}
      <CustomModal
        open={successModalOpen}
        onOpenChange={setSuccessModalOpen}
        title="Order Successful"
        description="Your order has been placed successfully."
        className="w-11/12 md:w-8/12 lg:w-6/12 xl:w-5/12 2xl:w-4/12 h-full max-h-[90vh] overflow-y-scroll"
      >
        {finalOrder && (
          <OrderSuccessContent
            orderData={finalOrder}
            onConfirm={() => {
              handleModalConfirm();
            }}
          />
        )}
      </CustomModal>
    </div>
  );
};

export default CheckoutPage;
