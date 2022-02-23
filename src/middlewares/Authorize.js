import { Outlet, Link } from "react-router-dom";
import { useSelector } from "react-redux";
const Authorize = () => {
    const user = useSelector(state => state.auth.value)
    return (
        <>
            {!user && 
                <>
                    <h1 className="font-semibold text-2xl pt-[30vh]">403</h1>
                    <h1 className="font-semibold text-2xl">ACCESS NOT ALLOWED</h1>
                    <div className="my-10">
                        <Link className="text-blue-900 text-2xl" to="/login">Login</Link>
                    </div>
                </>
            }
            {user && <Outlet />} 
        </>
    )
}
 
export default Authorize;