import React from "react"
import { Typography, Container, IconButton, Divider, TextField, Button } from "@mui/material"
import AccountCircle from "@mui/icons-material/AccountCircle"
import SendIcon from '@mui/icons-material/Send';
import GestureIcon from '@mui/icons-material/Gesture';
import { useState } from "react";
import MyMsg from "./MyMsg"
import OtherSimpleMessage from "./OtherSimpleMessage"
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch } from "react-redux";
import { setMessages } from "../../redux/reducers/messages";
import MyScribble from "./MyScribble";
import OtherSimpleScribble from "./OtherSimpleScribble"
import Scribble from "./Scribble";
import io from 'socket.io-client';
import { sendMessage, resetValue } from "../../redux/reducers/sendMessage";

const socket = io("http://localhost:4000");
console.log(socket)

const chatView = (state) => {
    const {t} = useTranslation()
    const dispatch = useDispatch()
    const [msg, setMsg] = useState("")
    const [modal, setModal] = useState(false)
    const messagesRedux = useSelector(state => state.messages)
    const userRedux = useSelector(state => state.user)
    const user = userRedux[0] === undefined ? "" : userRedux[0]
    const msgRedux = useSelector(state => state.sendMessage)
    const chatIDRedux = useSelector(state => state.chatID)

    socket.on("getMsg", async(args) => {
        if(args.remittent !== user.email && args.convID === chatIDRedux){
            let refreshedMSG = [...messagesRedux]
            refreshedMSG.push({convID:args.convID, msg:args.msg, remittent:args.remittent, date:args.timestamp, isImage:args.isImage})
            dispatch(setMessages(refreshedMSG))
        }
    })

    const front = (msg, isImage) => {
        let refreshedMSG = [...messagesRedux]
        refreshedMSG.push({convID:chatIDRedux, msg:msg, remittent:state.me, date: Date.now(), isImage: isImage})
        dispatch(setMessages(refreshedMSG))
        setMsg("");
    }

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

    const setScribbleInfo = () => {
        const canvas = document.getElementById("canvas")
        const urlCanvas = canvas.toDataURL(canvas).toString()
        dispatch(sendMessage({msg:urlCanvas, remittent: state.me, chatID: chatIDRedux, isImage: true}))
        front(urlCanvas, true)    
        verify()
    }

    const open = () => {
        setModal(true)
    }

    const close = () => {
        setModal(false)
    }

    return(
        <Container disableGutters sx={{width:"70vw"}}>
    	  	<Container disableGutters sx={{backgroundColor:  "primary.main", display:"grid", gridTemplateColumns:"repeat(10, 10%)"}}>
                <IconButton><AccountCircle sx={{color:"white", display:"grid", float:"left", fontSize:"160%"}}/></IconButton>
                <Typography sx={{color:"white", display:"grid", alignItems:"center"}}>{state.actualChat}</Typography>
            </Container>
            <Divider/>
                <Container disableGutters sx={{display:"inline-block", width:"70vw", height:"80vh", overflowY:"scroll"}}>
                    {messagesRedux.map(e => {
                        if(e.remittent !== state.actualChat){
                            if(e.isImage){
                                return (<MyScribble key={e._id} msg={e.msg} date={e.date}></MyScribble>)
                            }
                            return (<MyMsg key={e._id} msg={e.msg} date={e.date}></MyMsg>)
                        }else{
                            if(e.isImage){
                                return (<OtherSimpleScribble key={e._id} msg={e.msg} remittent={e.remittent} date={e.date}/>)
                            }else{
                                return (<OtherSimpleMessage key={e._id} msg={e.msg} remittent={e.remittent} date={e.date}></OtherSimpleMessage>)
                            }
                            
                        }
                    })
                    }
                </Container>
                <Container disableGutters sx={{backgroundColor:  "primary.main", display:"grid", gridTemplateColumns:"repeat(10, 10%)", height:"10vh", float:"left", paddingLeft:"1px"}}>
                    <IconButton onClick={open}><GestureIcon sx={{color:"white", display:"grid", gridColumn:"1" , float:"left", fontSize:"160%"}}/></IconButton>
                    <Dialog open={modal} onClose={close}>
                        <DialogTitle>{t("DrawSomething")}</DialogTitle>
                            <Scribble/>
                        <DialogActions>
                        <Button onClick={() => {close(); setMsg("")}}>{t("cancel")}</Button>
                            <Button onClick={() => {setScribbleInfo(); close()}}>{t("Send")}</Button>
                        </DialogActions>
                    </Dialog>
                    <TextField variant="filled" value={msg} sx={{background:"white", display:"grid", gridColumn:"2/10"}} onChange={(e) => setMsg(e.target.value)}/>
                    <IconButton onClick={() => {if(msg){dispatch(sendMessage({msg:msg, remittent: state.me, chatID: chatIDRedux, isImage: false})); front(msg, false);  verify()}}}>
                        <SendIcon sx={{color:"white", display:"grid", gridColumn:"10", float:"left", fontSize:"160%"}}/>
                    </IconButton>
                </Container>
    	</Container>
    )
}

export default chatView