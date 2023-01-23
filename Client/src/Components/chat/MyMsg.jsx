import React from 'react'
import { Card, Typography } from '@mui/material';


const MyMsg = (el) => {
  const date = new Date(Number(el.date))
  const dateFormat = date.getHours() + ":" + date.getMinutes() + ", "+ date.toDateString();
  return (
    <div style={{width:"100%", display:"grid", position:"relative", justifyItems:"right"}}>
      <Card sx={{background:"#181c4d", width:"50%", color:"white", margin:"2px", gridArea:"1 / 2"}}>
        <Typography align='left' sx={{ fontWeight: 'light' }}>{el.msg}</Typography>
      </Card>
      <Typography align='right' sx={{ fontWeight:"light", fontSize:10, gridArea:"2 / 2"}}>{dateFormat}</Typography>
    </div>
  )
}

export default MyMsg