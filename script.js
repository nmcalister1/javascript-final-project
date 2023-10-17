// select elements from the DOM
const template = document.querySelector("#image-template")
const imageOverlay = document.querySelector("#image-overlay")
const imagesContainer = document.querySelector(".grid-container")
const settingsForm = document.querySelector("#settings-form")
const settingsName = document.querySelector("#pname")
const settingsCardNumber = document.querySelector("#numberOfCards")
const nameElement = document.querySelector("#player-name")
const newGameLink = document.querySelector("#new-game")
const gameScore = document.querySelector("#game-score")
const highScoreElement = document.querySelector("#high-score")

// Create an array that stores the images
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

// this array keeps track of how many cards the user has clicked on 
let countArray = [0]
// this array keeps track of important information like whether the card is blank or has been clicked on, also has the id
let imageDataArray = []
// this array keeps track of important information like the image src and id
let imageCheckArray = []
// this array keeps track of the total number of guesses the user makes
let totalGuesses = [0]
// this array keeps track of the right number of guesses the user makes
let rightGuesses = [0]
// this array determines whether to call the endGame function and end the game 
let endGameArray = []
// this array stores the number of cards at the start of the game
let numberOfCardsArray = []
// this array stores the user name and the high score for local storage
let nameArray = []
// this array was named poorly but keeps track of the current high score
let currentNameScore = []
// this array keeps track of the current name and high score
let currNameAndHighScore = []
// this array determines the else if block within the render function 
let saveGameArray = [0]


// create keys for storage
const LOCAL_STORAGE_ACCOUNT_PREFIX = "MEMORY_GAME_LOCAL"
const SESSION_STORAGE_ACCOUNT_PREFIX = "MEMORY_GAME_SESSION"
const COUNT_ARRAY_KEY = `${SESSION_STORAGE_ACCOUNT_PREFIX}-countArray`
const IMAGE_DATA_ARRAY_KEY = `${SESSION_STORAGE_ACCOUNT_PREFIX}-imageDataArray`
const IMAGE_CHECK_ARRAY_KEY = `${SESSION_STORAGE_ACCOUNT_PREFIX}-imageCheckArray`
const TOTAL_GUESSES_KEY = `${SESSION_STORAGE_ACCOUNT_PREFIX}-totalGuessesArray`
const RIGHT_GUESSES_KEY = `${SESSION_STORAGE_ACCOUNT_PREFIX}-rightGuessesArray`
const END_GAME_ARRAY_KEY = `${SESSION_STORAGE_ACCOUNT_PREFIX}-endGameArray`
const NUMBER_OF_CARDS_ARRAY_KEY = `${SESSION_STORAGE_ACCOUNT_PREFIX}-numberOfCardsArray`
const NAME_ARRAY_KEY = `${LOCAL_STORAGE_ACCOUNT_PREFIX}-nameArray`
const CURRENT_NAME_SCORE_ARRAY_KEY = `${SESSION_STORAGE_ACCOUNT_PREFIX}-currentNameScoreArray`
const CURRENT_NAME_AND_HIGH_SCORE_ARRAY_KEY = `${SESSION_STORAGE_ACCOUNT_PREFIX}-currentNameAndHighScoreArray`
const SAVE_GAME_ARRAY_KEY = `${SESSION_STORAGE_ACCOUNT_PREFIX}-saveGameArray`

// create functions to load all the data from session storage and local storage
function loadCountArrayData() {
  const storedData = sessionStorage.getItem(COUNT_ARRAY_KEY)
  return JSON.parse(storedData)
}

function loadImageArrayData() {
  const storedData = sessionStorage.getItem(IMAGE_DATA_ARRAY_KEY)
  return JSON.parse(storedData) || []
}

function loadImageCheckData() {
  const storedData = sessionStorage.getItem(IMAGE_CHECK_ARRAY_KEY)
  return JSON.parse(storedData) || []
}

