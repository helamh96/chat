import { Container, Icon, Typography } from "@mui/material";
import React from "react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useDispatch, useSelector } from "react-redux";
import { setCurrentChat } from "../../redux/reducers/chat"
import { getChat } from "../../redux/reducers/getChatInfo";
import { setCurrentChatID } from "../../redux/reducers/chatID";

const ContactCardAccepted = (user) => {
    const dispatch = useDispatch()
    const userRedux = useSelector(state => state.user)
    const me = userRedux[0] === undefined ? "" : userRedux[0].email
    return(
        <Container disableGutters maxWidth={false} sx={{border:"1px solid green" ,paddingLeft: "0px", cursor: "pointer", display:"grid", gridTemplateColumns:"repeat(10, 10%)"}} onClick={() => {dispatch(setCurrentChat(user.email)); dispatch(getChat({me:me, contact:user.email})); dispatch(dispatch(setCurrentChatID(user.email)))}} >
            <Icon><AccountCircleIcon/></Icon><Typography>{user.name}</Typography>
        </Container>
    )
}

export default ContactCardAccepted