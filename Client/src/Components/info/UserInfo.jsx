import React from "react"
import { useState } from "react";
import { useNavigate } from 'react-router-dom'
import Cookies from "js-cookie";
import { Button } from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Container, IconButton, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {deleteUser} from "../../redux/reducers/user";
import { delCurrentChat } from "../../redux/reducers/chat";
import {useTranslation} from "react-i18next"

const UserInfo = () => {
    const {t} = useTranslation()
    const userRedux = useSelector(state => state.user)
    const user = userRedux[0] === undefined ? "" : userRedux[0]
  

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const logOut = () => {
        dispatch(deleteUser())
        dispatch(delCurrentChat())
        Cookies.remove('token')
        navigate("/login")
    }

    const handleModalIsOpen = () => {
        setModalIsOpen(true)
    }

    const handleModalIsClose = () => {
        setModalIsOpen(false)
    }

    return(
            <Container disableGutters maxWidth={false} sx={{ display: "grid", gridTemplateColumns: "repeat(5, 20%)", backgroundColor: "primary.main", paddingLeft: "0px", height:"8%"}}>
                <IconButton onClick={() => {handleModalIsOpen()}}><AccountCircleIcon sx={{color: "white", fontSize: "100%", width: "100%", float: "left"}}/></IconButton>
                <Container sx={{display:"grid", gridColumn:"2/5", alignItems: 'center', justifyContent:'center'}}>
                    <Typography variant="h5" noWrap={true} sx={{color: "white"}}>{t("welcome")} {user.name}</Typography>
                </Container>
                <Dialog open={modalIsOpen} onClose={handleModalIsClose}>
                    <DialogTitle>{t("yourInfo")} {user.name}</DialogTitle>
                    <DialogContent>
                    <DialogContentText>
                        {t("Name")}
                    </DialogContentText>
                    <Typography>{user.name}</Typography>
                    <DialogContentText>
                        e-Mail:
                    </DialogContentText>
                    <Typography>{user.email}</Typography>
                    <DialogContentText>
                        {t("Language")}:
                    </DialogContentText>
                    <Typography>{user.lang}</Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleModalIsClose}>{t("cancel")}</Button>
                        <Button onClick={logOut}>{t("logOut")}</Button>
                    </DialogActions>
                </Dialog>
            </Container>
    )
}

export default UserInfo