'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { parseCookies, setCookie, destroyCookie } from 'nookies';

export default function Users1() {
    const [users, setUsers] = useState([]);
    const cookies = parseCookies();
    const [token, setToken] = useState(cookies.token || '');

    useEffect(() => {
        if (!token) {
            loginUser();
        } else {
            fetchUsers();
        }
    }, [token]);

    const loginUser = async () => {
        const body = {
            email: 'et1@gmail.com',
            password: '123456'
        };
        try {
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
                setCookie(null, 'token', data.token, {
                    maxAge: 30 * 24 * 60 * 60,
                    path: '/',
                });
                setToken(data.token);
            }
        } catch (error) {
            console.log('Login error: ', error);
        }
    };

    const fetchUsers = async () => {
        try {
            const response = await fetch('/api/users', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                }
            });
            const data = await response.json();
            if (data && data.error) {
                destroyCookie(null, 'token');
                setToken('');
                alert(data.message);
            } else {
                setUsers(data.data);
            }
        } catch (error) {
            console.log('Fetch users error: ', error);
        }
    };

    return (
        <main>
            <h1>
                {users.length === 0 ? 'Loading' : users.map(user => (
                    <li key={user.id} className='text-base'>
                        <Link href={`/edit/${user.id}`}>
                           <h1> {user.username}</h1>
                        </Link>
                        <Link href={`/delete/${user.id}`}>
                            <h1>delete</h1>
                        </Link>
                    </li>
                ))}
            </h1>
        </main>
    );
}