function loadTotalGuessesArrayData() {
  const storedData = sessionStorage.getItem(TOTAL_GUESSES_KEY)
  return JSON.parse(storedData)
}

function loadRightGuessesArrayData() {
  const storedData = sessionStorage.getItem(RIGHT_GUESSES_KEY)
  return JSON.parse(storedData)
}

function loadEndGameArrayData() {
  const storedData = sessionStorage.getItem(END_GAME_ARRAY_KEY)
  return JSON.parse(storedData) || []
}

function loadNumberOfCardsArrayData() {
  const storedData = sessionStorage.getItem(NUMBER_OF_CARDS_ARRAY_KEY)
  return JSON.parse(storedData) || []
}

function loadNameArrayData() {
  const storedData = localStorage.getItem(NAME_ARRAY_KEY)
  return JSON.parse(storedData) || []
}

function loadCurrentNameScoreArrayData() {
  const storedData = sessionStorage.getItem(CURRENT_NAME_SCORE_ARRAY_KEY)
  return JSON.parse(storedData) || []
}

function loadCurrentNameAndHighScoreArrayData() {
  const storedData = sessionStorage.getItem(CURRENT_NAME_AND_HIGH_SCORE_ARRAY_KEY)
  return JSON.parse(storedData) || []
}

function loadSaveGameArrayData() {
  const storedData = sessionStorage.getItem(SAVE_GAME_ARRAY_KEY)
  return JSON.parse(storedData)
}

const clickCount = loadCountArrayData()
const imageDataStorage = loadImageArrayData()
const imageCheckStorage = loadImageCheckData()
const totalGuessesStorage = loadTotalGuessesArrayData()
const rightGuessesStorage = loadRightGuessesArrayData()
const endGameStorage = loadEndGameArrayData()
const numberOfCardsStorage = loadNumberOfCardsArrayData()
const nameStorage = loadNameArrayData()
const currentNameScoreStorage = loadCurrentNameScoreArrayData()
const currentNameAndHighScoreStorage = loadCurrentNameAndHighScoreArrayData()
const saveGameStorage = loadSaveGameArrayData()

// load the information into the arrays being used in the application 
if (clickCount != null) {
  const count = clickCount[0]
  countArray[0] = count
}

if (imageDataStorage != null) {
  for (let i = 0; i < imageDataStorage.length; i++) {
    const imageDataObj = {
      imageSrc: imageDataStorage[i].imageSrc,
      hasBeenClicked: imageDataStorage[i].hasBeenClicked,
      blank: imageDataStorage[i].blank,
      id: imageDataStorage[i].id,
    }
    imageDataArray.push(imageDataObj)
  }
}

if (imageCheckStorage != null) {
  for (let i = 0; i < imageCheckStorage.length; i++) {
    const checkImagesDataObj = {
      imageSource: imageCheckStorage[i].imageSource,
      parent: imageCheckStorage[i].parent,
      id: imageCheckStorage[i].id,
    }
    imageCheckArray.push(checkImagesDataObj)
  }
}

if (totalGuessesStorage != null) {
  const total = totalGuessesStorage[0]
  totalGuesses[0] = total
}

if (rightGuessesStorage != null) {
  const right = rightGuessesStorage[0]
  rightGuesses[0] = right
}

if (endGameStorage != null) {
  endGameArray.push(endGameStorage[0])
}

if (numberOfCardsStorage != null) {
  numberOfCardsArray.push(numberOfCardsStorage[0])
}

if (nameStorage != null) {
  for (let i = 0; i < nameStorage.length; i++) {
    const nameObj = {
      name: nameStorage[i].name,
      highScore: nameStorage[i].highScore,
    }
    nameArray.push(nameObj)
  }
}

if (currentNameScoreStorage != null) {
  currentNameScore.push(currentNameScoreStorage[0])
}

