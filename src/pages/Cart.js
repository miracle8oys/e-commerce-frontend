import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import {BiPlus, BiMinus} from "react-icons/bi"

const Cart = () => {

    const [errMsg, setErrMsg] = useState(null);
    const [cartData, setCartData] = useState([]);
    const [changes, setChanges] = useState(0);
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    useEffect(() => {

        const abortCont = new AbortController();

        fetch("http://localhost:8000/api/v1/cart", 
        {  
            signal: abortCont.signal, 
            method: "GET", 
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': token
             }
        })
        .then(res => res.json())
        .then(result => {
            setErrMsg(result.message);
            setCartData(result.data);
        }, (err) => {
            console.log(err);
        });

        return () => abortCont.abort();
        
    }, [changes]);

    const updateQty = (method, cart_id) => {
        fetch("http://localhost:8000/api/v1/cart", 
        {   
            method: "POST", 
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': token
             },
            body: JSON.stringify({
                method,
                cart_id
            })
        })
        .then(res => res.json())
        .then(result => {
            setErrMsg(result.message);
            setChanges(current => current + 1);
        }, (err) => {
            console.log(err);
        });
    }

    const handleCheckout = () => {
        fetch("http://localhost:8000/api/v1/checkout", 
        {   
            method: "POST", 
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': token
             }
        })
        .then(res => res.json())
        .then(result => {
            setErrMsg(result.message);
            console.log(result);
            navigate("/transaction");
        }, (err) => {
            console.log(err);
        });
    }

    console.log("test");
    return ( 
        <>
            <Navbar />
            <br />
            {errMsg && <h1>{errMsg}</h1>}
            {cartData && cartData.map(item => (
                <div className="flex justify-center">
                    <div className="grid md:grid-cols-2 md:gap-x-40 border-2 border-orange-300 md:w-[50vw] pb-3 md:pb-0" key={item.id}>
                        <div className="md:col-span-1">
                            <img className="" src={item.Product?.image} alt="cart-product" />
                        </div>
                        <div className="md:col-span-1">
                            <p className="text-xl font-bold">{item.Product?.name}</p>
                            <p className="text-lg font-semibold">Rp. {item.Product?.price}</p>
                            <p className="text-lg font-medium">Qty: {item.quantity}</p>
                            <p className="text-lg font-semibold">Subtotal : Rp. {item.quantity * item.Product?.price}</p>
                            <div className="flex gap-7 justify-center pt-2">
                                <button className="w-12 h-8 text-2xl bg-orange-400 rounded-md flex justify-center items-center" onClick={() => updateQty("add", item.id)}><BiPlus /></button>
                                <button className="w-12 h-8 text-2xl bg-sky-500 rounded-md flex justify-center items-center" onClick={() => updateQty("remove", item.id)}><BiMinus /></button>
                            </div>
                        </div>
                    </div>
                </div>
                
            ))}
            <button className="my-7 font-bold text-2xl bg-emerald-500 py-3 px-3 rounded-md" onClick={handleCheckout}>Checkout</button>
            
        </>
     );
}
 
export default Cart;