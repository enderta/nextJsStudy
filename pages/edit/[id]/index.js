import { useEffect, useState } from 'react';
import { parseCookies } from 'nookies';
import {useRouter} from "next/router";

export default function Edit(){
    const router = useRouter();
    const { id } = router.query;
    const [user,setUser]=useState([]);

    const cookies = parseCookies();
    const token = cookies.token; // get the token from cookies

    useEffect(() => {
        if (id) {
            fetch(`/api/users/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token,  // use the token from cookies
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    setUser(data.data);
                });
        }
    }, [id]);
    console.log(user)

    return (
        <main>
            {
                user.length!==0 ? (
                    <div>
<h2>Edit Page for Profile {id}</h2>
                        <h2>{user.username}</h2>
                    </div>
                ) : (
                    <div>
                        <h2>Loading...</h2>
                    </div>
                )
            }
        </main>
    );
}