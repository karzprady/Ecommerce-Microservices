import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { capturePayment } from "@/store/order-slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

export default function PaypalReturn(){

    const dispatch = useDispatch()
    const loc = useLocation()

    const params = new URLSearchParams(loc.search)
    const paymentId = params.get("paymentId");
    const payerId = params.get("PayerID")

    

    useEffect(()=>{

        if(paymentId && payerId){
            const orderId = JSON.parse(sessionStorage.getItem("currentorderid"))
            dispatch(capturePayment({paymentId,payerId,orderId})).then(d=>{
                if(d?.payload?.success){
                    sessionStorage.removeItem("currentorderid")
                    window.location.href = "/shopping/paypal-success"
                }
            })
        }

    },[paymentId,payerId])
    return <Card>
        <CardHeader>
            <CardTitle>
                Processing payment...pls wait
            </CardTitle>
        </CardHeader>

    </Card>
}