import React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ChatView from "./viewChat";
import GroupView from "./GroupView";
import EmptyChat from "./emptyChat";
import { useEffect } from "react";
import { createChannel } from "../../redux/reducers/createChannel";

const CurrentChat = () => {
    const dispatch = useDispatch()
    const [actualChat, setActualChat] = useState("none")

    const userRedux = useSelector(state => state.user)
    const me = userRedux[0] === undefined ? "" : userRedux[0].email

    const contactRedux = useSelector(state => state.chat)
    const contact = contactRedux === "none" ? "none" : contactRedux

    const chatIDRedux = useSelector(state => state.chatID)

    if(chatIDRedux !== "none"){
        dispatch(createChannel({me:me, contact:chatIDRedux}))
    }

    useEffect(() => {
        if(contact !== "none"){
            setActualChat(contact)
        }
    },[contact])
    

    const SetCurrentChat = () => {
        if(actualChat === "none"){
            return(
                <EmptyChat/>
            )
        }else{  
            if(contact.includes("@")){
                return(
                    <ChatView actualChat={actualChat} me={me}/>
                )
            }else{
                return(
                    <GroupView actualChat={actualChat} me={me}/>
                )
            }
            
        }
    }

    return(
        <SetCurrentChat/>
    )
}

export default CurrentChat