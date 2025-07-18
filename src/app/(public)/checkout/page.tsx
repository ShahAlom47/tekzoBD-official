"use client";

import { useSelector } from "react-redux";
import { useState } from "react";
import toast from "react-hot-toast";
import { RootState } from "@/redux/store/store";
import PageHeading from "@/components/PageHeading";
import CustomModal from "@/components/ui/CustomModal";
import OrderSuccessContent from "@/components/OrderSuccessContent";

const DELIVERY_CHARGE = 100;

const CheckoutPage = () => {
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const checkoutData = useSelector(
    (state: RootState) => state.checkout.checkoutData
  );

  const [shippingInfo, setShippingInfo] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    zip: "",
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
      toast.error("Please enter your Bkash/Nagad transaction ID");
      return;
    }

    const order = {
      ...checkoutData,
      shippingInfo,
      paymentInfo: {
        method: paymentMethod === "full" ? "bkash-manual" : "cod",
        paid: paymentMethod === "full",
        transactionId: paymentMethod === "full" ? transactionId : null,
      },
      pricing: {
        ...checkoutData?.pricing,
        grandTotal: (checkoutData?.pricing?.grandTotal || 0) + DELIVERY_CHARGE,
      },
      meta: {
        ...(checkoutData?.meta || {}),
        confirmedAt: new Date().toISOString(),
      },
    };

    // Simulate order submit
    console.log("✅ Final Order Submitted:", order);
    toast.success("Order confirmed successfully!");
   
    // router.push("/order-success");
    setSuccessModalOpen(true);
  };

  if (!checkoutData) {
    return <div className="text-center py-10">No checkout data found. </div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <PageHeading title="Checkout" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* Shipping Info */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Shipping Information</h2>
          <div className="space-y-3">
            {["name", "phone", "address", "city", "zip"].map((field) => (
              <input
                key={field}
                name={field}
                placeholder={field[0].toUpperCase() + field.slice(1)}
                onChange={handleInputChange}
                className="w-full my-input rounded p-2"
              />
            ))}
          </div>
        </div>

        {/* Order Summary + Payment */}
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
              Grand Total: {checkoutData.pricing?.grandTotal + DELIVERY_CHARGE}{" "}
              TK
            </p>
          </div>

          {/* Payment Method */}
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

            {/* Bkash Details */}
            {paymentMethod === "full" && (
              <div className="mt-4 space-y-2">
                <p className="text-sm font-medium text-gray-700">
                  Pay to: <span className="font-bold">017XXXXXXXX</span>
                </p>
                <p className="text-xs text-gray-500">
                  After payment, enter the Transaction ID below:
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

          {/* Confirm Button */}
          <button className="btn-base w-full mt-6" onClick={handleConfirmOrder}>
            Confirm Order
          </button>
        </div>
      </div>
      {/* afetr successful order, show modal  */}
      <CustomModal
        open={successModalOpen}
        onOpenChange={setSuccessModalOpen}
        title="Order Successful"
        description="Your order has been placed successfully."
        className="sm:max-w-lg"
      >
        {checkoutData && <OrderSuccessContent orderData={checkoutData} />}
      </CustomModal>
    </div>
  );
};

export default CheckoutPage;
