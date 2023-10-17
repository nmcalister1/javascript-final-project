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

//let imagesIdArray = []

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
let nameArray = []
let currentNameScore = []
let currNameAndHighScore = []
let saveGameArray = [0]

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

$(document).ready(() => {
  $(function () {
    $("#tabs").tabs()
  })
  $(function () {
    $("#selectable").selectable()
  })

  renderImages()
  

  let currentScrollPos
  imagesContainer.addEventListener("click", (e) => {
    if (!e.target.matches("#img-item")) return
    currentScrollPos = window.scrollY
    function disableScroll() {
      window.scrollTo(0, currentScrollPos)
    }

    window.addEventListener("scroll", disableScroll)

    if (countArray[0] == 1) {
      console.log(countArray[0], "before we add 1")
      // check the id, if the img has already been clicked and count is not yet 3, return

      // also check if it is a blank
      const parent = e.target.closest(".aTag")
      const imageId = parent.dataset.imageId
      const image = imageDataArray.find((i) => i.id === imageId)
      if (image.hasBeenClicked == true) {
        return
      } else if (image.blank == true) {
        return
      } else {
        console.log("clicked")
        //countArray[0] = countArray[0] + 1
        //sessionStorage.setItem(COUNT_ARRAY_KEY, JSON.stringify(countArray))
        console.log(countArray[0], "after we add 1")
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
        console.log(imageCheckArray, "image check array")

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
        sessionStorage.setItem(TOTAL_GUESSES_KEY, JSON.stringify(totalGuesses))
        console.log("else block")
        imageOverlay.classList.add("overlay")
        if (imageCheckArray[0].imageSource == imageCheckArray[1].imageSource) {
          rightGuesses[0] = rightGuesses[0] + 1
          sessionStorage.setItem(RIGHT_GUESSES_KEY, JSON.stringify(rightGuesses))
          endGameArray[0] = endGameArray[0] - 2
          sessionStorage.setItem(END_GAME_ARRAY_KEY, JSON.stringify(endGameArray))
          console.log(endGameArray[0])

          const targetImageOneId = imageCheckArray[0].id
          const targetImageOneParent = document.querySelector(`a[data-image-id="${targetImageOneId}"]`)
          // const parentOne = imageCheckArray[0].parent
          // const parentOneElement = document.createElement("div")
          // parentOneElement.innerHTML = parentOne
          // console.log(parentOneElement)
          const imgElementOne = targetImageOneParent.querySelector("img")
          // const aElementOne = parentOneElement.querySelector("a")
          
          console.log(imgElementOne)
          //imgElementOne.setAttribute("src", "images/blank.png")

          const targetImageTwoId = imageCheckArray[1].id
          const targetImageTwoParent = document.querySelector(`a[data-image-id="${targetImageTwoId}"]`)
          // const parentTwo = imageCheckArray[1].parent
          // const parentTwoElement = document.createElement("div")
          // parentTwoElement.innerHTML = parentTwo
          // console.log(parentTwoElement)
          const imgElementTwo = targetImageTwoParent.querySelector("img")
          // const aElementTwo = parentTwoElement.querySelector("a")
          // console.log(imgElementOne)
          //imgElementTwo.setAttribute("src", "images/blank.png")
          // find the specific image data in imagedataarray, then change the properties
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
          console.log(imageDataArray)

          setTimeout(() => {
            targetImageOneParent.classList.add("slide-up")
            targetImageTwoParent.classList.add("slide-up")
            setTimeout(() => {
              imgElementOne.setAttribute("src", "images/blank.png")

              imgElementTwo.setAttribute("src", "images/blank.png")
              imageOverlay.classList.remove("overlay")
            }, 500)
          }, 500)

          // save the new a element to check array, render it in render, and call render here

          countArray = [0]
          sessionStorage.setItem(COUNT_ARRAY_KEY, JSON.stringify(countArray))
          if (endGameArray[0] == 0) {
            endGame()
            return
          }
        } else {
          console.log(imageCheckArray, "image check array")
          const targetImageOneId = imageCheckArray[0].id
          const targetImageOneParent = document.querySelector(`a[data-image-id="${targetImageOneId}"]`)
          // const parentOne = imageCheckArray[0].parent
          // const parentOneElement = document.createElement("div")
          // parentOneElement.innerHTML = parentOne
          // console.log(parentOneElement)
          const imgElementOne = targetImageOneParent.querySelector("img")
          // const aElementOne = parentOneElement.querySelector("a")
          // console.log(aElementOne)

          const targetImageTwoId = imageCheckArray[1].id
          const targetImageTwoParent = document.querySelector(`a[data-image-id="${targetImageTwoId}"]`)
          // const parentTwo = imageCheckArray[1].parent
          // const parentTwoElement = document.createElement("div")
          // parentTwoElement.innerHTML = parentTwo
          // console.log(parentTwoElement)
          const imgElementTwo = targetImageTwoParent.querySelector("img")
          // const aElementTwo = parentTwoElement.querySelector("a")
          // console.log(imgElementTwo)

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

          countArray = [0]
          sessionStorage.setItem(COUNT_ARRAY_KEY, JSON.stringify(countArray))
        }

        imageCheckArray = []
        sessionStorage.setItem(
          IMAGE_CHECK_ARRAY_KEY,
          JSON.stringify(imageCheckArray)
        )
      }
    } else {
      // check the id, if the img has already been clicked and count is not yet 3, return

      // also check if it is a blank
      const parent = e.target.closest(".aTag")
      const imageId = parent.dataset.imageId
      const image = imageDataArray.find((i) => i.id === imageId)
      if (image.hasBeenClicked == true) {
        return
      } else if (image.blank == true) {
        return
      } else {
        console.log("clicked")
        countArray[0] = countArray[0] + 1
        sessionStorage.setItem(COUNT_ARRAY_KEY, JSON.stringify(countArray))
        console.log(countArray[0])
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
        console.log(imageCheckArray, "image check array")

        image.hasBeenClicked = true
        sessionStorage.setItem(
          IMAGE_DATA_ARRAY_KEY,
          JSON.stringify(imageDataArray)
        )

        parent.classList.add("removed")
        setTimeout(() => {
          const newImgSrc = parent.id
          e.target.setAttribute("src", newImgSrc)
          // parent.id = "images/back.png"
          parent.classList.remove("removed")
        }, 500)
      }
      setTimeout(() => {
        window.removeEventListener("scroll", disableScroll)
      }, 100)
    }
  })

  settingsForm.addEventListener("submit", (e) => {
    e.preventDefault()
    nameElement.innerText = ""
    highScoreElement.innerText = ""
    gameScore.innerText = ""
    endGameArray = []
    sessionStorage.setItem(END_GAME_ARRAY_KEY, JSON.stringify(endGameArray))
    currNameAndHighScore = []
    sessionStorage.setItem(CURRENT_NAME_AND_HIGH_SCORE_ARRAY_KEY, JSON.stringify(currNameAndHighScore))
    saveGameArray[0] = 0
    sessionStorage.setItem(SAVE_GAME_ARRAY_KEY, JSON.stringify(saveGameArray))
    // currentNameScore = []
    // sessionStorage.setItem(CURRENT_NAME_SCORE_ARRAY_KEY, JSON.stringify(currentNameScore))
    numberOfCardsArray = []
    sessionStorage.setItem(
      NUMBER_OF_CARDS_ARRAY_KEY,
      JSON.stringify(numberOfCardsArray)
    )
    //nameArray = []
    //sessionStorage.setItem(NAME_ARRAY_KEY, JSON.stringify(nameArray))
    const name = settingsName.value
    const highScoreObject = {
      name,
      highScore: 0,
    }
    // const currentScoreObj = {
    //   name,
    //   highScore: 0,
    //   currentScore: 0
    // }
    nameArray.push(highScoreObject)
    localStorage.setItem(NAME_ARRAY_KEY, JSON.stringify(nameArray))
    currNameAndHighScore.push(highScoreObject)
    sessionStorage.setItem(CURRENT_NAME_AND_HIGH_SCORE_ARRAY_KEY, JSON.stringify(currNameAndHighScore))
    currentNameScore = []
    sessionStorage.setItem(CURRENT_NAME_SCORE_ARRAY_KEY, JSON.stringify(currentNameScore))
    
    const numberOfCards = settingsCardNumber.value
    endGameArray = [parseInt(numberOfCards)]
    sessionStorage.setItem(END_GAME_ARRAY_KEY, JSON.stringify(endGameArray))
    numberOfCardsArray = [parseInt(numberOfCards)]
    sessionStorage.setItem(
      NUMBER_OF_CARDS_ARRAY_KEY,
      JSON.stringify(numberOfCardsArray)
    )

    nameElement.innerText = name
    const obj = nameArray.find((n) => n.name === nameElement.innerText)
    highScoreElement.innerText = obj.highScore
    gameScore.innerText = currentNameScore[0]?.currentScore || 0
    imageDataArray = []
    sessionStorage.setItem(IMAGE_DATA_ARRAY_KEY, JSON.stringify(imageDataArray))
    while (imagesContainer.firstChild) {
      imagesContainer.removeChild(imagesContainer.firstChild)
    }
    renderImages(numberOfCards)
    $("#tabs").tabs("option", "active", 0)
  })

  document.addEventListener("click", (e) => {
    if (!e.target.matches("#new-game")) return
    e.preventDefault()

    imageDataArray = []
    sessionStorage.setItem(IMAGE_DATA_ARRAY_KEY, JSON.stringify(imageDataArray))
    while (imagesContainer.firstChild) {
      imagesContainer.removeChild(imagesContainer.firstChild)
    }

    const newNumberOfCards = numberOfCardsArray[0]
    rightGuesses[0] = 0
    sessionStorage.setItem(RIGHT_GUESSES_KEY, JSON.stringify(rightGuesses))
    totalGuesses[0] = 0
    sessionStorage.setItem(TOTAL_GUESSES_KEY, JSON.stringify(totalGuesses))
    endGameArray = [newNumberOfCards]
    sessionStorage.setItem(END_GAME_ARRAY_KEY, JSON.stringify(endGameArray))
    saveGameArray[0] = 0
    sessionStorage.setItem(SAVE_GAME_ARRAY_KEY, JSON.stringify(saveGameArray))
    renderImages(newNumberOfCards)
  })
})

