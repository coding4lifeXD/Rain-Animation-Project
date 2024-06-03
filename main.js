let htmlDocument = document.documentElement

let cnv = document.getElementById("canvas")
let ctx = cnv.getContext("2d")
cnv.width = 1280
cnv.height = 720

// Global Vars
let image = document.getElementById("cloud_image")


// make clouds
// #0223f5

raindrops_array = []
// create raindrops function
function makeRaindrops(amount) {
   amount == 10 ? raindropXPosition = Math.floor(Math.random() * 1000) :   
  raindropXPosition = 10
  // if amount is -10, then take away the last ten at the end of the array
  if (amount == -10) {
      raindrops_array.splice(raindrops_array.length - 10, 10)
      return;
  }
  
  for (let i = 0; i < amount; i++) {
    // create raindrops, where x position is initalized to 10 (first one only), y = 0, and radius is 10 to 17, and y speed is between 3 and 8 

    // prevent cluterring....
    circleRadius =  Math.floor(Math.random() * 7 + 10)

    
    raindrops_array.push(
      {
        xPosition: raindropXPosition,
        yPosition: 150,
        ySpeed: Math.random() * 5 + 3,
        radius: circleRadius
      }
    )    
    // add to xPosition by a randomnum to prevent clutter
    raindropXPosition = raindropXPosition + circleRadius  + Math.random() * 18 + 12
  }
}
makeRaindrops(100) 
// keydown event listener on doc
htmlDocument.addEventListener("keydown", (e) => {
  if (e.key == "ArrowRight") {
     makeRaindrops(10)
  }
  else if (e.key == "ArrowLeft") {
    makeRaindrops(-10)
  }
})
// skyscrapers
let skyscrapersOutline = [
  {
    color: "lightgrey",
    x: 30,
    y: 50,
    skyScraperWidth: 200,
    height: 550
  }, {
    color: "grey",
    x: 300,
    y: 20,
    skyScraperWidth: 150,
    height: 580
  },
  {
    color: "beige",
    x: 200,
    y: 310,
    skyScraperWidth: 190,
    height: 290
  },
  {
    color: "beige",
    x: 440,
    y: 150,
    skyScraperWidth: 250,
    height: 450
  },
  {
    color: "darkgrey",
    x: 770,
    y: 45,
    skyScraperWidth: 250,
    height: 555
  }, {
    color: "grey",
    x: 630,
    y: 435,
    skyScraperWidth: 140,
    height: 165
  },
  {
    color: "beige",
    x: 930,
    y: 250,
    skyScraperWidth: 190,
    height: 350
  },
]
// clouds info: xLeft and xRight is -X and +X of xPosition, respectively 
let clouds = [
  {
    xPosition: 10,
    xLeftLimit: -80,
    xRightLimit: 100,
    yPosition: 0,
    addToX: 6,
    width: 300,
    height: 167
  },
  {
    xPosition: 350,
    xLeftLimit: 200,
    xRightLimit: 500,
    addToX: 6,
    yPosition: -40,
    width: 500,
    height: 278
  },
  {
    xPosition: 900,
    xLeftLimit: 700,
    xRightLimit: 1100,
    yPosition: -10,
    addToX: 6,
    width: 400,
    height: 222
  }
]

ctx.drawImage(image, 10, 0, 300, 167)
ctx.drawImage(image, 350, -40, 500, 278)
ctx.drawImage(image, 900, -10, 400, 222)
// animate rain function
function animateRain(frame) {
  // background  

  ctx.fillStyle = "darkblue"
  ctx.fillRect(0, 0, 1280, 720) 
  

  // road
  ctx.fillStyle = "black"
  ctx.fillRect(0, 600, 1280, 100)
  

  ctx.fillStyle = "white"
  let initialX = 100
  // 11 stripes road
  for (let i = 1; i < 12; i++) {
    //                  x        , y  , width , height
    ctx.fillRect(initialX * i, 630, 80, 40)
  }


  skyscrapersOutline.forEach(({ color, x, y, skyScraperWidth, height }) => {

    ctx.fillStyle = color
    ctx.fillRect(x, y, skyScraperWidth, height)
    // determine square or long window
    // if it is high, then draw long windows
    if (height > 300) {
      // draw three windows 
      currentXValue = 0
      for (let i = 1; i < 4; i++) {
        ctx.fillStyle = "#5797ff"
        windowWidth = (skyScraperWidth - 80) / 3
        windowYValue = y + 20
        windowHeight = height - 40

        ctx.lineWidth = 5
        ctx.strokeStyle = "black"
        // if first one, current x is calculated by adding 20 to the x value of its container box
        if (i === 1) {
          currentXValue = x + 20
        }
        else {
          currentXValue = currentXValue + windowWidth + 20
        }        
        drawRect(currentXValue, windowYValue, windowWidth, windowHeight)
        // adding borders in between for extra detail
        drawLine(y)


      }

    }
    // smaller skyscrapers get doors and rectangular windows
    else {
      // draw rectangular windows
      availableWidth = (skyScraperWidth - 40)  * 0.8
      windowWidth = availableWidth * 0.4
      // startX is equal to 20 + x value of container box to push it in 20 px
      startX = x + 20
      spaceInBetween = availableWidth  - windowWidth * 2 
      // draw all the rects
      // top left
      drawRect(startX, y + 20, windowWidth, windowWidth, "white")
      // top right
      drawRect(x + skyScraperWidth - 20 - windowWidth, y + 20, windowWidth, windowWidth, "white")

      // bottom left
      bottomY =  y + windowWidth + 20 + spaceInBetween
      drawRect(startX, bottomY, windowWidth, windowWidth)

      // bottom right 
      drawRect(x + skyScraperWidth - 20 - windowWidth, bottomY, windowWidth, windowWidth)

      // draw door
        // door frames
        // make width equal to half of the skyscraper width, vertically centred
        doorWidth = skyScraperWidth * 0.5
        doorFrameStartX = x + skyScraperWidth  * 0.25
        drawRect(doorFrameStartX, bottomY + windowWidth + 20, doorWidth, y + height -  bottomY - windowWidth - 20, "#0741f0")
        // door handles
        drawCircle(310, 520, 20, "allowed")
        drawCircle(715, 575, 10, "allowed")

    }


  })
  // drawing each raindrop
  drawRaindrops()
  // drawing the clouds
  drawClouds()

  requestAnimationFrame(animateRain)
}

requestAnimationFrame(animateRain)