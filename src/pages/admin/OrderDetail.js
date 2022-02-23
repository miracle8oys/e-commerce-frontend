import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AdminNavbar from "../../components/AdminNavbar";
import Footer from "../../components/Footer";

const OrderDetail = () => {

    const token = localStorage.getItem("token");
    const {order_id} = useParams();
    const [order, setOrder] = useState({});
    const [changes, setChanges] = useState(0);
    console.log(order);

    useEffect(() => {
        fetch(`http://localhost:8000/api/v1/order/${order_id}`, 
        {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        })
        .then(res => res.json())
        .then(result => {
            setOrder(result.data)
        });
    }, [changes]);

    const handleShipping = () => {
        fetch("http://localhost:8000/api/v1/order", 
        {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify({
                order_id
            })
        }).then(() => {
            setChanges(current => current + 1)
        })
    }

    return ( 
        <>
            <AdminNavbar />
            <h1 className="font-semibold text-3xl pt-3">Transaction</h1>
            <div className="py-2 grid justify-items-center min-h-[50vh]">
                <h1 className="font-medium text-xl">Status: {!order.payment ?  <span className="font-bold">Waiting for payment</span> : order.shipping ? <span className="font-bold">Shipping</span> : <span className="font-bold">On Process</span>}</h1>
                <p className="font-semibold text-xl">{order.createdAt?.split('T')[0]}</p>
                <p className="font-semibold text-xl">Rp.{order.total}</p>
                {order.Payment?.image && <img className="my-5 max-w-xs" src={order.Payment?.image} alt="invoice" />}

                {order && order.Product_Orders?.map((item, i) => (
                    <div className="grid grid-cols-5 border-2 border-orange-500" key={i}>
                        <div className="col-span-2">
                            <img className="md:w-[12rem]" src={item.Product.image} alt="transaction" />
                        </div>
                        <div className="col-span-3">
                            <h3 className="text-xl font-bold">{item.Product.name}</h3>
                            <h3 className="font-semibold">Qty: {item.quantity}</h3>
                            <h3 className="text-lg font-semibold">Rp.{item.subtotal}</h3>
                        </div>
                    </div>
                ))}
            </div>
            {order.shipping ? 
                <button className="py-3 bg-gray-500 font-bold text-xl w-32 rounded-md my-5">Shipping</button>
                :
                order.payment ?
                <button onClick={handleShipping} className="py-3 bg-blue-700 font-bold text-xl w-32 rounded-md my-5">Shipping</button>
                :
                <button className="py-3 bg-gray-500 font-bold text-xl w-32 rounded-md my-5">Shipping</button>
            }
            <Footer />
        </>
     );
}
 
export default OrderDetail;