import React from 'react'
import { Card, Typography } from '@mui/material';


const OtherMsg = (el) => {
  const date = new Date(Number(el.date))
  const dateFormat = date.getHours() + ":" + date.getMinutes() + ", "+ date.toDateString();
  return (
    <div style={{width:"100%", display:"grid", position:"relative", justifyItems:"left"}}>
      <Card sx={{width:"50%", color:"white", margin:"2px", gridArea:"1 / 1"}}>
        <Typography align='left' sx={{ fontWeight: 'bold', color: "#181c4d" }}>{el.remittent}</Typography>
        <Typography align='left' sx={{ fontWeight: 'light', color: "#181c4d" }}>{el.msg}</Typography>
      </Card>
      <Typography align='right' sx={{ fontWeight:"light", fontSize:10, gridArea:"2 / 1"}}>{dateFormat}</Typography>
    </div>
  )
}

export default OtherMsg