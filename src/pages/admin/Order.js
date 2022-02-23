import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminNavbar from "../../components/AdminNavbar";
import Footer from "../../components/Footer";

const Order = () => {
    const [errMsg, setErrMsg] = useState(null);
    const [dataTrans, setDataTrans] = useState([]);
    const token = localStorage.getItem("token");

    useEffect(() => {
        fetch("http://localhost:8000/api/v1/order", 
        {   
            method: "GET", 
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': token
             }
        })
        .then(res => res.json())
        .then(result => {
            setErrMsg(result.message);
            setDataTrans(result.data);
        }, (err) => {
            console.log(err);
        });
    }, [])

    console.log("test");
    return ( 
        <>
            <AdminNavbar />
             <h1 className="font-semibold text-3xl pt-3 py-3">Transaction</h1>
            {errMsg && <h1>{errMsg}</h1>}
            <div className="grid justify-center pb-10 min-h-[70vh]">            
                {dataTrans.map(item => (
                    <Link to={`/order/${item.id}`} key={item.id}>
                        <div className="border-2 border-orange-500 md:w-[50vw]">
                            <h1 className="text-xl font-semibold my-2">Status: {!item.payment ? <span>Waiting for payment</span> : item.shipping ? <span>Shipping</span> : <span>On Process</span> }</h1>
                            <p className="text-xl font-semibold my-2">Total: {item.total}</p>
                            <p className="text-xl font-semibold my-2">Date: {item.createdAt.split('T')[0]}</p>
                            <p className="text-xl font-semibold my-2">User ID: {item.user_id}</p>
                        </div>
                    </Link>
                    
                ))}
            </div>
            <Footer />
        </>
     );
}
 
export default Order;