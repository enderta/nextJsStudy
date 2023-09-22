'use client';
import {useEffect, useState} from "react";
import Link from "next/link";

export default function Users1() {
    const [user, setUser] = useState([]);
    const [token, setToken] = useState(localStorage.getItem('token'));

    useEffect(() => {
        loginUser();
    }, []);

    useEffect(() => {
        if (token) fetchUsers();
    }, [token]);

    const loginUser = async () => {
        const body = {
            email: 'et1@gmail.com',
            password: '123456'
        };
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const data = await response.json();
        if (data && data.error) {
            alert(data.message);
        } else {
            localStorage.setItem('token', data.token);
            setToken(data.token);
        }
    };

    const fetchUsers = async () => {
        const response = await fetch('/api/users', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        });
        const data = await response.json();
        if (data && data.error) {
            alert(data.message);
        } else {
            setUser(data.data);
        }
    };
  user.map((user) => (
      console.log(user.id)
    ))

    return (
        <main >
            <h1>
                {user.length===0?"Loading" : user.map((user) => (

                            <li key={user.id} className='text-base'>
                              <Link href={`/edit/${user.id}`}>
                                  {user.username}
                                </Link>
                            </li>

                    )
                )}

            </h1>


        </main>
    )
}