function endGame() {
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
  const obj = nameArray.find((n) => n.name === nameElement.innerText)
  console.log(obj, "obj name object")

  if (baseScore > obj.highScore) {
    console.log("baseScore is greater than obj.highscore")
    obj.highScore = baseScore
    highScoreText = baseScore + "%"
  } else {
    highScoreText = obj.highScore + "%"
  }
  
  localStorage.setItem(NAME_ARRAY_KEY, JSON.stringify(nameArray))
  currentNameScore.push(baseScore + "%")
  sessionStorage.setItem(CURRENT_NAME_SCORE_ARRAY_KEY, JSON.stringify(currentNameScore))

  highScoreElement.innerText = highScoreText

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

function checkWin() {
  if (endGameArray[0] == 0) {
    endGame()
  }
}

function renderImages(numberOfCards = 48) {
  // randomize the array (create a function to randomize the array) and then loop through it
  const cards = endGameArray[0] || parseInt(numberOfCards)
  console.log(cards)

  // endGameArray[0] == numberOfCardsArray[0]
  // need a better condition -- the user could have already flipped over cards and endGameArray[0] == numberOfCardsArray[0]
  if (saveGameArray[0] != 1) {
    // make the slicing random
    let newImagesArray = []

    if (cards == 48) {
      newImagesArray = [...imagesSrcArray]
    } else {
      newImagesArray = randomizeOriginalArray(cards)
    }

    const randomizedArrayOne = randomizeArray(newImagesArray)
    console.log(randomizedArrayOne)
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
      sessionStorage.setItem(IMAGE_DATA_ARRAY_KEY, JSON.stringify(imageDataArray))
      const imgTag = templateClone.querySelector("#img-item")

      aTag.setAttribute("id", image)
      imgTag.setAttribute("src", "images/back.png")
      imagesContainer.appendChild(templateClone)
    })
    saveGameArray[0] = 1
    sessionStorage.setItem(SAVE_GAME_ARRAY_KEY, JSON.stringify(saveGameArray))
  } else {
    console.log(imageDataArray, "image data array")
    console.log(imageCheckArray, "image check array")
    // this is supposses to render new things to screen, so get rid of empty array or do clone node, query select is not available otherwise
    imageDataArray.forEach((image) => {
      const templateClone = template.content.cloneNode(true)
      const aTag = templateClone.querySelector(".aTag")
      const imgTag = templateClone.querySelector("#img-item")
      aTag.dataset.imageId = image.id
      if (image.blank) {
        console.log("is blank")
        aTag.setAttribute("id", "")
        imgTag.setAttribute("src", "images/blank.png")
      } else if (image.hasBeenClicked) {
        //aTag.setAttribute("id", "images/back.png")
        imgTag.setAttribute("src", image.imageSrc)
      } else {
        aTag.setAttribute("id", image.imageSrc)
        imgTag.setAttribute("src", "images/back.png")
      }

      imagesContainer.appendChild(templateClone)
    
    // keep the name, high score, and score the same
      const obj = nameArray.find(n => n.name == currNameAndHighScore[0].name)
      nameElement.innerText = obj.name
      highScoreElement.innerText = obj.highScore
      console.log(currentNameScore)
      gameScore.innerText = currentNameScore[0] || 0
    })
    
  }
}

