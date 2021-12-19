'use strict'

let field = document.getElementById('field')

let start = document.getElementById('start')
start.addEventListener('click', startGame)

let counter = document.getElementById('counter')
let record = document.getElementById('record')
let counterNumber = 0
let recordNumber = 0

function startGame(event){
    for (let element of document.querySelectorAll(`.${event.target.parentNode.className}`)){
        element.remove()
    }
    for (let posX = field.offsetWidth/2 - 3, posY = field.offsetHeight/2 - 9, i = 0; i < 3; i++) {
        let snakePart = document.createElement('div')
        if (i == 0) {
            snakePart.id = 'head'
        }
        snakePart.className = 'snake'
        snakePart.style.top = `${posY}px`
        snakePart.style.left = `${posX}px`
        posY += 6
        field.append(snakePart)
    }

    let head = document.getElementById('head')

    function moveHeadUp(){
        let posY = head.offsetTop - 6
        head.style.top = `${posY}px`
    }

    function moveHeadDown(){
        let posY = head.offsetTop + 6
        head.style.top = `${posY}px`
    }

    function moveHeadLeft(){
        let posX = head.offsetLeft - 6
        head.style.left = `${posX}px`
    }

    function moveHeadRight(){
        let posX = head.offsetLeft + 6
        head.style.left = `${posX}px`
    }

    let moveHead = moveHeadUp

    let direction = 'up'

    function keydown(event){
        switch (event.code) {
            case 'KeyW':
            case 'ArrowUp':
                if (moveHead === moveHeadDown) return
                moveHead = moveHeadUp
                direction = 'up'
                break
            case 'KeyS':
            case 'ArrowDown':
                if (moveHead === moveHeadUp) return
                moveHead = moveHeadDown
                direction = 'down'
                break
            case 'KeyA':
            case 'ArrowLeft':
                if (moveHead === moveHeadRight) return
                moveHead = moveHeadLeft
                direction = 'left'
                break
            case 'KeyD':
            case 'ArrowRight':
                if (moveHead === moveHeadLeft) return
                moveHead = moveHeadRight
                direction = 'right'
                break
        }
    }

    document.addEventListener('keydown', keydown)


    let previousPosX
    let previousPosY
    let oldPosX
    let oldPosY
    let newPosX
    let newPosY

    
    function eat(food){
        counterNumber++
        counter.textContent = `Счетчик: ${counterNumber}`
        if (counterNumber > recordNumber) {
            recordNumber = counterNumber
            record.textContent = `Рекорд: ${recordNumber}`
        }
        food.remove()
        let newSnakePart = document.createElement('div')
        newSnakePart.className = 'snake'
        field.append(newSnakePart)
    }

    function move(){
        let snakeParts = document.querySelectorAll('.snake')
        for (let snakePart of snakeParts){
            if (snakePart.id == 'head') {
                previousPosX = snakePart.offsetLeft
                previousPosY = snakePart.offsetTop
                moveHead()
                continue
            }
            oldPosX = snakePart.offsetLeft
            oldPosY = snakePart.offsetTop
            newPosX = previousPosX
            newPosY = previousPosY
            previousPosX = oldPosX
            previousPosY = oldPosY
            snakePart.style.left = `${newPosX}px`
            snakePart.style.top = `${newPosY}px`

        }
    }

    function RandomCoordinates() {
        return Math.floor(Math.random() * (554 + 1))
      }

    function generateFood() {
        let left = RandomCoordinates() + 3
        let top = RandomCoordinates() + 3
        if (document.elementFromPoint(left + field.offsetLeft, top + field.offsetTop) != field) {
            generateFood()
            return
        }
        let food = document.createElement('div')
        food.className = 'food'
        field.append(food)
        food.style.left = `${left}px`
        food.style.top = `${top}px`

    }

    function die(){
        document.removeEventListener('keydown', keydown)
        counterNumber = 0
        document.getElementById('counter').textContent = 'Счетчик: 0'
        clearInterval(moveInterval)
        clearInterval(foodInterval)
        clearInterval(eatInteval)
        clearInterval(deathInterval)
        let snakeParts = document.querySelectorAll('.snake')
        for (let i = 0; i < snakeParts.length; i++){
            snakeParts[i].remove()
        }
        let foods = document.querySelectorAll('.food')
        for( let i = 0; i < foods.length; i++){
            foods[i].remove()
        }
        let menu = document.createElement('div')
        menu.className = 'menu'
        field.append(menu)
        let text = document.createElement('h1')
        text.textContent = 'Змея погибла'
        menu.append(text)
        let button = document.createElement('button')
        button.textContent = 'ПОВТОРИТЬ'
        button.addEventListener('click', startGame)
        menu.append(button)
    }

    let moveInterval = setInterval(move, 125)
    let foodInterval = setInterval(generateFood, 1000)
    let eatInteval = setInterval(()=> {
        let leftFromHead, topFromHead
                switch(direction){
                    case 'up':
                        leftFromHead = head.offsetLeft + field.offsetLeft + head.offsetWidth/2
                        topFromHead = head.offsetTop + field.offsetTop
                        break
                    case 'down':
                        leftFromHead = head.offsetLeft + field.offsetLeft + head.offsetWidth/2
                        topFromHead = head.offsetTop + field.offsetTop + head.offsetHeight
                        break
                    case 'left':
                        leftFromHead = head.offsetLeft + field.offsetLeft - head.offsetWidth
                        topFromHead = head.offsetTop + field.offsetTop + head.offsetHeight/2
                        break
                    case 'right':
                        leftFromHead = head.offsetLeft + field.offsetLeft + head.offsetWidth
                        topFromHead = head.offsetTop + field.offsetTop + head.offsetHeight/2
                        break
                }
                let food = document.elementFromPoint(leftFromHead, topFromHead)
                if (food.className == 'food'){
                    eat(food)
                }
    }, 50)
    let deathInterval = setInterval(()=>{
        let leftFromHead, topFromHead
                switch(direction){
                    case 'up':
                        leftFromHead = head.offsetLeft + field.offsetLeft + head.offsetWidth/2
                        topFromHead = head.offsetTop + field.offsetTop
                        break
                    case 'down':
                        leftFromHead = head.offsetLeft + field.offsetLeft + head.offsetWidth/2
                        topFromHead = head.offsetTop + field.offsetTop + head.offsetHeight
                        break
                    case 'left':
                        leftFromHead = head.offsetLeft + field.offsetLeft - head.offsetWidth
                        topFromHead = head.offsetTop + field.offsetTop + head.offsetHeight/2
                        break
                    case 'right':
                        leftFromHead = head.offsetLeft + field.offsetLeft + head.offsetWidth
                        topFromHead = head.offsetTop + field.offsetTop + head.offsetHeight/2
                        break
                }
                let anotherSnakePart = document.elementFromPoint(leftFromHead, topFromHead)
                if (anotherSnakePart.className == 'snake' && anotherSnakePart.id != 'head'){
                    die()
                }
                if (head.offsetLeft <= 0 || head.offsetLeft + head.offsetWidth >= 600 || head.offsetTop <= 0 || head.offsetTop + head.offsetHeight >= 600){
                    die()
                }
    },100)
        
  
}