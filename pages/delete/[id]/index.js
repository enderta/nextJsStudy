
'use client';
import {useEffect, useState} from "react";
import {useParams} from "next/navigation";
import {useRouter} from "next/router";

export default function Edit(){
    const router = useRouter();
    const { id } = router.query;

    return (
        <div>
            <h2>Delete Page for Profile {id}</h2>
        </div>
    );
}
