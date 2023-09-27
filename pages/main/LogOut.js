'use client'
import { useEffect, useState } from 'react';
import {Button, Modal} from 'react-bootstrap';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
export default function LogOut() {
    const handleLogout = () => {

        window.location = '/home';
    }
    return (
        <div style={{margin:"10px"}}>
            <Button variant={'outline-info'} onClick={handleLogout} data-tesid={"logout"}>Logout</Button>
        </div>
    );
};
