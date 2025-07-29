"use client";
import React, { useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

function CheckoutContent() {
    const searchParams = useSearchParams();
    const amount = searchParams.get("amount") || "0";

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const handlePayment = () => {
        // @ts-ignore
        const options = {
            key: "rzp_test_baqU988B0393JS",
            amount: Number(amount) * 100,
            currency: "INR",
            name: "FlipZon",
            description: "Order Payment",
            handler: function (response: any) {
                alert("Payment successful! Payment ID: " + response.razorpay_payment_id);
            },
            prefill: {
                name: "FlipZon User",
                email: "email@example.com",
                contact: "9999999999",
            },
            theme: {
                color: "#3399cc",
            },
        };
        // @ts-ignore
        const rzp = new window.Razorpay(options);
        rzp.open();
    };

    return (
        <div>
            <h1>Checkout</h1>
            <p>Amount to pay: ₹{amount}</p>
            <button onClick={handlePayment}>Pay with Razorpay</button>
        </div>
    );
}

export default function CheckoutPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <CheckoutContent />
        </Suspense>
    );
}
