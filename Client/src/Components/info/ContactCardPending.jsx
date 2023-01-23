import { Container, Icon, Typography } from "@mui/material";
import React from "react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Cookies from "js-cookie"
import swal from "sweetalert2"
import {useTranslation} from "react-i18next"
import { useDispatch, useSelector } from "react-redux";
import { acceptContact, resetValue } from "../../redux/reducers/acceptContact";


const ContactCardPending = (user) => {
    const {t} = useTranslation()
    const dispatch = useDispatch()
    const acceptContactRedux = useSelector(state => state.acceptContact)

    if(acceptContactRedux.value){
        if(acceptContactRedux.value.confirmContact.confirmed){
            swal.fire({
                title: `${t("Great")}!`,
                text: `${t("NewFriend")}`
            })
        }else{
            swal.fire({
                title: `${t("Wait")}`,
                text: `${t("NeedsToAccept")}`
            })
        }
        dispatch(resetValue())
    }

    return(
        <Container disableGutters maxWidth={false} sx={{paddingLeft: "0px", cursor: "pointer", display:"grid", gridTemplateColumns:"repeat(10, 10%)" , border: "1px solid red"}} onClick={() => {dispatch(acceptContact({JWT:Cookies.get('token'), contactToAccept:user.email}))}}>
            <Icon><AccountCircleIcon/></Icon><Typography>{user.name}</Typography>
        </Container>
    )
}

export default ContactCardPending