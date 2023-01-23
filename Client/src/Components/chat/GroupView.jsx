import React from "react"
import { Typography, Container, IconButton, Divider, TextField, Button } from "@mui/material"
import SendIcon from '@mui/icons-material/Send';
import GestureIcon from '@mui/icons-material/Gesture';
import { useState } from "react";
import MyMsg from "./MyMsg"
import { useSelector } from "react-redux";
import OtherMsg from "./OtherMsg"
import Swal from "sweetalert2";
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { useTranslation } from "react-i18next";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch } from "react-redux";
import { setMessages } from "../../redux/reducers/messages";
import MyScribble from "./MyScribble";
import Scribble from "./Scribble";
import io from 'socket.io-client';
import { sendMessage, resetValue } from "../../redux/reducers/sendMessage";
import { addToGroup } from "../../redux/reducers/addToGroup";

const socket = io("http://localhost:4000");

const groupView = () => {

    const {t} = useTranslation()
    const dispatch = useDispatch()
    const [msg, setMsg] = useState("")
    const [modal, setModal] = useState(false)
    const [scribble, setScribble] = useState(false)
    const [contacts, setContacts] = useState("")
    const messagesRedux = useSelector(state => state.messages)
    const userRedux = useSelector(state => state.user)
    const user = userRedux[0] === undefined ? "" : userRedux[0]
    const chatIDRedux = useSelector(state => state.chatID)
    const groupNameRedux = useSelector(state => state.groupChat)
    const groupName = groupNameRedux === undefined ? "" : groupNameRedux
    const msgRedux = useSelector(state => state.sendMessage)
    const addRedux = useSelector(state => state.AddToGroup)

    if(user !== undefined){
        socket.emit("newUser", {userID:user.email, convID: chatIDRedux})
    }

    socket.on("getMsg", async(args) => {
        if(args.remittent !== user.email && args.convID === chatIDRedux){
            let refreshedMSG = [...messagesRedux]
            refreshedMSG.push({convID:chatIDRedux, msg:args.msg, remittent:args.remittent, date:args.timestamp, isImage:args.isImage})
            await dispatch(setMessages(refreshedMSG))
        }
    })

    const verify = () =>{
        if(msgRedux.value){
            if(!msgRedux.value.sendMsg.sent){
                Swal.fire({
                    title:"Error!",
                    text: `${t("MessageError")}`
                })
            }
            dispatch(resetValue())
        }
    } 

    const front = (msg, isImage) => {     
        let refreshedMSG = [...messagesRedux]
        refreshedMSG.push({convID:chatIDRedux, msg:msg, remittent:user.email, date: Date.now(), isImage: isImage})
        dispatch(setMessages(refreshedMSG))
        setMsg("");
    }

    const verifyAdd = () => {
        if(addRedux.value){
            if(!addRedux.value.addToGroup.response){
                Swal.fire({
                    title:"Error!",
                    text:t("ErrorAdding")
                })
            }
        }
    }

    const setScribbleInfo = () => {
        const canvas = document.getElementById("canvas")
        const urlCanvas = canvas.toDataURL(canvas).toString()
        dispatch(sendMessage({msg:urlCanvas, remittent: user.email, chatID: chatIDRedux, isImage: true}))
        verify(urlCanvas, true)          
    }

    const open = () => {
        setModal(true)
    }

    const close = () => {
        setModal(false)
    }

    const openScribble = () => {
        setScribble(true)
    }

    const closeScribble = () => {
        setScribble(false)
    }

    return(
        <Container disableGutters sx={{width:"70vw"}}>
    	  	<Container disableGutters sx={{backgroundColor:  "primary.main", display:"flex", height:"10vh", width:"70vw", float:"left", paddingLeft:"1px"}}>
                <IconButton onClick={open}><PersonAddAltIcon sx={{color:"white", display:"flex", float:"left", fontSize:"160%"}}/></IconButton>
                <Typography sx={{color:"white", display:"flex", alignItems:"center"}}>{groupName}</Typography>
            </Container>
            <Dialog open={modal} onClose={close}>
                <DialogTitle>{t("contactsToAdd")}</DialogTitle>
                <TextField
                    margin="dense"
                    id="name"
                    type="email"
                    fullWidth
                    variant="standard"
                    onChange={(e) => setContacts(e.target.value)}
                />
                <DialogActions>
                    <Button onClick={close}>{t("cancel")}</Button>
                    <Button onClick={() => {dispatch(addToGroup({contactsToAdd:contacts, convID:chatIDRedux, nameOfGroup:groupName})); close(); verifyAdd()}}>{t("add")}</Button>
                </DialogActions>
            </Dialog>
            <Divider/>
                <Container disableGutters sx={{display:"inline-block", width:"70vw", height:"80vh", overflow:"scroll"}}>
                    {messagesRedux.map(e => {
                        if(e.remittent !== user.email){
                            if(e.isImage){
                                return (<MyScribble key={e._id} msg={e.msg} date={e.date}></MyScribble>)
                            }
                            return(<OtherMsg key={e._id} msg={e.msg} remittent={e.remittent} date={e.date}></OtherMsg>)
                        }else{
                            if(e.isImage){
                                return (<MyScribble key={e._id} msg={e.msg} date={e.date}></MyScribble>)
                            }
                            return (<MyMsg key={e._id} msg={e.msg} date={e.date}></MyMsg>)
                        }
                    })
                    }
                </Container>
                <Container disableGutters sx={{backgroundColor:  "primary.main", display:"flex", height:"10vh", width:"70vw", float:"left", paddingLeft:"1px"}}>
                    <IconButton onClick={openScribble}><GestureIcon sx={{color:"white", display:"flex", float:"left", fontSize:"160%"}}/></IconButton>
                    <Dialog open={scribble} onClose={closeScribble}>
                        <DialogTitle>{t("DrawSomething")}</DialogTitle>
                            <Scribble/>
                        <DialogActions>
                            <Button onClick={() => {closeScribble(); setMsg("")}}>{t("cancel")}</Button>
                            <Button onClick={() => {setScribbleInfo(); closeScribble()}}>{t("Send")}</Button>
                        </DialogActions>
                    </Dialog>
                    <TextField variant="filled" value={msg} sx={{background:"white", width:"60vw", display:"flex"}} onChange={(e) => {setMsg(e.target.value)}}/>
                    <IconButton onClick={() => {dispatch(sendMessage({msg:msg, remittent: user.email, chatID: chatIDRedux, isImage: false})); front(msg, false); verify()}}>
                        <SendIcon sx={{color:"white", display:"flex", float:"left", fontSize:"160%"}}/>
                    </IconButton>
                </Container>
    	</Container>
    )
}

export default groupView