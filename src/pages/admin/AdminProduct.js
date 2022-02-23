import { useState, useEffect } from "react";
import Footer from "../../components/Footer";
import {IoMdAddCircleOutline} from "react-icons/io";
import { Link } from "react-router-dom";
import AdminNavbar from "../../components/AdminNavbar";
const AdminProduct = () => {
    const [product, setProduct] = useState([]);
    const [errorMsg, setErrorMsg] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [changes, setChanges] = useState(0);
    const token = localStorage.getItem("token");
  
    useEffect(() => {
        setIsLoaded(true);
        fetch(`http://localhost:8000/api/v1/products`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        })
            .then(res => res.json())
            .then(result => {
                setProduct(result.data);
                setIsLoaded(false);
            }, (err) => {
                setErrorMsg(err);
                setIsLoaded(false);
            });
        }, [changes]);

    const handleDelete = (id_product) => {
        fetch(`http://localhost:8000/api/v1/products`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify({
                id_product
            })
        })
            .then(res => res.json())
            .then(() => {
                setChanges(current => current + 1);
            }, (err) => {
                setErrorMsg(err);
            });
        }
    return ( 
        <>
            <AdminNavbar />
            {errorMsg && <h1>{errorMsg}</h1>}
            {isLoaded && <h1 className='my-28 text-3xl font-bold'>Loading...</h1>}
            <div className="flex justify-center my-3">
                <Link to="/product/add">
                    <IoMdAddCircleOutline className="text-5xl" />
                </Link>
            </div>
            <div className="md:grid md:grid-cols-8 md:px-52 hidden md:visible">
                    <h1 className="md:col-span-2 font-semibold text-xl">IMAGE</h1>
                    <h1 className="md:col-span-2 font-semibold text-xl">NAME</h1>
                    <h1 className="font-semibold text-xl">PRICE</h1>
                    <h1 className="md:col-span-2 font-semibold text-xl">DESCRIPTION</h1>
                    <div className="flex justify-center pb-2">
                        <h1 className="font-semibold text-xl">ACTION</h1>
                    </div>
                </div>
            {product.map(item => (
                <div key={item.id}>
                <hr className="my-1" />
                <div className="grid md:grid-cols-8 items-center md:px-52">
                    <img className="md:col-span-2 md:h-3/5" src={item.image} alt="admin-product" />
                    <h1 className="md:col-span-2">{item.name}</h1>
                    <h1>{item.price}</h1>
                    <h1 className="md:col-span-2">{item.desc}</h1>
                    <div className="flex justify-center pb-2">
                        <button className="py-2 px-2 bg-red-500 w-20 h-10 rounded-md" onClick={() => handleDelete(item.id)}>DELETE</button>
                    </div>
                </div>
                </div>
            ))}
            <Footer />
        </>
     );
}
 
export default AdminProduct;