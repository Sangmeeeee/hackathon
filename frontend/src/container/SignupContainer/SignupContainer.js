import React,{useEffect, useState} from "react"
import './SignupContainer.css'
import { Form,Container,Button } from "semantic-ui-react"
import axios from "axios"

axios.defaults.withCredentials = true

const SignupContainer = () => {
    const [ID,setID] = useState(null)
    const [PW,setPW] = useState(null)
    const [name,setName] = useState(null)

    const handleChangeID = (e) => {
        setID(e.target.value)
    }

    const handleChangePW = (e) => {
        setPW(e.target.value)
    }

    const handleChangeName = (e) => {
        setName(e.target.value)
    }

    const handleBackToLogin = (e) => {
        window.location.href = '/'
    }

    const handleSubmit = () => {
        axios.post('http://localhost:8080/api/member/add',{
            loginId : ID,
            password:PW,
            name : name
        }).then(data => {
            console.log(data.headers)
            console.log(data)
            console.log(data.data.errorMessage)
        })
    }


    return(
        <div className='SignupContainer'>
            <div className='SignupForm'>
                <Form onSubmit={handleSubmit}>
                    <Form.Field>
                        <label>ID</label>
                        <input className='ID' onChange={handleChangeID.bind(this)} placeholder='ID' />
                    </Form.Field>
                    <Form.Field>
                        <label>PW</label>
                        <input onChange={handleChangePW.bind(this)} type='password' placeholder='PW' />
                    </Form.Field>
                    <Form.Field>
                        <label>Name</label>
                        <input className='Name' onChange={handleChangeName.bind(this)} placeholder='Name' />
                    </Form.Field>
                    <Container textAlign='center'>
                        <Button type='submit'>Signup</Button>
                        <Button type='button' onClick={handleBackToLogin}>BackToLogin</Button>
                    </Container>
                </Form>
            </div>
        </div>
    )
}

export default SignupContainer