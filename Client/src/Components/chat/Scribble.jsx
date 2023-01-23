import React from 'react'


const Scribble = () => {
    function draw(){
        const canvas = document.getElementById("canvas");
        let ctx = canvas.getContext("2d");
        let painting = false

        function startPosition(e){
            painting = true;
            paint(e)
        }

        function finishedPosition(){
            painting = false;
            ctx.beginPath()
        }

        function paint(e){
            const boundingRect = canvas.getBoundingClientRect();
            if(!painting) return;
            ctx.lineWidth = 2;
            ctx.lineCap = "round";

            ctx.lineTo(e.clientX-boundingRect.left, e.clientY-boundingRect.top)
            ctx.stroke()
            ctx.beginPath();
            ctx.moveTo(e.clientX-boundingRect.left, e.clientY-boundingRect.top);
        }

        canvas.addEventListener("mousedown", startPosition)
        canvas.addEventListener("mouseup", finishedPosition)
        canvas.addEventListener("mousemove", paint)
    }


  return (
    <canvas id="canvas" style={{border:"1px solid #000000", background:"white", width:"100%", height:"65%"}} onClick={() => draw()}></canvas>
  )
}

export default Scribble