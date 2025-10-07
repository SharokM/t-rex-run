document.addEventListener("DOMContentLoaded", function () {
    const dino = document.querySelector(".dino")
    const grid = document.querySelector(".grid")
    // console.log(dino)

    let gravity = 0.9
    let isJumping = false

    function control (e) {
        if (e.code === "Space") {
            // console.log("jump")
            if (!isJumping) {
                jump()
            }
            // jump()
        }
    }

    let position = 0
    function jump () {
        isJumping = true
        let count = 0 
        let timerId = setInterval(function () {

            // move character down 
            if (count === 15) {
                clearInterval(timerId)
                let downTimerId = setInterval(function () {
                    if (count === 0) {
                        clearInterval(downTimerId)
                        isJumping = false
                    }
                // console.log("down triggered")
                    position -=5
                    count--
                    position = position * gravity 
                    dino.style.botton = position + 'px'
                    }, 20)
            }


            // move character up 
            position += 29
            count++
            position = position * gravity
            dino.style.bottom = position + 'px'
        }, 20)
    }

    function generateObstacles () {
       const obstacle = document.createElement('div')
       obstacle.classList.add('obstacle')
       grid.appendChild(obstacle)
    }
    generateObstacles()
    
    document.addEventListener("keydown", control)
})