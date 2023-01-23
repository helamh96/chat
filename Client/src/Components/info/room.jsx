import { Container, Icon, Typography } from "@mui/material";
import React from "react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useDispatch, useSelector } from "react-redux";
import { setCurrentChat } from "../../redux/reducers/chat"
import { setGroupName } from "../../redux/reducers/group";
import { getChat } from "../../redux/reducers/getChatInfo";
import { setCurrentChatID } from "../../redux/reducers/chatID";    

const roomCard = (card) => {
    const userRedux = useSelector(state => state.user)
    const me = userRedux[0] === undefined ? "" : userRedux[0].email
    const dispatch = useDispatch()
    return(
        <Container disableGutters maxWidth={false} sx={{border:"1px solid green" ,paddingLeft: "0px", cursor: "pointer", display:"grid", gridTemplateColumns:"repeat(10, 10%)"}} onClick={() => {dispatch(setCurrentChat(card.convID)); dispatch(setGroupName(card.name)); dispatch(getChat({me:me, contact:card.convID})); dispatch(setCurrentChatID(card.convID))}}>
            <Icon><AccountCircleIcon/></Icon><Typography>{card.name}</Typography>
        </Container>
    )
}

export default roomCard