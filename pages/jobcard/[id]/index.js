import { useEffect, useState } from 'react';
import { parseCookies } from 'nookies';
import {useRouter} from "next/router";
import 'react-responsive-carousel/lib/styles/carousel.min.css';
export default function Card(){
    const router = useRouter();
    const { id } = router.query;
    const [job,setJob]=useState([]);

    const cookies = parseCookies();
    const token = cookies.token; // get the token from cookies

    useEffect(() => {
        if (id) {
            fetch(`/api/jobs/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token,  // use the token from cookies
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    setJob(data.data);
                });
        }
    }, [id]);
    console.log(job)
    console.log(token)
    return (
        <main className="col-md-4">
            <h1>
                {job.title}
            </h1>

        </main>
    );
}