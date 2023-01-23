import React from "react";
import swal from "sweetalert2";
import ContactCardAccepted from "./ContactCardAccepted"
import ContactCardPending from "./ContactCardPending";
import { Container } from "@mui/system";
import { Button } from "@mui/material";
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Cookies from "js-cookie";
import { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import { IconButton, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import {useTranslation} from "react-i18next"
import { useDispatch } from "react-redux";
import { addFriend, resetValue } from "../../redux/reducers/events";

const Contacts = () => {

    const userRedux = useSelector(state => state.user)
    const user = userRedux[0] === undefined ? "" : userRedux[0]
    const [contactToAdd, setContactToAdd] = useState("")
    const [modalIsOpen, setIsOpen] = useState(false);
    const {t} = useTranslation()
    const dispatch = useDispatch()
    const eventRedux = useSelector(state => state.events);

    if(eventRedux.value){
        if(eventRedux.value.addContact.added){
            swal.fire({
                title: "DONE!",
                text: "wait until your friend accepts"
            })
        }else{
            swal.fire({
                title: "Error!",
                text: "Your conctact isn't signed up in the chat app"
            })
        }
        dispatch(resetValue())
    }    

    function ValidateEmail(email){
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
        {
            return (true)
        }
        return (false)
    }

    const verify = (contactToAdd) => {
        const contactToAddTrim = contactToAdd.trim()
        const isValidEmail = ValidateEmail(contactToAddTrim)
        let isContact = false
        let index = 0
        const contacts = user.contacts
        contacts.forEach(e => {
            if(e.email === contactToAdd){
                isContact=true
            }else{
                index++
            }
        })
        if(!isValidEmail){
            swal.fire({
                title: "error!",
                text: "Email is not valid"
            })
        }
        else if(isContact){
            if(contacts[index].status === "accepted"){
                swal.fire({
                    title: "is your friend",
                    text: "click on card and start the chat"
                })
            }else{
                swal.fire({
                    title: "you have sent request!",
                    text: "wait until your friend accepts"
                })
            }
            
        }
        else if(!isContact && isValidEmail){
            dispatch(addFriend({JWT:Cookies.get('token'), contactToAdd:contactToAdd}))
        }
    }

    const PopulateContacts = () => {
        if(!user.contacts){
            return(
                <Container sx={{display:"grid", gridTemplateColumns:"repeat(10, 10%)", alignItems: 'center', justifyContent:'center'}}>
                    {t("noContacts")}
                </Container>
            )
        }else{
            return(<Container disableGutters>
                {user.contacts.map(e => {
                    if(e.status === "pending" || e.status === "request"){
                        return (<ContactCardPending key={e.email} name={e.name} email={e.email}/>)
                    }else{
                        return (<ContactCardAccepted key={e.email} name={e.name} email={e.email}/>)
                    }
                })}
            </Container>)
            
        }
    }

    const HandleOpen = () => {
        setIsOpen(true)
    }

    const handleClose = () => {
        setIsOpen(false)
        setContactToAdd("")
    }

    return(
        <Container disableGutters sx={{height:"45vh"}}>
            <Container disableGutters maxWidth={false} sx={{ height: "15%", display: "grid", backgroundColor:"primary.main", paddingLeft: "0px"}}>
                <Container sx={{display: 'grid', alignItems: 'center', justifyContent:'center'}}>
                    <Typography variant="h5" noWrap={true} sx={{color: "white"}}>{t("contacts")}</Typography>
                </Container>
            </Container>
            <Container disableGutters maxWidth={false} sx={{ height: "75%", display: "grid", paddingLeft: "0px", paddingRight: "0px", overflowY:"scroll"}}>
                <PopulateContacts />
            </Container>
            <Container disableGutters maxWidth={false} sx={{ height: "10%", display: "flex", justifyContent: "right"}}>
                <IconButton onClick={()=>HandleOpen()}><AddIcon sx={{fontSize: "150%"}} /></IconButton>
                <Dialog open={modalIsOpen} onClose={handleClose}>
                    <DialogTitle>{t("addContact")}</DialogTitle>
                    <DialogContent>
                    <DialogContentText>
                       {t("typeEmail")}
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Email Address"
                        type="email"
                        fullWidth
                        variant="standard"
                        onChange={(e) => {setContactToAdd(e.target.value)}}
                    />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>{t("cancel")}</Button>
                        <Button onClick={() => {verify(contactToAdd); handleClose()}}>Invite!</Button>
                    </DialogActions>
                </Dialog>
            </Container>
        </Container>
    )
}

export default Contacts