import React, { useEffect, useState } from 'react'
import {Form, Checkbox, Button, Container} from 'semantic-ui-react'
import axios from 'axios'
import { api_server } from '../../configs/configs'
import './LoginContainer.css'


/*

로그인 기능 및 회원가입 페이지로 넘어가게 해주는 기능을 수행한다.

axios를 통해 server와 통신하여 ID 및 PW를 검증한다.


*/
const LoginContainer = () => {
    const [ID,setID] = useState(null)
    const [PW,setPW] = useState(null)

    const handleSignup = () => {
        window.location.href='/Signup'
    }

    const handleChangeID = (e) => {
        setID(e.target.value)
        window.sessionStorage.setItem('ID',ID)
    }

    const handleChangePW = (e) => {
        setPW(e.target.value)
    }

    const handleSubmit = () => {
        axios.post(`${api_server}/api/login`,{
            loginId : ID,
            password:PW,
        }).then(res => {
            if(res.data.status === 'success') {
                window.location.href = '/'+ID
                window.sessionStorage.setItem('ID',ID)
            }
        })
    }

    return (
        <div className='LoginContainer'>
            <div className='LoginForm'>
                <Form onSubmit={handleSubmit}>
                    <Form.Field>
                        <label>ID</label>
                        <input name='loginId'onChange={handleChangeID.bind(this)} placeholder='ID' />
                    </Form.Field>
                    <Form.Field>
                        <label>PW</label>
                        <input name='password' onChange={handleChangePW.bind(this)} type='password' placeholder='PW' />
                    </Form.Field>
                    <Container textAlign='center'>
                        <Button type='submit'>Login</Button>
                        <Button type='button' onClick={handleSignup}>Signup</Button>
                    </Container>
                </Form>
            </div>
        </div>
    )
}

export default LoginContainer