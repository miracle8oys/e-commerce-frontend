import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
const ProductDetail = () => {
    const [product, setProduct] = useState({});
    const [errorMsg, setErrorMsg] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const {product_id} = useParams();
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
  
    useEffect(() => {
        setIsLoaded(true);
        fetch(`http://localhost:8000/api/v1/product/${product_id}`)
            .then(res => res.json())
            .then(result => {
                setProduct(result.data);
                setErrorMsg(result.message);
                setIsLoaded(false);
            }, (err) => {
                setErrorMsg(err);
                setIsLoaded(false);
            });
        }, []);

    const addToCart = () => {
        fetch(`http://localhost:8000/api/v1/product/${product_id}`, 
        {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        })
            .then(res => res.json())
            .then(result => {
                setErrorMsg(result.message);
                navigate("/cart");
            }, (err) => {
                setErrorMsg(err);
            });
    }

    console.log(product_id);
    return (
        <>
            <Navbar />
            <div className='md:flex md:justify-center md:mt-20'>
                <div className='min-h-[80vh] md:w-[70vw] grid md:grid-cols-6 justify-center'>
                    {errorMsg && <h1>{errorMsg}</h1>}
                    {isLoaded && <h1>Loading...</h1>}
                    <div className='md:col-span-3'>
                        <img className='h-96' src={product.image} alt="product-detail" />
                    </div>
                    <div className='md:mt-20 md:col-span-3'>
                        <p className='text-3xl font-semibold my-3'>{product.name}</p>
                        <p className='text-3xl font-bold my-3'>Rp. {product.price}</p>
                        <p className='text-xl font-medium my-3'>{product.desc}</p>
                        <div className='flex justify-center'>
                            <button className='py-3 px-7 rounded-md my-5 text-2xl font-bold bg-orange-500 w-32 h-16' onClick={addToCart}>Buy</button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
     );
}
export default ProductDetail;