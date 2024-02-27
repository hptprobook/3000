import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import RadioPaymentMethodGroup from "@/components/common/RadioGroup/RadioPaymentMethodGroup";
import { usePaymentMethodContext } from "@/provider/PaymentMethodContext";

const StyledPaymentMethod = styled("div")(() => ({
    padding: "20px 16px",
    borderRadius: "5px",
    backgroundColor: "#fff",
    marginTop: "12px",
    marginRight: "12px",
}));

export default function PaymentMethod() {
    const [paymentMethod, setPaymentMethod] = useState("COD");

    const { setSelectedPaymentMethod } = usePaymentMethodContext();

    setSelectedPaymentMethod(paymentMethod);

    const handleMethodChange = (method) => {
        setPaymentMethod(method);
    };

    return (
        <StyledPaymentMethod>
            <h4>Vui lòng chọn phương thức thanh toán</h4>
            <RadioPaymentMethodGroup onChange={handleMethodChange} />
        </StyledPaymentMethod>
    );
}
