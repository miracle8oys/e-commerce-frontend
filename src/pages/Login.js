import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const Login = ({setChanges}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch("http://localhost:8000/api/v1/login", 
        {   
            method: "POST", 
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: username,
                password: password
            })
        })
        .then(res => res.json())
        .then(result => {
            setErrMsg(result.message);
            if (result.data) {
                localStorage.setItem("token", result.data);
            }
        }, (err) => {
            console.log(err);
        }).then(() => {
            setChanges(current => current + 1);
            navigate("/");
        })

    
} 
console.log("test");
    return ( 
        <>
        <Navbar />
        <h1 className="font-semibold text-3xl py-10">Login</h1>
        {errMsg && <h1 className="bg-orange-500 h-16 text-2xl">{errMsg}</h1>}
        <div className="grid justify-center h-[70vh]">
            <form onSubmit={handleSubmit}>
                <input placeholder="Username..." className="block my-5 h-12 w-72 rounded-md" type="text" onChange={(e) => setUsername(e.target.value)} />
                <input placeholder="Password..." className="block my-5 h-12 w-72 rounded-md" type="password" onChange={(e) => setPassword(e.target.value)} />
                <button className="bg-orange-500 text-2xl py-2 font-semibold rounded-md px-3" type="submit">Submit</button>
            </form>
            <p className="mt-20">
                <Link className="text-blue-700" to="/register">Doesn't have any account? Register</Link>
            </p>
        </div>
        <Footer />
        </>
     );
}
 
export default Login;