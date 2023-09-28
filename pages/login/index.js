'use strict'
// Header imports
import { useEffect, useState } from 'react'
import {Button, Card, Form, Image} from "react-bootstrap";
import { setCookie } from "cookies-next";
import 'bootstrap/dist/css/bootstrap.min.css';

// Constants
const API_URL = 'api/users/login';
const CONTENT_TYPE = 'application/json';
const EXPIRES_DATE = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7);
export default function Login(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setError] = useState(null);

    const handleChanges = e => {
        const { name, value } = e.target;
        if (name === 'username') setUsername(value);
        else setPassword(value);
    }




    const handleSubmit = async e => {
        e.preventDefault();

        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {'Content-Type': CONTENT_TYPE},
            body: JSON.stringify({username, password}),
        });

        const data = await response.json();

        if (data.error) {
            setError(data.message);
        } else {
            setCookie("token", data.token, {
                expires: EXPIRES_DATE
            });
            window.location = '/users';
        }
    }



    return (
        <div>
            <div>
                <Image
                    src="https://static1.makeuseofimages.com/wordpress/wp-content/uploads/2016/10/camera-photo-lens-stock-images.jpg"
                    style={{position: "absolute", height: "100%", width: "100%"}}/>
            </div>
            <div className="bg-dark container">
                <div className="row">
                    <div className="col-md-6 offset-md-3">

                        <Card
                            className={'bg-dark text-light'}
                            style={{margin: '10px', padding: '10px', opacity: '0.9'}}
                        >
                            <h1
                                className={`text-center ${ loginError ? 'text-danger' : null}`}
                                style={{color: loginError ? 'red' : 'goldenrod'}}
                            >
                                { loginError || 'Login'}
                            </h1>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>User Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter user name"
                                        name="username"
                                        value={username}
                                        data-testid="username"
                                        onChange={handleChanges}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Password"
                                        name="password"
                                        value={password}
                                        data-testid="password"
                                        onChange={handleChanges}
                                    />
                                </Form.Group>
                                <br/>
                                <div className="d-flex justify-content-between">
                                    <Button variant={'outline-warning'} data-testid={"login"} type="submit">
                                        Login
                                    </Button>
                                    <Button
                                        variant={'outline-warning'}
                                        onClick={() => {
                                            window.location = '/register';
                                        }}
                                    >
                                        No account? Register!
                                    </Button>
                                </div>
                            </Form>
                        </Card>
                    </div>
                </div>
            </div>
        </div>

    );
}