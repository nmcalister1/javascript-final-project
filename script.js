const template = document.querySelector("#image-template")
const imageOverlay = document.querySelector("#image-overlay")
const imagesContainer = document.querySelector(".grid-container")
const settingsForm = document.querySelector("#settings-form")
const settingsName = document.querySelector("#pname")
const settingsCardNumber = document.querySelector("#numberOfCards")
const nameElement = document.querySelector("#player-name")
const newGameLink = document.querySelector("#new-game")
const gameScore = document.querySelector("#game-score")

let imagesIdArray = []

// Render the cards randomly to the screen
let imagesSrcArray = [
  "images/card_1.png",
  "images/card_1.png",
  "images/card_2.png",
  "images/card_2.png",
  "images/card_3.png",
  "images/card_3.png",
  "images/card_4.png",
  "images/card_4.png",
  "images/card_5.png",
  "images/card_5.png",
  "images/card_6.png",
  "images/card_6.png",
  "images/card_7.png",
  "images/card_7.png",
  "images/card_8.png",
  "images/card_8.png",
  "images/card_9.png",
  "images/card_9.png",
  "images/card_10.png",
  "images/card_10.png",
  "images/card_11.png",
  "images/card_11.png",
  "images/card_12.png",
  "images/card_12.png",
  "images/card_13.png",
  "images/card_13.png",
  "images/card_14.png",
  "images/card_14.png",
  "images/card_15.png",
  "images/card_15.png",
  "images/card_16.png",
  "images/card_16.png",
  "images/card_17.png",
  "images/card_17.png",
  "images/card_18.png",
  "images/card_18.png",
  "images/card_19.png",
  "images/card_19.png",
  "images/card_20.png",
  "images/card_20.png",
  "images/card_21.png",
  "images/card_21.png",
  "images/card_22.png",
  "images/card_22.png",
  "images/card_23.png",
  "images/card_23.png",
  "images/card_24.png",
  "images/card_24.png",
]

let countArray = [0]
let imageDataArray = []
let imageCheckArray = []
let totalGuesses = [0]
let rightGuesses = [0]
let endGameArray = []
let numberOfCardsArray = []

