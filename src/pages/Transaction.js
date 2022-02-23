import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const Transaction = () => {
    const [errMsg, setErrMsg] = useState(null);
    const [dataTrans, setDataTrans] = useState([]);
    const token = localStorage.getItem("token");

    useEffect(() => {
        fetch("http://localhost:8000/api/v1/transaction", 
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
            console.log(result.data);
        }, (err) => {
            console.log(err);
        });
    }, [])

    console.log("test");
    return ( 
        <>
            <Navbar />
            <h1 className="text-3xl font-bold py-5">Transaction</h1>
            {errMsg && <h1>{errMsg}</h1>}
            <div className="grid justify-center pb-10">
                {dataTrans.map(item => (
                    <div className="border-orange-500 border-2 md:w-[50vw]" key={item.id}>
                        <Link to={`/transaction/${item.id}`}>
                            <h1 className="text-xl font-semibold my-2">Status: {!item.payment ?  <span className="font-bold">Waiting for payment</span> : item.shipping ? <span className="font-bold">Shipping</span> : <span className="font-bold">On Process by Seller</span>}</h1>
                            <p className="text-2xl font-semibold my-2">Total: <span className="font-bold">Rp.{item.total}</span></p>
                            <p className="text-xl font-semibold my-2">Date: {item.createdAt.split('T')[0]}</p>
                        </Link>
                    </div>
                    
                ))}
            </div>
        </>
     );
}
 
export default Transaction;