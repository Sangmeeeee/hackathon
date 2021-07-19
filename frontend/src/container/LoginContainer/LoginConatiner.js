import React, { useEffect, useState } from 'react'
import {Form, Checkbox, Button, Container} from 'semantic-ui-react'
import axios from 'axios'
import './LoginContainer.css'


/*

로그인 기능 및 회원가입 페이지로 넘어가게 해주는 기능을 수행한다.

axios를 통해 server와 통신하여 ID 및 PW를 검증한다.


*/
const LoginContainer = () => {
    const [ID,setID] = useState(null)
    const [PW,setPW] = useState(null)

    const handleLogin = () => {
        document.getElementsByClassName('LoginContainer')[0].remove()
        // axios.post()
    }

    const handleSignup = () => {
        window.location.href='/Signup'
    }

    const handleChangeID = (e) => {
        setID(e.target.value)
    }

    const handleChangePW = (e) => {
        setPW(e.target.value)
    }

    return (
        <div className='LoginContainer'>
            <div className='LoginForm'>
                <Form>
                    <Form.Field>
                        <label>ID</label>
                        <input onChange={handleChangeID.bind(this)} placeholder='ID' />
                    </Form.Field>
                    <Form.Field>
                        <label>PW</label>
                        <input onChange={handleChangePW.bind(this)} type='password' placeholder='PW' />
                    </Form.Field>
                    <Container textAlign='center'>
                        <Button onClick={handleLogin} >Login</Button>
                        <Button onClick={handleSignup}>Signup</Button>
                    </Container>
                </Form>
            </div>
        </div>
    )
}

export default LoginContainer