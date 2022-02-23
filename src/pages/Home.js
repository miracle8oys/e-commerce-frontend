import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BestSeller from '../components/BestSeller';
import CarouselPage from '../components/Carousel';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Product from '../components/Product';
const Home = () => {

    const [keyword, setKeyword] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        navigate(`/search?name=${keyword}`);
    }

    return (
        <>
            <Navbar />
                <form onSubmit={handleSearch} className='flex w-screen justify-center mt-3 gap-2'>
                    <input placeholder='Search...' className='w-3/4 md:w-2/4 rounded-sm px-3 h-12' type="search" onChange={(e) => setKeyword(e.target.value)} />
                    <button className='py-2 px-2 bg-blue-500 rounded-md font-semibold' type='submit'>Search</button>
                </form>
                <CarouselPage />
                <h1 className='text-2xl font-semibold my-2'>Best Seller</h1>
                <BestSeller />
                <h1 className='text-2xl font-semibold my-2'>Products</h1>
                <Product />
           
            <Footer />
        </>
     );
}
export default Home;