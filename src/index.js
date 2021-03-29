let addToy = false;
const allToys = "http://localhost:3000/toys/"
const addBtn = document.querySelector("#new-toy-btn");
const toyFormContainer = document.querySelector(".container");
const toyCollection = document.querySelector("#toy-collection")
const toyForm = document.querySelector(".add-toy-form")

addBtn.addEventListener("click", () => {
  // hide & seek with the form
  addToy = !addToy;
  if (addToy) {
    toyFormContainer.style.display = "block";
  } else {
    toyFormContainer.style.display = "none";
  }
});

toyForm.addEventListener("submit", (event) => {
  event.preventDefault()
  postToy(event.target)
  event.target.reset()
})

function fetchToys() {
  fetch(allToys)
  .then(resp => resp.json())
  .then(toysData => {
    toysData.map(toy => {
      buildToyCard(toy)
    })
    console.log(toysData)
  })
}

fetchToys()

function buildToyCard(toy){
  const div = document.createElement("div")
  div.classList.add("card")
  div.id = toy.id
  document.body.appendChild(div)

  const h2 = document.createElement("h2")
  h2.innerHTML = toy.name
  
  const img = document.createElement("img")
  img.src = toy.image
  img.classList.add("toy-avatar")

  const p = document.createElement("p")
  p.innerText = `${toy.likes} Likes`
  
  const btn = document.createElement("button")
  btn.classList.add("like-btn")
  btn.id = toy.id
  btn.innerText = "Like <3"
  
  div.append(h2, img, p, btn)
  toyCollection.append(div)

  btn.addEventListener("click", (event) => {
    incrementLikes(event)
  })
}

function postToy(toyData) {
  const newToyName = toyData.name.value
  const newToyImage = toyData.image.value

  const formData = {name: newToyName, image: newToyImage, likes: 0}

  const configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(formData)
  }

  fetch(allToys, configObj)
  .then(response => response.json())
  .then(object => buildToyCard(object))
}

function incrementLikes(event) {
  const likes = event.target.previousElementSibling.innerText
  let newLikes = parseInt(likes) + 1

  const configObj = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({likes: newLikes})
  }

  fetch(allToys + event.target.id, configObj)
  .then(response => response.json())
  .then(object => {
    event.target.previousElementSibling.innerText = `${newLikes} Likes`
  })
}