if (currentNameAndHighScoreStorage != null) {
  for (let i = 0; i < currentNameAndHighScoreStorage.length; i++) {
    const nameScoreObj = {
      name: currentNameAndHighScoreStorage[i].name,
      highScore: currentNameAndHighScoreStorage[i].highScore,
    }
    currNameAndHighScore.push(nameScoreObj)
  }
}

if (saveGameStorage != null) {
  const saveGame = saveGameStorage[0]
  saveGameArray[0] = saveGame
}

// now that arrays have been created and data has been properly loaded in from storage, we can begin the application
$(document).ready(() => {
  // create the tabs widget
  $(function () {
    $("#tabs").tabs()
  })
  $(function () {
    $("#selectable").selectable()
  })

  // render images to the screen upon initial load
  renderImages()
  
  // add a click event listener to the imagesContainer
  imagesContainer.addEventListener("click", (e) => {
    // if the event does not match an image, return 
    if (!e.target.matches("#img-item")) return

    // check to see if the count equals 1
    if (countArray[0] == 1) {
      // select the image that was clicked on and check if it has already been clicked on or is blank
      const parent = e.target.closest(".aTag")
      const imageId = parent.dataset.imageId
      const image = imageDataArray.find((i) => i.id === imageId)
      if (image.hasBeenClicked == true) {
        return
      } else if (image.blank == true) {
        return
      } else {
        // if the image is valid, add info to arrays
        const checkImagesData = {
          imageSource: image.imageSrc,
          parent: parent.outerHTML,
          id: image.id,
        }
        imageCheckArray.push(checkImagesData)
        sessionStorage.setItem(
          IMAGE_CHECK_ARRAY_KEY,
          JSON.stringify(imageCheckArray)
        )

        image.hasBeenClicked = true
        
        // add the flip effect 
        parent.classList.add("removed")
        setTimeout(() => {
          const newImgSrc = parent.id
          e.target.setAttribute("src", newImgSrc)
          parent.classList.remove("removed")
        }, 500)

        // since the countArray equaled 1 meaning two cards have now been clicked on and revealed, we increase the totalGuesses by 1 and check to see if the cards match
        totalGuesses[0] = totalGuesses[0] + 1
        sessionStorage.setItem(TOTAL_GUESSES_KEY, JSON.stringify(totalGuesses))

        // add an overlay so the user cannot click on anything else while this logic is being decided
        imageOverlay.classList.add("overlay")

        // check to see if the cards are equal 
        if (imageCheckArray[0].imageSource == imageCheckArray[1].imageSource) {
          // if the cards are equal, we increase right guesses by 1
          rightGuesses[0] = rightGuesses[0] + 1
          sessionStorage.setItem(RIGHT_GUESSES_KEY, JSON.stringify(rightGuesses))
          // subtract 2 from the endGameArray
          endGameArray[0] = endGameArray[0] - 2
          sessionStorage.setItem(END_GAME_ARRAY_KEY, JSON.stringify(endGameArray))

          // select the first card in the dom using an id 
          const targetImageOneId = imageCheckArray[0].id
          const targetImageOneParent = document.querySelector(`a[data-image-id="${targetImageOneId}"]`)
          const imgElementOne = targetImageOneParent.querySelector("img")

          // select the second card in the dom using an id
          const targetImageTwoId = imageCheckArray[1].id
          const targetImageTwoParent = document.querySelector(`a[data-image-id="${targetImageTwoId}"]`)
          const imgElementTwo = targetImageTwoParent.querySelector("img")
         
          // update the two cards attributes in the imageDataArray to make blank == true
          imageDataArray.forEach((data) => {
            if (data.id === imageCheckArray[0].id) {
              data.hasBeenClicked = false
              data.blank = true
            }
          })
          sessionStorage.setItem(
            IMAGE_DATA_ARRAY_KEY,
            JSON.stringify(imageDataArray)
          )
          imageDataArray.forEach((data) => {
            if (data.id === imageCheckArray[1].id) {
              data.hasBeenClicked = false
              data.blank = true
            }
          })
          sessionStorage.setItem(
            IMAGE_DATA_ARRAY_KEY,
            JSON.stringify(imageDataArray)
          )

          // add the slide up effect to the two cards
          setTimeout(() => {
            targetImageOneParent.classList.add("slide-up")
            targetImageTwoParent.classList.add("slide-up")
            setTimeout(() => {
              imgElementOne.setAttribute("src", "images/blank.png")

              imgElementTwo.setAttribute("src", "images/blank.png")
              imageOverlay.classList.remove("overlay")
            }, 500)
          }, 500)

          // reset the countArray to 0
          countArray = [0]
          sessionStorage.setItem(COUNT_ARRAY_KEY, JSON.stringify(countArray))

          // check if the game has ended 
          if (endGameArray[0] == 0) {
            endGame()
            return
          }
        } else {
          // this block runs if the two cards are not equal to eachother

          // select the first card from the DOM
          const targetImageOneId = imageCheckArray[0].id
          const targetImageOneParent = document.querySelector(`a[data-image-id="${targetImageOneId}"]`)
          const imgElementOne = targetImageOneParent.querySelector("img")

          // select the second card from the DOM
          const targetImageTwoId = imageCheckArray[1].id
          const targetImageTwoParent = document.querySelector(`a[data-image-id="${targetImageTwoId}"]`)
          const imgElementTwo = targetImageTwoParent.querySelector("img")

          // update the cards hasBeenClicked attributes within the imageDataArray to be false
          imageDataArray.forEach((data) => {
            if (data.id === imageCheckArray[0].id) {
              data.hasBeenClicked = false
            }
          })
          sessionStorage.setItem(
            IMAGE_DATA_ARRAY_KEY,
            JSON.stringify(imageDataArray)
          )
          imageDataArray.forEach((data) => {
            if (data.id === imageCheckArray[1].id) {
              data.hasBeenClicked = false
            }
          })
          sessionStorage.setItem(
            IMAGE_DATA_ARRAY_KEY,
            JSON.stringify(imageDataArray)
          )

          // add a fadeout effect and return the cards source attribute to the back.png
          setTimeout(() => {
            targetImageOneParent.classList.add("removed")
            targetImageTwoParent.classList.add("removed")
            setTimeout(() => {
              const sourceAttributeOne = imgElementOne.getAttribute("src")
              targetImageOneParent.setAttribute("id", sourceAttributeOne)
              imgElementOne.setAttribute("src", "images/back.png")

              const sourceAttributeTwo = imgElementTwo.getAttribute("src")
              targetImageTwoParent.setAttribute("id", sourceAttributeTwo)
              imgElementTwo.setAttribute("src", "images/back.png")

              targetImageOneParent.classList.remove("removed")
              targetImageTwoParent.classList.remove("removed")
              imageOverlay.classList.remove("overlay")
            }, 500)
          }, 1500)

          // reset the countArray to 0
          countArray = [0]
          sessionStorage.setItem(COUNT_ARRAY_KEY, JSON.stringify(countArray))
        }

        // no matter which block runs when countArray == 1, we reset the imageCheckArray
        imageCheckArray = []
        sessionStorage.setItem(
          IMAGE_CHECK_ARRAY_KEY,
          JSON.stringify(imageCheckArray)
        )
      }
    } else {
      // this block runs when countArray != 1

      // select the image that has been clicked on and check to see if it has been clicked on or is blank
      const parent = e.target.closest(".aTag")
      const imageId = parent.dataset.imageId
      const image = imageDataArray.find((i) => i.id === imageId)
      if (image.hasBeenClicked == true) {
        return
      } else if (image.blank == true) {
        return
      } else {
        // if the card is valid, we update countArray to equal 1 and add important information to arrays
        countArray[0] = countArray[0] + 1
        sessionStorage.setItem(COUNT_ARRAY_KEY, JSON.stringify(countArray))
    
        const checkImagesData = {
          imageSource: image.imageSrc,
          parent: parent.outerHTML,
          id: image.id,
        }
        imageCheckArray.push(checkImagesData)
        sessionStorage.setItem(
          IMAGE_CHECK_ARRAY_KEY,
          JSON.stringify(imageCheckArray)
        )

        image.hasBeenClicked = true
        sessionStorage.setItem(
          IMAGE_DATA_ARRAY_KEY,
          JSON.stringify(imageDataArray)
        )

        // switch the source of the image from the back to the new image source and add a flip effect
        parent.classList.add("removed")
        setTimeout(() => {
          const newImgSrc = parent.id
          e.target.setAttribute("src", newImgSrc)
          // parent.id = "images/back.png"
          parent.classList.remove("removed")
        }, 500)
      }
    }
  })

  // add a submit event listener to the settings form
  settingsForm.addEventListener("submit", (e) => {
    e.preventDefault()
    // force the user to enter a name
    if (settingsName.value == "") return 

    // reset the text elements that store the name and scores as well as the endGameArray, currNameAndHighScore, saveGameArray, and numberOfCardsArray arrays 
    nameElement.innerText = ""
    highScoreElement.innerText = ""
    gameScore.innerText = ""
    endGameArray = []
    sessionStorage.setItem(END_GAME_ARRAY_KEY, JSON.stringify(endGameArray))
    currNameAndHighScore = []
    sessionStorage.setItem(CURRENT_NAME_AND_HIGH_SCORE_ARRAY_KEY, JSON.stringify(currNameAndHighScore))
    saveGameArray[0] = 0
    sessionStorage.setItem(SAVE_GAME_ARRAY_KEY, JSON.stringify(saveGameArray))
    numberOfCardsArray = []
    sessionStorage.setItem(
      NUMBER_OF_CARDS_ARRAY_KEY,
      JSON.stringify(numberOfCardsArray)
    )
    
    const name = settingsName.value
    // create an object to the store the username and highscore
    const highScoreObject = {
      name,
      highScore: 0,
    }
    // push the object into the nameArray and save it to local storage
    nameArray.push(highScoreObject)
    localStorage.setItem(NAME_ARRAY_KEY, JSON.stringify(nameArray))
    // push the object into the currNameAndHighScore array as well and save it to session storage
    currNameAndHighScore.push(highScoreObject)
    sessionStorage.setItem(CURRENT_NAME_AND_HIGH_SCORE_ARRAY_KEY, JSON.stringify(currNameAndHighScore))
    // reset the currentNameScore
    currentNameScore = []
    sessionStorage.setItem(CURRENT_NAME_SCORE_ARRAY_KEY, JSON.stringify(currentNameScore))
    
    const numberOfCards = settingsCardNumber.value
    // update the endGameArray to be the numberOfCards 
    endGameArray = [parseInt(numberOfCards)]
    sessionStorage.setItem(END_GAME_ARRAY_KEY, JSON.stringify(endGameArray))
    // update the numberOfCardsArray to be the numberOfCards
    numberOfCardsArray = [parseInt(numberOfCards)]
    sessionStorage.setItem(
      NUMBER_OF_CARDS_ARRAY_KEY,
      JSON.stringify(numberOfCardsArray)
    )

    // set the text elements to the respective name and score properties
    nameElement.innerText = name
    const obj = nameArray.find((n) => n.name === nameElement.innerText)
    highScoreElement.innerText = obj.highScore
    gameScore.innerText = currentNameScore[0]?.currentScore || 0
    // reset the imageDataArray
    imageDataArray = []
    sessionStorage.setItem(IMAGE_DATA_ARRAY_KEY, JSON.stringify(imageDataArray))
    // clear out everything from the imagesContainer
    while (imagesContainer.firstChild) {
      imagesContainer.removeChild(imagesContainer.firstChild)
    }

    // render new images to the imagesContainer with the proper number of cards
    renderImages(numberOfCards)
    // take the user back to the home widget
    $("#tabs").tabs("option", "active", 0)
  })

  // add a click event listener to the document to scan for the new game element link 
  document.addEventListener("click", (e) => {
    // if the click event does not match the new game element, we return immedietly 
    if (!e.target.matches("#new-game")) return
    e.preventDefault()

    // reset the imageDataArray and empty the imagesContainer
    imageDataArray = []
    sessionStorage.setItem(IMAGE_DATA_ARRAY_KEY, JSON.stringify(imageDataArray))
    while (imagesContainer.firstChild) {
      imagesContainer.removeChild(imagesContainer.firstChild)
    }

    // reset the rightGuesses, totalGuesses, endGameArray, and saveGameArray arrays 
    const newNumberOfCards = numberOfCardsArray[0]
    rightGuesses[0] = 0
    sessionStorage.setItem(RIGHT_GUESSES_KEY, JSON.stringify(rightGuesses))
    totalGuesses[0] = 0
    sessionStorage.setItem(TOTAL_GUESSES_KEY, JSON.stringify(totalGuesses))
    endGameArray = [newNumberOfCards]
    sessionStorage.setItem(END_GAME_ARRAY_KEY, JSON.stringify(endGameArray))
    saveGameArray[0] = 0
    sessionStorage.setItem(SAVE_GAME_ARRAY_KEY, JSON.stringify(saveGameArray))
    // render new images to the screen with the proper number of cards
    renderImages(newNumberOfCards)
  })
})

