import { useEffect, useState } from "react";

const GetUser = () => {
    const [errMsg, setErrMsg] = useState(null);
    const [userData, setUserData] = useState({});
    const token = localStorage.getItem("token");

    useEffect(() => {
        fetch("http://localhost:8000/api/v1/status", 
        {   
            method: "GET", 
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': token
             }
        })
        .then(res => res.json())
        .then(result => {
            setErrMsg(result.message);
            setUserData(result.data);
        }, (err) => {
            console.log(err);
        });
    }, [])

    console.log("test");
    return ( 
        <>
            {errMsg && <h1>{errMsg}</h1>}
            <h1>{userData.username}</h1>
            <h1>{userData.id}</h1>
            {userData.isAdmin ? <h1>Admin</h1> : <h1>User</h1>}
        </>
     );
}
 
export default GetUser;