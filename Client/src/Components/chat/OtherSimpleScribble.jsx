import React from 'react'
import { Card, Typography, Divider} from '@mui/material';


const OtherSimpleScribble = (el) => {
    const date = new Date(Number(el.date))
    const dateFormat = date.getHours() + ":" + date.getMinutes() + ", "+ date.toDateString();
    return (
      <div style={{width:"100%", display:"grid", position:"relative", justifyItems:"left"}}>
        <Card sx={{background:"white", width:"50%", color:"white", margin:"2px", gridArea:"1 / 1"}}>
          <img style={{background:"white", border:"1px solid #181c4d"}} src={el.msg}></img>
        </Card>
        <Divider sx={{color:"white"}}></Divider>
        <Typography align='right' sx={{ fontWeight:"light", fontSize:10, gridArea:"2 / 1"}}>{dateFormat}</Typography>
      </div>
    )
}

export default OtherSimpleScribble