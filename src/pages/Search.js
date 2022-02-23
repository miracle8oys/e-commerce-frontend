import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const Search = () => {
    const [param, setParam] = useSearchParams({});

    const [product, setProduct] = useState([]);
    const [errorMsg, setErrorMsg] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        fetch(`http://localhost:8000/api/v1/searchproduct?name=${param.get("name")}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(result => {
            setProduct(result.data);
            setIsLoaded(false);
        }, (err) => {
            setErrorMsg(err);
            setIsLoaded(false);
        })

    }, [param])

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(param.get("name"));
    }
    return ( 
        <>
            <Navbar />
            <form className="flex gap-2 justify-center px-3 py-5" onSubmit={handleSubmit}>
                <input className="w-3/4 md:w-2/4 rounded-sm px-3 h-12" type="search" onChange={(e) => setParam({name: e.target.value})} />
                <button className="py-2 px-2 bg-blue-500 rounded-md font-semibold" type="submit">Submit</button>
            </form>

            {errorMsg && <h1>{errorMsg}</h1>}
            {isLoaded && <h1 className='my-28 text-3xl font-bold'>Loading...</h1>}
            <div className='grid grid-cols-2 md:grid-cols-5 gap-3 min-h-[70vh]'>
                {!!product && product.map(item => (
                    <div className='bg-gray-300 h-[14rem] border-orange-500 border-2' key={item.id}>
                        <Link className='grid justify-center' to={`/product/${item.id}`}>
                            <img className='h-[10rem]' src={item.image} alt="product-preview" />
                            <p className='font-semibold'>{item.name}</p>
                            <p className='font-bold'>Rp. {item.price}</p>
                        </Link>
                    </div>
                ))}
            </div>
            <Footer />
        </>
     );
}
 
export default Search;