'use strict'
import { useEffect, useState } from 'react'
import {Button, Card, Form, Image} from "react-bootstrap";
import { setCookie } from "cookies-next";
import 'bootstrap/dist/css/bootstrap.min.css';

const API_URL = 'api/users/login';
const CONTENT_TYPE = 'application/json';
const EXPIRES_DATE = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7);
const LOGIN_ROUTE = '/users';
const REGISTER_ROUTE = '/register';
const DEFAULT_IMAGE_URL = "https://static1.makeuseofimages.com/wordpress/wp-content/uploads/2016/10/camera-photo-lens-stock-images.jpg";

export default function Login() {
    const [credential, setCredential] = useState({username:'', password: ''});
    const [loginError, setLoginError] = useState(null);

    const handleFieldChange = e => {
        setCredential({...credential, [e.target.name]: e.target.value});
    }

    const handleSubmit = async e => {
        e.preventDefault();

        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {'Content-Type': CONTENT_TYPE},
            body: JSON.stringify(credential),
        });

        const data = await response.json();

        if (data.error) {
            setLoginError(data.message);
        } else {
            setCookie("token", data.token, {
                expires: EXPIRES_DATE
            });
            setCookie("user_id", data.user.id, {
                expires: EXPIRES_DATE
            })
            window.location = LOGIN_ROUTE;
        }
    }

    const handleRegistrationClick = () => {
        window.location = REGISTER_ROUTE;
    }

    return (
        <div>
            <div>
                <Image
                    src={DEFAULT_IMAGE_URL}
                    style={{position: "absolute", height: "100%", width: "100%"}}/>
            </div>
            <div className="bg-dark container">
                <div className="row">
                    <div className="col-md-6 offset-md-3">

                        <CardWrapper loginError={loginError}>
                            <Form onSubmit={handleSubmit}>
                                <FormInput
                                    label="User Name"
                                    type="text"
                                    placeholder="Enter user name"
                                    name="username"
                                    testId="username"
                                    value={credential.username}
                                    handleChange={handleFieldChange}
                                />

                                <FormInput
                                    label="Password"
                                    type="password"
                                    placeholder="Password"
                                    name="password"
                                    testId="password"
                                    value={credential.password}
                                    handleChange={handleFieldChange}
                                />

                                <div className="d-flex justify-content-between">
                                    <ButtonWrapper variant={'outline-warning'} testId={'login'} type="submit"> Login </ButtonWrapper>
                                    <ButtonWrapper variant={'outline-warning'} handleClick={handleRegistrationClick}> No account? Register! </ButtonWrapper>
                                </div>
                            </Form>
                        </CardWrapper>
                    </div>
                </div>
            </div>
        </div>
    );
}

function FormInput({label, type, placeholder, name, testId, value, handleChange}) {
    return (
        <Form.Group controlId={`formBasic${name}`}>
            <Form.Label>{label}</Form.Label>
            <Form.Control
                type={type}
                placeholder={placeholder}
                name={name}
                value={value}
                data-testid={testId}
                onChange={handleChange}
            />
        </Form.Group>
    )
}

function ButtonWrapper({ children, variant, testId, type, handleClick }) {
    return <Button variant={variant} data-testid={testId} type={type} onClick={handleClick}>{ children }</Button>
}

function CardWrapper ({ children, loginError }) {
    return (
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
            { children }
        </Card>
    )
}