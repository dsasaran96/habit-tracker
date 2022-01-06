import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { registerUser, resetRegisterState } from 'Components/User/UserSlice'
import { useDispatch, useSelector } from 'react-redux'

const PageContainer = styled.div`
    padding-top: 10px;
`

const PageTitle = styled.div`
    font-size: 30px;
    padding-bottom: 10px;
    padding-left: 100px;
`

const RegisterContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const FormTitle = styled.div`
    font-size: 30px;
    padding-bottom: 10px;
`

const FormContainer = styled.div`
    justify-content: flex-start;
    width: 14%;
`

const InputSection = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 15px;
    label {
        margin-bottom: 5px;
    }
    input {
        padding: 5px;
        border: 2px solid #e3e3e3;
        :focus {
            outline: 2px solid #9da631;
            border: none;
        }
    }
`
const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 15px;
`

const SubmitButton = styled.button`
    background-color: #9da631;
    border: none;
    border-radius: 2px;
    padding: 8px 10px 8px 10px;
    color: white;
    font-family: inherhit;
    font-size: inherhit;
    cursor: pointer;
    :focus {
        outline: none;
        border: none;
    }
`
const StyledLink = styled(Link)`
    text-decoration: none;
    color: #9da631;
    font-weight: bold;
`
const ErrorSection = styled.div`
    color: crimson;
`

const Register = () => {

    const userState = useSelector(state => state.user)
    const { error } = userState.registerState
    const { loggedInUser } = userState

    const history = useNavigate()

    useEffect(() => {
        if(loggedInUser) {
            //redirect
            history('/habits')
        }
    }, [loggedInUser, history])

    const [userInfo, setUserInfo] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const handleUserInfoChange = (e) => {
        const {id, value} = e.target
        setUserInfo((currentState) => ({
            ...currentState,
            [id]: value,
        }))
    }

    const dispatch = useDispatch()

    const handleSubmit = () => {
        dispatch(registerUser(userInfo))
    }

    const findError = (sectionName) => {
        const errorObj = error.find(err => err.param === sectionName)
        return errorObj ? errorObj.msg : null
    }

    const handleResetState = () => {
        dispatch(resetRegisterState())
    }

    return (
        <PageContainer>
            <PageTitle>hab.it</PageTitle>
            <RegisterContainer>
                <FormTitle>Register</FormTitle>
                {error && (<ErrorSection>{findError("registrationError")}</ErrorSection>)}
                <FormContainer>
                    <InputSection>
                        <label htmlFor="firstName">First Name</label>
                        {error && (<ErrorSection>{findError("firstName")}</ErrorSection>)}
                        <input type="text" id="firstName" placeholder="First Name" maxLength={60} onChange={handleUserInfoChange}/>
                    </InputSection>
                    <InputSection>
                        <label htmlFor="lastName">Last Name</label>
                        {error && (<ErrorSection>{findError("lastName")}</ErrorSection>)}
                        <input type="text" id="lastName" placeholder="Last Name" maxLength={60} onChange={handleUserInfoChange}/>
                    </InputSection>
                    <InputSection>
                        <label htmlFor="email">Email</label>
                        {error && (<ErrorSection>{findError("email")}</ErrorSection>)}
                        <input type="text" id="email" placeholder="email@provider.com" maxLength={100} onChange={handleUserInfoChange}/>
                    </InputSection>
                    <InputSection>
                        <label htmlFor="password">Password</label>
                        {error && (<ErrorSection>{findError("password")}</ErrorSection>)}
                        <input type="password" id="password" placeholder="Password" maxLength={128} onChange={handleUserInfoChange}/>
                    </InputSection>
                    <InputSection>
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        {error && (<ErrorSection>{findError("confirmPassword")}</ErrorSection>)}
                        <input type="password" id="confirmPassword" placeholder="Password" maxLength={128} onChange={handleUserInfoChange}/>
                    </InputSection>
                    <ButtonContainer>
                        <SubmitButton type="submit" onClick={handleSubmit}>
                            Register
                        </SubmitButton>
                    </ButtonContainer>
                </FormContainer>
                <div>Already have an account? <StyledLink to="/signin" onClick={handleResetState}>Login Here</StyledLink></div>
            </RegisterContainer>
        </PageContainer>
    )
}

export default Register