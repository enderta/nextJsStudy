import { useEffect, useState } from 'react';
import { parseCookies } from 'nookies';
import {useRouter} from "next/router";
import {getCookie} from "cookies-next";
import 'react-responsive-carousel/lib/styles/carousel.min.css';
export default function Card(){
    const router = useRouter();
    const { id } = router.query;
    const [job,setJob]=useState([]);
    const token= getCookie("token");
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