$(document).ready(() => {
  $(function () {
    $("#tabs").tabs()
  })
  $(function () {
    $("#selectable").selectable()
  })

  renderImages()

  let currentScrollPos
  imagesContainer.addEventListener("click", e => {
    if (!e.target.matches("#img-item")) return 
    currentScrollPos = window.scrollY
    function disableScroll() {
      window.scrollTo(0, currentScrollPos)
    }
  
    window.addEventListener('scroll', disableScroll)
    
    if (countArray[0] == 1){
      console.log(countArray[0], "before we add 1")
      // check the id, if the img has already been clicked and count is not yet 3, return 
      
      // also check if it is a blank
      const parent = e.target.closest(".aTag")
      const imageId = parent.dataset.imageId
      const image = imageDataArray.find(i => i.id === imageId)
      if (image.hasBeenClicked == true){
        return 
      } else if (image.blank == true){
        return 
      } else {
        console.log("clicked")
        countArray[0] = countArray[0] + 1
        console.log(countArray[0], "after we add 1")
        const checkImagesData = {
          imageSource: image.imageSrc,
          parent,
          id: image.id
        }
        imageCheckArray.push(checkImagesData)

        image.hasBeenClicked = true
        
        parent.classList.add("removed")
        setTimeout(() => {
          const newImgSrc = parent.id
          e.target.setAttribute("src", newImgSrc)
          // parent.id = "images/back.png"
          parent.classList.remove("removed")
        }, 500)

        // check to see if the cards match and set them to appropriate side --- back or blank 
      totalGuesses[0] = totalGuesses[0] + 1
      console.log("else block")
      imageOverlay.classList.add("overlay")
      if (imageCheckArray[0].imageSource == imageCheckArray[1].imageSource){
        rightGuesses[0] = rightGuesses[0] + 1
        endGameArray[0] = endGameArray[0] - 2
        const parentOne = imageCheckArray[0].parent
        const imgElementOne = parentOne.children[0]
        //imgElementOne.setAttribute("src", "images/blank.png")
        
        const parentTwo = imageCheckArray[1].parent
        const imgElementTwo = parentTwo.children[0]
        //imgElementTwo.setAttribute("src", "images/blank.png")
        // find the specific image data in imagedataarray, then change the properties 
        imageDataArray.forEach((data) => {
          if (data.id === imageCheckArray[0].id){
            data.hasBeenClicked = false
            data.blank = true
          }
        })
        imageDataArray.forEach((data) => {
          if (data.id === imageCheckArray[1].id){
            data.hasBeenClicked = false
            data.blank = true
          }
        })

        setTimeout(() => {
          parentOne.classList.add("slide-up")
          parentTwo.classList.add("slide-up")
          setTimeout(() => {
            imgElementOne.setAttribute("src", "images/blank.png")

            imgElementTwo.setAttribute("src", "images/blank.png")
            imageOverlay.classList.remove("overlay")
          }, 500)
          
        }, 500)

        countArray = [0]
        if (endGameArray[0] == 0){
          endGame()
          return 
        }
      } else {
        const parentOne = imageCheckArray[0].parent
        const imgElementOne = parentOne.children[0]
        
        const parentTwo = imageCheckArray[1].parent
        const imgElementTwo = parentTwo.children[0]

        imageDataArray.forEach((data) => {
          if (data.id === imageCheckArray[0].id){
            data.hasBeenClicked = false
          }
        })
        imageDataArray.forEach((data) => {
          if (data.id === imageCheckArray[1].id){
            data.hasBeenClicked = false
          }
        })

        
        setTimeout(() => {
          parentOne.classList.add("removed")
          parentTwo.classList.add("removed")
          setTimeout(() => {
            const sourceAttributeOne = imgElementOne.getAttribute("src")
            parentOne.setAttribute("id", sourceAttributeOne)
            imgElementOne.setAttribute("src", "images/back.png")

            const sourceAttributeTwo = imgElementTwo.getAttribute("src")
            parentTwo.setAttribute("id", sourceAttributeTwo)
            imgElementTwo.setAttribute("src", "images/back.png")

            parentOne.classList.remove("removed")
            parentTwo.classList.remove("removed")
            imageOverlay.classList.remove("overlay")
          }, 500)
          
        }, 1500)

        countArray = [0]
      }

      
      imageCheckArray = []
    }
        
  } else {
// check the id, if the img has already been clicked and count is not yet 3, return 
      
      // also check if it is a blank
      const parent = e.target.closest(".aTag")
      const imageId = parent.dataset.imageId
      const image = imageDataArray.find(i => i.id === imageId)
      if (image.hasBeenClicked == true){
        return 
      } else if (image.blank == true){
        return 
      } else {
        console.log("clicked")
        countArray[0] = countArray[0] + 1
        console.log(countArray[0])
        const checkImagesData = {
          imageSource: image.imageSrc,
          parent,
          id: image.id
        }
        imageCheckArray.push(checkImagesData)

        image.hasBeenClicked = true
        
        parent.classList.add("removed")
        setTimeout(() => {
          const newImgSrc = parent.id
          e.target.setAttribute("src", newImgSrc)
          // parent.id = "images/back.png"
          parent.classList.remove("removed")
        }, 500)
      }
      setTimeout(() => {
        window.removeEventListener('scroll', disableScroll)
      }, 100)
  }
})
  

  settingsForm.addEventListener("submit", e => {
    e.preventDefault()
    numberOfCardsArray = []
    const name = settingsName.value 
    const numberOfCards = settingsCardNumber.value
    numberOfCardsArray = [parseInt(numberOfCards)]

    nameElement.innerText = name
    imageDataArray = []
    while (imagesContainer.firstChild) {
      imagesContainer.removeChild(imagesContainer.firstChild);
    }
    renderImages(numberOfCards)
    $("#tabs").tabs("option", "active", 0)
  })

  

  document.addEventListener("click", e => {
    if (!e.target.matches("#new-game")) return 
    e.preventDefault()
    
    imageDataArray = []
    while (imagesContainer.firstChild) {
      imagesContainer.removeChild(imagesContainer.firstChild);
    }
    
    const newNumberOfCards = numberOfCardsArray[0]
    rightGuesses[0] = 0
    totalGuesses[0] = 0
    endGameArray = []
    renderImages(newNumberOfCards)
    
  })
})

