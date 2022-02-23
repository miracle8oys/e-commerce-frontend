import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const TransactionDetail = () => {

    const token = localStorage.getItem("token");
    const {order_id} = useParams();
    const [order, setOrder] = useState({});
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [changes, setChanges] = useState(0);
    console.log(order);

    useEffect(() => {
        fetch(`http://localhost:8000/api/v1/transaction/${order_id}`, 
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

    const handleSubmit = (e) => {
        e.preventDefault();
        const photo = e.target[2].files[0];
        console.log(photo.name.split(".")[1]);

        fetch('http://localhost:8000/api/v1/payment', 
        {
            method: "POST",
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': token
             },
            body: JSON.stringify({
                ext: photo.name.split(".")[1]
            })
        })
        .then(res => res.json())
        .then(response => {
            uploadImage(response.data, photo);
        });
    }

    const uploadImage = (url, photo) => {
        fetch(`${url}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            body: photo
        })
        .then(res => {
            const imageUrl = res.url.split("?")[0];
            paymentUpdate(imageUrl);
        })
    }

    const paymentUpdate = (imageUrl) => {
        fetch('http://localhost:8000/api/v1/payment', 
        {
            method: "PUT",
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': token
             },
            body: JSON.stringify({
                image: imageUrl,
                order_id,
                address,
                phone
            })
        })
        .then(res => res.json())
        .then(response => {
            console.log(response);
            setChanges(current => current + 1);
        }) 
    }

    const orderRecive = () => {
        fetch('http://localhost:8000/api/v1/transaction',
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
            console.log("Thanks for order");
        })
    }

    return ( 
        <>
            <Navbar />
            <h1 className="font-semibold text-3xl pt-3">Transaction</h1>
            <div className="py-2 grid justify-items-center">
                    <div className="flex justify-between px-5 w-screen md:w-96">
                        <p>Status: </p>
                        <h1 className="font-medium text-xl">{!order.payment ?  <span className="font-bold">Waiting for payment</span> : order.shipping ? <span className="font-bold">Shipping</span> : <span className="font-bold">On Process</span>}</h1>
                    </div>
                    <div className="flex justify-between px-5 w-screen md:w-96">
                        <p>Date: </p>
                        <p className="font-semibold text-xl">{order.createdAt?.split('T')[0]}</p>
                    </div>
                    <div className="flex justify-between px-5 w-screen md:w-96">
                        <p>Total:</p>
                        <p className="font-semibold text-xl">Rp.{order.total}</p>
                    </div>\
                
                <div>
                    {order && order.Product_Orders?.map((item, i) => (
                        <div className="md:grid md:grid-cols-5 w-full border-2 border-orange-500 my-2" key={i}>
                            <div className="md:col-span-2">
                                <img className="md:w-[12rem]" src={item.Product.image} alt="transaction" />
                            </div>
                            <div className="my-2 md:col-span-3 md:grid md:items-center">
                                <div className="md:w-[30vw]">
                                    <div className="flex justify-between px-20">
                                        <p>Name: </p>
                                        <h3 className="text-xl font-bold">{item.Product.name}</h3>
                                    </div>
                                    <div className="flex justify-between px-20">
                                        <p>Quantity: </p>
                                        <h3 className="font-semibold">Qty: {item.quantity}</h3>
                                    </div>
                                    <div className="flex justify-between px-20">
                                        <p>Subtotal: </p>
                                        <h3 className="text-lg font-semibold">Rp.{item.subtotal}</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="py-5 pb-10">
                {order.shipping ? 
                    <button className="py-3 bg-blue-700 font-bold text-xl w-32 rounded-md" onClick={orderRecive}>Received</button>
                    :
                !order.payment ?
                    <form className="grid gap-5" onSubmit={handleSubmit}>
                        <label className="text-2xl font-bold">Transfer Invoice</label>
                        <input onChange={(e) => setAddress(e.target.value)} className="ml-auto mr-auto h-8 rounded-md" type="text" placeholder="Address..." />
                        <input onChange={(e) => setPhone(e.target.value)} className="ml-auto mr-auto h-8 rounded-md" type="text" placeholder="Phone..." />
                        <input className="ml-auto mr-auto" type="file" />
                        <div className="ml-auto mr-auto">
                            <button type="submit" className="py-3 bg-blue-700 font-bold text-xl w-32 rounded-md">Submit</button>
                        </div>
                    </form>
                    : 
                    <p className="font-semibold text-xl">Invoice Alredy Submitted</p>
                }
            </div>
            <Footer />
        </>
     );
}
 
export default TransactionDetail;