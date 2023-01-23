import { Container } from "@mui/system";
import React from "react";
import Cookies from "js-cookie";
import AddIcon from '@mui/icons-material/Add';
import { Button } from "@mui/material";
import TextField from '@mui/material/TextField';
import Dialog from "@mui/material/Dialog";
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { IconButton, Typography } from "@mui/material";
import { useState } from "react";
import {useTranslation} from "react-i18next"
import { useDispatch, useSelector } from "react-redux";
import RoomCard from "./room"
import Swal from "sweetalert2";
import { createGroup, resetValue } from "../../redux/reducers/createGroupChat";


const Chat = () => {
    const userRedux = useSelector(state => state.user)
    const user = userRedux[0] === undefined ? "" : userRedux[0]
    

    const  {t} = useTranslation()
    const dispatch = useDispatch()

    const [dialogIsOpen, setDialogIsOpen] = useState(false)
    const [contactsOfGroup, setContactsOfGroup] = useState("")
    const [nameOfGroup, setNameOfGroup] = useState("")

    const createGroupRedux = useSelector(state => state.createGroup)

    if(createGroupRedux.value){
        if(!createGroupRedux.value.createGroup.isCreated){
            Swal.fire({
                title:"Error!",
                text:t("ErrorCreatingGroup")
            })
        }
        dispatch(resetValue())
    }

    const handleDialogOpen = () => {
        setDialogIsOpen(true)
    }
    
    const handleDialogClose = () => {
        setDialogIsOpen(false)
        setContactsOfGroup("")
        setNameOfGroup("")
    }

    function PopulateChats(){
        if(user.conversations === undefined){
            return(
                <Container sx={{display: 'flex', alignItems: 'center', justifyContent:'center'}}>
                    {t("noChats")}
                </Container>
            )
        }else if(user.conversations.length === 0){
            return(
                <Container sx={{display: 'flex', alignItems: 'center', justifyContent:'center'}}>
                    {t("noChats")}
                </Container>
            )
        }else{
            return (<Container disableGutters="true">
                {user.conversations.map(e => {
                    return (<RoomCard key={e.convID} name={e.name} convID={e.convID}></RoomCard>)
                })}
            </Container>)
        }
    }

    const verifyNewGroup = () => {
        if(!nameOfGroup){
            Swal.fire({
                title:"Error!",
                text: `${t("noEmptyName")}`
            })
        }else if(!contactsOfGroup){
            Swal.fire({
                title:"Error!",
                text: `${t("ValidEmail")}`
            })
        }else if(nameOfGroup && contactsOfGroup){
            dispatch(createGroup({JWT:Cookies.get('token'), me: user.email, contacts: contactsOfGroup, nameOfGroup: nameOfGroup}));
        }
    }

    return(
        <Container disableGutters sx={{height:"45vh"}}>
            <Container disableGutters maxWidth={false} sx={{ height: "15%", display: "grid", backgroundColor: "primary.main", paddingLeft: "0px"}}>
                <Container sx={{display: 'grid', alignItems: 'center', justifyContent:'center'}}>
                    <Typography variant="h5" noWrap={true} sx={{color: "white"}}>{t("chatRooms")}</Typography>
                </Container>
            </Container>
            <Container disableGutters maxWidth={false} sx={{ height: "75%", display: "grid", paddingLeft: "0px", overflowY:"scroll"}}>
                <PopulateChats/>
            </Container>
            <Container disableGutters maxWidth={false} sx={{ height: "10%", display: "grid", justifyContent: "right"}}>
                <IconButton onClick={handleDialogOpen}><AddIcon sx={{fontSize: "150%"}} /></IconButton>
            </Container>
            <Dialog open={dialogIsOpen} onClose={handleDialogClose}>
                    <DialogTitle>{t("createGroup")}</DialogTitle>
                    <DialogContent>
                    <DialogContentText>
                        {t("groupName")}
                    </DialogContentText>
                    <TextField
                        margin="dense"
                        id="name"
                        type="email"
                        fullWidth
                        variant="standard"
                        onChange={(e) => setNameOfGroup(e.target.value)}
                    />
                    <DialogContentText>
                        {t("contactsToAdd")}
                    </DialogContentText>
                    <TextField
                        margin="dense"
                        id="email"
                        type="email"
                        fullWidth
                        variant="standard"
                        onChange={(e) => setContactsOfGroup(e.target.value)}
                    />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleDialogClose}>{t("cancel")}</Button>
                        <Button onClick={() => {verifyNewGroup(); handleDialogClose()}}>{t("create")}</Button>
                    </DialogActions>
                </Dialog>
        </Container>
    )
}

export default Chat