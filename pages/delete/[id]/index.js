
'use client';
import { useEffect, useState } from 'react';
import { parseCookies } from 'nookies';
import {useRouter} from "next/router";

export default function Edit(){
    const router = useRouter();
    const { id } = router.query;
    const token = parseCookies().token; // get the token from cookies
    console.log(token)

    return (
        <div>
            <h2>Delete Page for Profile {id}</h2>
        </div>
    );
}
