import { useEffect, useState } from "react";

const CarouselPage = () => {

    const [caroImage, setCaroImage] = useState([]);
    const [caroIndex, setCaroIndex] = useState(0);

    useEffect(() => {
        fetch(`http://localhost:8000/api/v1/carousel`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(result => {
            setCaroImage(result.data);
        })
    }, [setCaroImage]);

    useEffect(() => {

        function timeCount() {
            console.log("test timeCount");
            setCaroIndex(current => {
                if (current == 2) {
                   return 0
                } else {
                   return current + 1
                }
            })
            setTimeout(timeCount, 7000)
        }

        timeCount();

        return () => {
            timeCount();
        }

    }, [])


    console.log("test");
    return ( 
        <>
            <div className="pt-5 px-3 flex justify-center">
                <img className="rounded-md h-32 md:h-full" src={caroImage[caroIndex]?.image} alt="caroisel" />
            </div>
        </>
     );
}
 
export default CarouselPage;