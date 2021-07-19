import React,{useState} from "react"
import './SignupContainer.css'
import { Form,Container,Button } from "semantic-ui-react"
import axios from "axios"

const SignupContainer = () => {
    const [ID,setID] = useState(null)
    const [PW,setPW] = useState(null)
    const [Email,setEmail] = useState(null)

    const handleChangeID = (e) => {
        setID(e.target.value)
    }

    const handleChangePW = (e) => {
        setPW(e.target.value)
    }

    const handleChangeEmail = (e) => {
        setEmail(e.target.value)
    }

    return(
        <div className='SignupContainer'>
            <div className='SignupForm'>
                <Form>
                    <Form.Field>
                        <label>ID</label>
                        <input onChange={handleChangeID.bind(this)} placeholder='ID' />
                    </Form.Field>
                    <Form.Field>
                        <label>E-mail</label>
                        <input onChange={handleChangeEmail.bind(this)} placeholder='KNUniverse@knu.ac.kr' />
                    </Form.Field>
                    <Form.Field>
                        <label>PW</label>
                        <input onChange={handleChangePW.bind(this)} type='password' placeholder='PW' />
                    </Form.Field>
                    <Form.Field>
                        <label>Re-enter PW</label>
                        <input type='password' placeholder='Re-enter PW' />
                    </Form.Field>
                    <Container textAlign='center'>
                        <Button>Signup</Button> 
                    </Container>
                </Form>
            </div>
        </div>
    )
}

export default SignupContainer