// this function handles what happens when the game ends 
function endGame() {
  // reset the imagesDataArray, imageCheckArray, currentNameScore array, and empty the imagesContainer
  imageDataArray = []
  sessionStorage.setItem(IMAGE_DATA_ARRAY_KEY, JSON.stringify(imageDataArray))
  imageCheckArray = []
  sessionStorage.setItem(IMAGE_CHECK_ARRAY_KEY, JSON.stringify(imageCheckArray))
  currentNameScore = []
  sessionStorage.setItem(CURRENT_NAME_SCORE_ARRAY_KEY, JSON.stringify(currentNameScore))
  while (imagesContainer.firstChild) {
    imagesContainer.removeChild(imagesContainer.firstChild)
  }

  // calc score
  const score = rightGuesses[0] / totalGuesses[0]
  const baseScore = (score * 100).toFixed(2)
  // see if the user has history in local storage, see if the high score is less than this high score, than update the high score or don't
  let highScoreText
  if (nameElement.innerText == ""){
    highScoreText = baseScore + "%"
  } else {
    const obj = nameArray.find((n) => n.name === nameElement.innerText)
    if (baseScore > obj.highScore) {
      obj.highScore = baseScore
      highScoreText = baseScore + "%"
    } else {
      highScoreText = obj.highScore + "%"
    }
    
    localStorage.setItem(NAME_ARRAY_KEY, JSON.stringify(nameArray))
  }
  

  currentNameScore.push(baseScore + "%")
  sessionStorage.setItem(CURRENT_NAME_SCORE_ARRAY_KEY, JSON.stringify(currentNameScore))

  // update the high score element text value
  highScoreElement.innerText = highScoreText

  const percentageValue = (score * 100).toFixed(2) + "%"
  // update the current score element text value
  gameScore.innerText = percentageValue
  
  // display screen that shows score and new game link with confetti
  const newHTML = `<p>Your score for this game was ${percentageValue}</p>\n
                    <p>Click on "New Game" to start a new game!</p>`
  imagesContainer.innerHTML += newHTML
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
  })
}

