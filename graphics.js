// draw line function
function drawLine(yValue) {
  for (let i = 1; i < 3; i++) {
    yValue += (windowHeight / 3)
    ctx.beginPath()
    ctx.moveTo(currentXValue, yValue)
    ctx.lineTo(currentXValue + windowWidth, yValue)
    ctx.stroke()
  }
}

// draw rect function
function drawRect(x, y, width, height, color) {
   ctx.fillStyle = color
   ctx.strokeRect(x, y, width, height)
   ctx.fillRect(x, y, width, height)
}

// draw circle function
function drawCircle(x, y, width, strokeAllowed) {
  // add stroke if strokeAllowed is true
   strokeAllowed ? ctx.lineWidth = 2 : ""
   ctx.fillStyle = "white"
   ctx.beginPath()
   ctx.arc(x, y, width , 0, 2 * Math.PI)
   ctx.fill()
   ctx.stroke()
}

// draw clouds function
function drawClouds() {
  clouds.forEach(({xPosition, xLeftLimit, xRightLimit, yPosition, width, height, addToX}, index) => {
      ctx.drawImage(image, xPosition, yPosition, width, height);
      clouds[index].xPosition += addToX;
       // if x position is greater than right limit, make the cloud move right
      if (xPosition >= xRightLimit) {
          clouds[index].addToX = -6;
      }
      else if (xPosition <= xLeftLimit) {
          clouds[index].addToX = 6;
      }
  });
}

//draw raindrops function
function drawRaindrops() {
  raindrops_array.map(({xPosition, yPosition, ySpeed, radius}, index) => {
    ctx.fillStyle = "#0223f5"
    ctx.beginPath();
    ctx.arc(xPosition, yPosition, radius, 0, 2 * Math.PI);
    ctx.fill()
    raindrops_array[index].yPosition+=ySpeed
    // make limit so if it reaches to bottom of screen reset that one to the top
    if (yPosition >= 720) {
      raindrops_array[index].yPosition = 150
    }  
  })
}