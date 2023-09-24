'use strict'
import {Button, Card, Form, Image} from "react-bootstrap";
import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Login() {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');

    const registerUser = async () => {
        const body = {
            email: email,
            username: username,
            password: password
        };
        try {
            const response = await fetch('/api/users/register', {
                method: 'POST',
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            if (!response.ok) throw new Error("Server Response: " + response.statusText);
            const data = await response.json();
            if (data.status === 'success') {
                window.location = '/login';
            } else {
                alert("Error");
            }
        } catch (error) {
            console.log('Login error: ', error);
            setLoginError(error.toString());
            alert("username and email must be unique");
        }
    }

    const handleChanges = e => {
        const { name, value } = e.target;

        switch(name) {
            case 'username':
                setUsername(value);
                break;
            case 'password':
                setPassword(value);
                break;
            case 'email':
                setEmail(value);
                break;
            default:
                break;
        }
    }

    const handleSubmit = e => {
        e.preventDefault();
        registerUser();
    }
    return (
        <main>
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
                                className="text-center"
                                style={{ color: 'goldenrod'  }}
                            >
                                Register
                            </h1>
                            <Form onSubmit={handleSubmit} >
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter email"
                                        name="email"
                                        value={email}
                                        onChange={handleChanges}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>User Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter User Name"
                                        name="username"
                                        value={username}
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
                                        onChange={handleChanges}
                                    />
                                </Form.Group>
                            </Form>
                            <br/>
                            <div className="d-flex justify-content-between">
                                <Button variant={'outline-warning'} type="submit" onClick={handleSubmit}>
                                    Register
                                </Button>
                                <Button
                                    variant={ 'outline-warning'}
                                    onClick={() => {
                                        window.location = '/login';
                                    }}
                                >
                                    Have an account? Login!
                                </Button>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </main>
    );
}