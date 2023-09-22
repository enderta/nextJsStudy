
'use client';
import {useEffect, useState} from "react";
import {useParams} from "next/navigation";
import {useRouter} from "next/router";

export default function Edit(){
    const router = useRouter()
    const { id } = router.query
    const [user,setUser]=useState([])

    useEffect(() => {
        fetch(`/api/users/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')

            }
        }).then((response) => response.json())
            .then((data) => {
                console.log(data)
                setUser(data.data)
            });
        }
    , [id]);
    console.log(user.id)


    return (
        <main>
            <h1>
                {user.username}
            </h1>
        </main>
    );
}
