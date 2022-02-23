import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
const BestSeller = () => {
    const [product, setProduct] = useState([]);
    const [errorMsg, setErrorMsg] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
  
    useEffect(() => {
        setIsLoaded(true);
        fetch(`http://localhost:8000/api/v1/bestproduct`)
            .then(res => res.json())
            .then(result => {
                setProduct(result.data);
                setIsLoaded(false);
            }, (err) => {
                setErrorMsg(err);
                setIsLoaded(false);
            });
        }, []);
    return ( 
        <>
            {errorMsg && <h1>{errorMsg}</h1>}
            {isLoaded && <h1 className='my-28 text-3xl font-bold'>Loading...</h1>}
            <div className='grid grid-cols-2 md:grid-cols-5 gap-3'>
                {!!product && product.map(item => (
                    <div className='bg-gray-300 h-[14rem] border-orange-500 border-2' key={item.product_id}>
                        <Link className='grid justify-center' to={`/product/${item.Product?.id}`}>
                            <img className='h-[10rem]' src={item.Product?.image} alt="product-preview" />
                            <p className='font-semibold'>{item.Product?.name}</p>
                            <p className='font-bold'>Rp. {item.Product?.price}</p>
                        </Link>
                    </div>
                ))}
            </div>
        </>
     );
}
 
export default BestSeller;