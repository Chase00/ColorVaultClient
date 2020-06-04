import React, { useState } from 'react';
import APIURL from '../../Helpers/enviroment';
import { MdEmail, MdLock } from 'react-icons/md';
import { Link } from 'react-router-dom'
import './Auth.css'
import { 
    Form, 
    Label, 
    Input, 
    Container, 
    Row, 
    Col, 
    InputGroup, 
    InputGroupAddon, 
    InputGroupText 
} from 'reactstrap';

const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    let handleSubmit = (event) => {
        event.preventDefault();

        fetch(`${APIURL}/api/user/login`, {
            method: 'POST',
            body: JSON.stringify({

                user: {
                    email: email,
                    password: password

                }
            }),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(
            (response) => response.json()
        ).then((data) => {
            props.updateToken(data.sessionToken)
        })
    }

    return (
        <Container className="auth-container">
            <Row>
                <Col md="4" />
                <Col md="4">
                    <h2 class="auth-title">Log in to your account</h2>
                    <Form onSubmit={handleSubmit}>

                        <Label htmlFor="email">Email</Label>
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText><MdEmail size={20} /></InputGroupText>
                            </InputGroupAddon>
                            <Input
                                name="email"
                                type="email"
                                placeholder="Email address"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)} />
                        </InputGroup>

                        <Label htmlFor="password">Password</Label>
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText><MdLock size={20} /></InputGroupText>
                            </InputGroupAddon>
                            <Input
                                name="password"
                                type="password"
                                placeholder="Password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} />
                        </InputGroup>

                        <div style={{ textAlign: "center" }}>
                            <button type="submit" class="user-button">Log In</button>
                        </div>
                    </Form>
                    <Link to="/signup"><p class="auth-link"> Don't have an account? <br /> Click here to <b>Sign Up</b></p></Link>
                </Col>
            </Row>
        </Container>
    )
}

export default Login;