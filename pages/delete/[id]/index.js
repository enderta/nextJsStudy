
'use client';
import { useEffect, useState } from 'react';
import { parseCookies } from 'nookies';
import {useRouter} from "next/router";
import {getCookie} from "cookies-next";

export default function Edit(){
    const token= getCookie("token");
    const router = useRouter();
    const { id } = router.query;

    console.log(token)

    return (
        <div>
            <h2>Delete Page for Profile {id}</h2>
        </div>
    );
}