function endGame(){
  imageDataArray = []
  imageCheckArray = []
  while (imagesContainer.firstChild) {
    imagesContainer.removeChild(imagesContainer.firstChild);
  }

  // calc score 
  const score = rightGuesses[0] / totalGuesses[0]
  const percentageValue = (score * 100).toFixed(2) + "%"
  gameScore.innerText = percentageValue
  // display screen that shows score and new game link
  
  const newHTML = `<p>Your score for this game was ${percentageValue}</p>\n
                    <p>Click on "New Game" to start a new game!</p> `
  imagesContainer.innerHTML += newHTML
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
  })
}

function checkWin(){
  if (endGameArray[0] == 0){
    endGame()
  }
}

function renderImages(numberOfCards = 48) {
  // randomize the array (create a function to randomize the array) and then loop through it
  const cards = parseInt(numberOfCards)
  console.log(cards)
  endGameArray = [cards] 

  // make the slicing random
  let newArray = []
  if (cards == 48){
    newArray = [...imagesSrcArray]
    console.log(newArray, "cards == 48")
  } else {
    newArray = randomizeOriginalArray(cards)
    console.log(newArray, "cards not equal to 48")
  }
  
  const randomizedArrayOne = randomizeArray(newArray)
  randomizedArrayOne.forEach((image) => {
    const templateClone = template.content.cloneNode(true)
    const aTag = templateClone.querySelector(".aTag")
    const id = generateRandomId(10)
    aTag.dataset.imageId = id
    const imageData = {
      imageSrc: image, 
      hasBeenClicked: false, 
      blank: false,
      id,
    }
    imageDataArray.push(imageData)
    const imgTag = templateClone.querySelector("#img-item")
  
    aTag.setAttribute("id", image)
    imgTag.setAttribute("src", "images/back.png")
    imagesContainer.appendChild(templateClone)
  })
}

function randomizeOriginalArray(numberOfCards){
  let randomIndexArray = []
  let newestArray = []
  let count = numberOfCards
  while (count > 0){
    // actually don't check index, check the value
    // add the indexes to the randomIndexArray to check to see if we have already selected a random value from that index
    const randomIndex = Math.floor(Math.random() * 47)
    console.log(randomIndex)
    if (isPrime(randomIndex)){
      const image = imagesSrcArray[randomIndex]
      newestArray.push(image)
      newestArray.push(image)
      count = count - 1
      console.log(newestArray)
    }
  }
  return newestArray
}

function isPrime(n) {
  if (n <= 1) return false;
  if (n <= 3) return true;
  if (n % 2 === 0 || n % 3 === 0) return false;

  for (let i = 5; i * i <= n; i += 6) {
    if (n % i === 0 || n % (i + 2) === 0) return false;
  }

  return true;
}

function randomizeArray(array){
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
  return array 
}


function generateRandomId(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let randomId = ''
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length)
    randomId += characters.charAt(randomIndex)
  }
  return randomId
}


// When the user clicks on a card whose back is displayed,
// ---- the back of the card should be faded out over half a second and the front of the card should be faded in over half a second


// Set up logic which only allows the user to open 2 cards --- why does it flip back to cover on click again?

// When the user finds two matching cards, the cards should be hidden after one second using a sliding motion over half a second. If the cards don’t match,
// ---- they should be faded out over half a second after two seconds and the back of the cards should be faded in over half a second

// don't allow the user to click on other cards after the 3rd click untill the processes are complete 




// Each time the user completes a game, the user’s high score should be updated and displayed and the percentage of correct selections for the game that was just completed should be calculated and displayed.
// ---- The high score should also be stored in local storage so it can be compared against the score for the user’s next game

// When the game ends, the user can click the New Game link to start another game

// When the user clicks the Save Settings button, the player name and number of cards should be saved in session storage.
// ---- In addition, the page should be reloaded so the player’s name, the player’s high score if previous games have been played, and the correct number of cards are displayed.
