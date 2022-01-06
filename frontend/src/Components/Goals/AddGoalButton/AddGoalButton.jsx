import React, { useState } from "react"
import styled from 'styled-components'
import { Modal } from 'react-responsive-modal'

const InnerAddGoalButton = styled.div`
    text-transform: uppercase;
    display: flex;
    align-items: center;
    transition: 0.3s;
    img {
        max-width: 16px;
        margin-right: 8px;
        transition: 0.3s;
    }
    :hover {
        transform: scale(1.2);
        cursor: pointer;
        img {
            transform: rotate(360deg)
        }
    }
`;

const ModalContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 375px;
`

const ModalTitle = styled.div`
    font-size: 30px;
    margin-bottom: 20px;
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

const ErrorSection = styled.div`
    color: crimson;
`
const ButtonContainer = styled.div`
    display: flex;
    justify-content: flex-start;
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

const AddGoalButton = () => {
    const [showModal, setShowModal] = useState(false);
    const [showError, setShowError] = useState(false);
    const [goalName, setGoalName] = useState('')

    const onOpenModal = () => setShowModal(true)
    const onCloseModal = () => setShowModal(false)

    const handleSubmit = () => {
        if(!goalName) {
            setShowError(true)
            return
        }
        //dispatch goal action
    }

    return (
        <>
            <InnerAddGoalButton onClick={onOpenModal}>
                <img src="images/add.png" alt="add-goal-button" />
                add goal
            </InnerAddGoalButton>
            <Modal open={showModal} onClose={onCloseModal} center>
                <ModalContentContainer>
                    <ModalTitle>Create a new Goal</ModalTitle>
                    <InputSection>
                        <label htmlFor="createGoal">Goal Name</label>
                        {showError && (<ErrorSection>Enter a goal name</ErrorSection>)}
                        <input type="text" id="goalName" placeholder="Lose weight" maxLength={50} onChange={(e) => setGoalName(e.target.value)}/>
                    </InputSection>
                    <ButtonContainer>
                        <SubmitButton type="submit" onClick={handleSubmit}>
                            Add Goal
                        </SubmitButton>
                    </ButtonContainer>
                </ModalContentContainer>
            </Modal>
        </>
    )
}

export default AddGoalButton