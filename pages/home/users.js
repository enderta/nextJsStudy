'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { parseCookies, setCookie, destroyCookie } from 'nookies';

export default function Users1() {
    const [users, setUsers] = useState([]);
    const [jobs, setJobs] = useState([]);
    const cookies = parseCookies();
    const token = cookies.token; // get the token from cookies
    console.log(token)

    useEffect(() => {

        fetchUsers().then()

    }, [token]);

    useEffect(() => {

        fetchJobs().then()

    }, [token]);


    const fetchJobs = async () => {
        try{
            const response = await fetch('/api/jobs', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                }
            });
            const data = await response.json();
            if (data && data.error) {
                destroyCookie(null, 'token');
                alert(data.message);
            }
            else {
                setJobs(data.data);
            }
        } catch (error) {
            console.log('Fetch jobs error: ', error);
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
                alert(data.message);
            } else {
                setUsers(data.data);
            }
        } catch (error) {
            console.log('Fetch users error: ', error);
        }
    };
    console.log(token)
    console.log(jobs)

    return (
        <main>
            <h1>
                {!(users.length === 0 || token.length === 0) ? users.map(user => (
                    <li key={user.id} className='text-base'>
                        <Link href={`/edit/${user.id}`}>
                            <h1> {user.username}</h1>
                        </Link>
                        <Link href={`/delete/${user.id}`}>
                            <h1>delete</h1>
                        </Link>
                    </li>
                )) : 'Loading'}
            </h1>
        </main>
    );
}