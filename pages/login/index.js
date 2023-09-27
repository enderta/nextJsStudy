'use strict'
import {Button, Card, Form, Image} from "react-bootstrap";
import { useEffect, useState } from 'react'
import { setCookie } from 'nookies'
import 'bootstrap/dist/css/bootstrap.min.css';
export default function Login(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState('');
    const [loginError, setLoginError] = useState('');


    const handleChanges = e => {
        const { name, value } = e.target;

        switch(name) {
            case 'username':
                setUsername(value);
                break;
            case 'password':
                setPassword(value);
                break;
            default:
                break;
        }
    }

    const handleSubmit = e => {
        e.preventDefault();
       fetch('api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
            ,
            body: JSON.stringify({
                username: username,
                password: password
            }
            )
        })
            .then(response => response.json())
            .then(data => {
                if (data && data.error) {
                    setLoginError(data.message);
                }
                else {
                    setCookie(null, 'token', data.token, {
                        maxAge: 30 * 24 * 60 * 60,
                        path: '/',
                    });
                    setToken(data.token);
                }
            })
        window.location = '/users';
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