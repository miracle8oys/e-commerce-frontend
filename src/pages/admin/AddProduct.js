import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {

    const token = localStorage.getItem("token");
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [desc, setDesc] = useState('');

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const photo = e.target[3].files[0];
        fetch('http://localhost:8000/api/v1/image', 
        {
            method: "POST",
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': token
             },
            body: JSON.stringify({
                ext: photo.name.split(".")[1]
            })
        })
        .then(res => res.json())
        .then(response => {
            uploadImage(response.data, photo);
        });
    }

    const uploadImage = (url, photo) => {
        fetch(`${url}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            body: photo
        })
        .then(res => {
            const imageUrl = res.url.split("?")[0];
            storingProduct(imageUrl);
        })
    }

    const storingProduct = (imageUrl) => {
        fetch('http://localhost:8000/api/v1/product', 
        {
            method: "POST",
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': token
             },
            body: JSON.stringify({
                name,
                image: imageUrl,
                price,
                desc
            })
        })
        .then(res => res.json())
        .then(response => {
            console.log(response);
            navigate("/product")
        });
    }

    return ( 
        <div className="grid justify-center pt-5">
            <h1 className="my-3 text-xl font-semibold">Add Product Form</h1>
            <form className="grid w-[70vw] md:w-[30vw] gap-3" onSubmit={handleSubmit}>
                <input className="rounded-md h-12" type="text" placeholder="Name..." onChange={(e) => setName(e.target.value)} />
                <input className="rounded-md h-12" type="number" placeholder="Price..." onChange={(e) => setPrice(e.target.value)} />
                <input className="rounded-md h-12" type="text" placeholder="Description..." onChange={(e) => setDesc(e.target.value)} />
                <input className="rounded-md h-12" type="file" />
                <button className="py-3 bg-sky-500 rounded-md" type="submit">Submit</button>
            </form>
        </div>
     );
}
 
export default AddProduct;