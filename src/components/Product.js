import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {HiChevronDoubleDown} from "react-icons/hi"
const Product = () => {
    const [product, setProduct] = useState([]);
    const [errorMsg, setErrorMsg] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [page, setPage] = useState(0);
    const [endIndex, setEndIndex] = useState(0);
  
    useEffect(() => {
        setIsLoaded(true);
        fetch(`http://localhost:8000/api/v1/product?page=${page}`)
            .then(res => res.json())
            .then(result => {
                setProduct(current => [...current, ...result.data]);
                setEndIndex(result.endIndex);
                setIsLoaded(false);
            }, (err) => {
                setErrorMsg(err);
                setIsLoaded(false);
            });
        }, [page]);
    return ( 
        <>
            {errorMsg && <h1>{errorMsg}</h1>}
            {isLoaded && <h1 className='my-28 text-3xl font-bold'>Loading...</h1>}
            <div className='grid grid-cols-2 md:grid-cols-5 gap-3'>
                {product.length !== 0 && product.map(item => (
                    <div className='bg-gray-300 h-[14rem] border-orange-500 border-2' key={item.id}>
                        <Link className='grid justify-center' to={`/product/${item.id}`}>
                            <img className='h-[10rem]' src={item.image} alt="product-preview" />
                            <p className='font-semibold'>{item.name}</p>
                            <p className='font-bold'>Rp. {item.price}</p>
                        </Link>
                    </div>
                ))}
            </div>
            {
                (page + 1) * 5 < endIndex ?
                <button className='text-5xl my-3' onClick={() => setPage(current => current + 1)}><HiChevronDoubleDown /></button>
                : ""
            }
        </>
     );
}
 
export default Product;