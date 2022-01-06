import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import MyHabitsDesktop from './MyHabitsDesktop'
import { useSelector } from 'react-redux'

//Shows desktop or mobile version depending on screen-size

const DesktopContainer = styled.div`
    @media only screen and (max-width: 699px) {
        display: none
    }
`

const MobileContainer = styled.div`
    @media only screen and (min-width: 700px) {
        display: none
    }
`

const MyHabits = () => {
    const history = useNavigate()

    const userState = useSelector(state => state.user)
    const { loggedInUser } = userState

    useEffect(() => {
        if(!loggedInUser) {
            //redirect
            history('/signin')
        }
    }, [loggedInUser, history])

    return (
        <>
            <DesktopContainer>
                <MyHabitsDesktop />
            </DesktopContainer>
            <MobileContainer>
                Mobile
            </MobileContainer>
        </>
    )
}

export default MyHabits