import React from 'react'
import { Card, Typography, Divider} from '@mui/material';


const MyScribble = (el) => {
    const date = new Date(Number(el.date))
    const dateFormat = date.getHours() + ":" + date.getMinutes() + ", "+ date.toDateString();
    return (
      <div style={{width:"100%", display:"grid", position:"relative", justifyItems:"right"}}>
        <Card sx={{background: "primary.main", width:"50%", color:"white", margin:"2px", gridArea:"1 / 2"}}>
          <img style={{background:"white"}} src={el.msg}></img>
        </Card>
        <Divider sx={{color:"white"}}></Divider>
        <Typography align='right' sx={{ fontWeight:"light", fontSize:10, gridArea:"2 / 2"}}>{dateFormat}</Typography>
      </div>
    )
}

export default MyScribble