function randomizeOriginalArray(numberOfCards) {
  let randomIndexArray = []
  let newestArray = []
  let length = numberOfCards / 2
  let count = length
  let check = "false"
  while (count > 0) {
    // actually don't check index, check the value
    // add the indexes to the randomIndexArray to check to see if we have already selected a random value from that index
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
  console.log(newestArray, "Newest Array")
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

// When the user clicks on a card whose back is displayed,
// ---- the back of the card should be faded out over half a second and the front of the card should be faded in over half a second

// Set up logic which only allows the user to open 2 cards --- why does it flip back to cover on click again?

// When the user finds two matching cards, the cards should be hidden after one second using a sliding motion over half a second. If the cards don’t match,
// ---- they should be faded out over half a second after two seconds and the back of the cards should be faded in over half a second

// don't allow the user to click on other cards after the 3rd click untill the processes are complete

// When the game ends, the user can click the New Game link to start another game

// Each time the user completes a game, the user’s high score should be updated and displayed and the percentage of correct selections for the game that was just completed should be calculated and displayed.
// ---- The high score should also be stored in local storage so it can be compared against the score for the user’s next game

// When the user clicks the Save Settings button, the player name and number of cards should be saved in session storage.
// ---- In addition, the page should be reloaded so the player’s name, the player’s high score if previous games have been played, and the correct number of cards are displayed.
