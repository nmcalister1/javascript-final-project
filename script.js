const template = document.querySelector("#image-template")
const imageOverlay = document.querySelector("#image-overlay")
const imagesContainer = document.querySelector(".grid-container")

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
    if (countArray[0] < 2){
      
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
      
    } else {
      // check to see if the cards match and set them to appropriate side --- back or blank 
      console.log("else block")
      console.log(imageCheckArray)
      imageOverlay.classList.add("overlay")
      if (imageCheckArray[0].imageSource == imageCheckArray[1].imageSource){
        const parentOne = imageCheckArray[0].parent
        const imgElementOne = parentOne.children[0]
        //imgElementOne.setAttribute("src", "images/blank.png")
        
        const parentTwo = imageCheckArray[1].parent
        const imgElementTwo = parentTwo.children[0]
        //imgElementTwo.setAttribute("src", "images/blank.png")

        imageCheckArray.forEach((data) => {
          const imageId = data.id
          const image = imageDataArray.find(i => i.id === imageId)
          image.hasBeenClicked = false
          image.blank = true
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
      } else {
        const parentOne = imageCheckArray[0].parent
        const imgElementOne = parentOne.children[0]
        
        const parentTwo = imageCheckArray[1].parent
        const imgElementTwo = parentTwo.children[0]

        imageCheckArray.forEach((data) => {
          const imageId = data.id
          const image = imageDataArray.find(i => i.id === imageId)
          image.hasBeenClicked = false
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
    setTimeout(() => {
      window.removeEventListener('scroll', disableScroll)
    }, 100)
    
  })
})


function renderImages() {
  // randomize the array (create a function to randomize the array) and then loop through it
  console.log("rendered images")
  const randomizedArrayOne = randomizeArray(imagesSrcArray)
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
