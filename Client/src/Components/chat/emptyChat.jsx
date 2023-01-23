import React from "react";
import { Container } from "@mui/material";
import { useTranslation } from "react-i18next";

const EmptyChat = () => {
    const {t} = useTranslation()
    return(
        <Container disableGutters sx={{display:"flex",alignItems: 'center',width:"70vw", justifyContent:"center", textAlign:"center"}}>
            {t("Conversation")}
        </Container>
    )
}

export default EmptyChat