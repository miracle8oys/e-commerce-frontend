import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errMsg, setErrMsg] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password.length < 6) {
            setErrMsg("Pasword length atleast 6 character long!");
            return false;
        }

        if (password !== confirmPassword) {
            setErrMsg("Password and confirm password not match");
            return false;
        }
        fetch("http://localhost:8000/api/v1/register", 
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
            navigate("/login");
        }, (err) => {
            console.log(err);
        });

} 
console.log("test");
    return ( 
        <>
        <Navbar />
        <h1 className="font-semibold text-3xl py-10">Register</h1>
        {errMsg && <h1 className="bg-orange-500 h-16 text-2xl">{errMsg}</h1>}
        <div className="grid justify-center h-[70vh]">
            <form onSubmit={handleSubmit}>
                <input placeholder="Username..." className="block my-5 h-12 w-72 rounded-md" type="text" onChange={(e) => setUsername(e.target.value)} />
                <input placeholder="Password..." className="block my-5 h-12 w-72 rounded-md" type="password" onChange={(e) => setPassword(e.target.value)} />
                <input placeholder="Password..." className="block my-5 h-12 w-72 rounded-md" type="password" onChange={(e) => setConfirmPassword(e.target.value)} />
                <button className="bg-orange-500 text-2xl py-2 font-semibold rounded-md px-3" type="submit">Submit</button>
            </form>
        </div>
        <Footer />
        </>
     );
}
 
export default Register;