// this function render images to the screen
function renderImages(numberOfCards = 48) {
  // set a cards variable to the endGameArray count if it exists or the number of cards that is passed into the function
  const cards = endGameArray[0] || parseInt(numberOfCards)

  // if saveGameArray is not equal to 1, it means this is the initial page render and we need to render out random cards to the screen
  if (saveGameArray[0] != 1) {
    
    let newImagesArray = []

    if (cards == 48) {
      newImagesArray = [...imagesSrcArray]
    } else {
      // make the slicing random
      newImagesArray = randomizeOriginalArray(cards)
    }

    // randomize the newImagesArray 
    const randomizedArrayOne = randomizeArray(newImagesArray)
    
    // render out images to the screen using a template
    randomizedArrayOne.forEach((image) => {
      const templateClone = template.content.cloneNode(true)
      const aTag = templateClone.querySelector(".aTag")
      // generate a random id
      const id = generateRandomId(10)
      // save the id to a dataset on the element 
      aTag.dataset.imageId = id
      // create an imageData object that stores important information about the image
      const imageData = {
        imageSrc: image,
        hasBeenClicked: false,
        blank: false,
        id,
      }
      // store the object in the imageDataArray array 
      imageDataArray.push(imageData)
      sessionStorage.setItem(IMAGE_DATA_ARRAY_KEY, JSON.stringify(imageDataArray))
      const imgTag = templateClone.querySelector("#img-item")

      // set the id attribute on the a tag and the src attribute on the img tag
      aTag.setAttribute("id", image)
      imgTag.setAttribute("src", "images/back.png")
      // append the templateClone to the imagesContainer
      imagesContainer.appendChild(templateClone)
    })
    // set saveGameArray to be 1
    saveGameArray[0] = 1
    sessionStorage.setItem(SAVE_GAME_ARRAY_KEY, JSON.stringify(saveGameArray))
  } else {
    // once cards have been rendered to the screen on initial load, this block will run when the page is reloaded as it will save the position and attributes of the cards on the screen
    const cards = endGameArray[0] || parseInt(numberOfCards)
    // if the user has selected to not fill out the settings form, we need to set the endGameArray here
    endGameArray[0] = cards
    
    // loop through the imageDataArray and render the images to the screen with their proper attributes
    imageDataArray.forEach((image) => {
      const templateClone = template.content.cloneNode(true)
      const aTag = templateClone.querySelector(".aTag")
      const imgTag = templateClone.querySelector("#img-item")
      aTag.dataset.imageId = image.id
      if (image.blank) {
        aTag.setAttribute("id", "")
        imgTag.setAttribute("src", "images/blank.png")
      } else if (image.hasBeenClicked) {
        imgTag.setAttribute("src", image.imageSrc)
      } else {
        aTag.setAttribute("id", image.imageSrc)
        imgTag.setAttribute("src", "images/back.png")
      }

      imagesContainer.appendChild(templateClone)
    
    // keep the name, high score, and score the same
      const obj = nameArray.find(n => n.name == currNameAndHighScore[0]?.name)
      nameElement.innerText = obj?.name || ""
      highScoreElement.innerText = obj?.highScore || ""
      gameScore.innerText = currentNameScore[0] || 0
    })
    
  }
}

// everything below this comment is helper functions

function randomizeOriginalArray(numberOfCards) {
  let randomIndexArray = []
  let newestArray = []
  let length = numberOfCards / 2
  let count = length
  let check = "false"
  while (count > 0) {
    check = "false"
    const randomIndex = Math.floor(Math.random() * 47)
    const value = imagesSrcArray[randomIndex]
    if (randomIndexArray.length > 0) {
      randomIndexArray.forEach((image) => {
        if (image === value) {
          check = "true"
          return
        }
      })
    }

    if (check === "false") {
      randomIndexArray.push(value)
      newestArray.push(value)
      newestArray.push(value)
      count = count - 1
    }
  }
  return newestArray
}

function randomizeArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
  return array
}

function generateRandomId(length) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  let randomId = ""
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length)
    randomId += characters.charAt(randomIndex)
  }
  return randomId
}
