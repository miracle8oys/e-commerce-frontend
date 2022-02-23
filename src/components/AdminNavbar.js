import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import {logout} from "../redux/authSlice";

const AdminNavbar = () =>{
    const [navbarToggle, setNavbarToggle] = React.useState(false);
    const user = useSelector(state => state.auth.value);
    const dispatch = useDispatch();

    const handleLogout = () => {
        localStorage.setItem("token", "");
        dispatch(logout());
    }
    
    return(
        <div className='bg-orange-50 md:font-display md:text-yellow-800 border-b-[1.5px]'>
            <div className="md:container mx-auto md:h-16 hidden md:block">
                <div className='flex justify-between'>
                    <div className='flex md:gap-8'>
                        <div className='flex justify-center items-center md:ml-8 -mt-3'>
                            <Link to="/admin">
                                <h1 className='font-bold text-2xl'>OnlineStore</h1>
                            </Link>
                        </div>
                        <div className='flex justify-center py-5 md:text-base'>
                            <NavLink to="/order" className='font-semibold hover:text-orange-700'>Order</NavLink>
                        </div>
                        <div className='flex justify-center py-5 md:text-base'>
                            <NavLink to="/product" className='font-semibold hover:text-orange-700'>Product</NavLink>
                        </div>
                        <div className='flex justify-center py-5 md:text-base'>
                            <NavLink to="/" className='font-semibold hover:text-orange-700'>Helps</NavLink>
                        </div>
                        <div className='flex justify-center py-5 md:text-base'>
                            <NavLink to="/" className='font-semibold hover:text-orange-700'>About</NavLink>
                        </div>
                    </div>

                    <div className='flex px-10 gap-8'>
                        {!!user ? 
                            <div className='flex justify-center py-5'>
                                <button onClick={handleLogout} className='font-medium hover:font-bold '>Logout</button>
                            </div>
                            :
                            <div className='flex justify-center py-5'>
                                <NavLink to="/login" className='font-medium hover:font-bold '>Login</NavLink>
                            </div>
                        }
                       
                    </div>
                </div>
            </div>


            <div className="md:hidden flex justify-between mx-6 py-5">
                {/* <img src={LogoPet} alt='Petshop Logo' className='w-16'/> */}
                <Link to="/admin">
                    <h1 className='font-bold text-2xl'>OnlineStore</h1>
                </Link>
               
                <button className="outline-none hover:bg-orange-50" type='button' onClick={()=> setNavbarToggle(!navbarToggle)}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>

            <div className={(navbarToggle ? "absolute flex justify-center bg-orange-50 border-b-[1.4px] w-full" : "hidden")}>
                <ul className='ml-8 my-2 text-stone-900 md:hidden font-medium'>
                    <li className='py-1  hover:bg-gray-200 rounded-md  font-sans hover:py-2 px-2'>
                        <NavLink to="/order" className='hover:font-bold '>Order</NavLink>
                    </li>
                    <li className='py-1 hover:bg-gray-200 rounded-md  font-sans hover:py-2 px-2'>
                        <NavLink to="/product" className='hover:font-bold'>Product</NavLink>
                    </li>
                    <li className='hover:bg-gray-200 rounded-md  font-sans hover:py-2 pt-1 mb-5 px-2'>
                        <NavLink to="/" className='hover:font-bold'>About</NavLink>
                    </li >\
                    {!user ? 
                    <li className='flex justify-center mx-6 p-2 bg-gray-200 mb-4 mt-2 rounded-md'>
                        <NavLink to="/login" className='font-bold w-48'>Login</NavLink>
                    </li> 
                    : 
                    <li className='flex justify-center mx-6 p-2 bg-gray-200 mb-4 mt-2 rounded-md'>
                        <button onClick={handleLogout} className='font-bold w-48'>Logout</button>
                    </li> 
                    }
                </ul>
                
            </div>
        </div>
    )
}

export default AdminNavbar;