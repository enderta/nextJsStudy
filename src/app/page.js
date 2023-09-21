'use client';
import styles from './page.module.css'
import {useEffect, useState} from "react";

export default function Home() {
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

    return (
        <main className={styles.main}>
            <h1>
                {user.map((user) => (
                    <div key={user.id}>
                        <h2>{user.username}</h2>
                        <p>{user.email}</p>

                    </div>

                ))}

            </h1>
        </main>
    )
}