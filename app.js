let kittens = []

// kitten.state can also be "angry" or "happy"

function addKitten(event) {
    event.preventDefault()
    let form = event.target

    let kitten = {
        mood: "tolerant",
        id: generateId(),
        name: form.name.value,
        affection: 0.5
    }
    kittens.push(kitten)
    saveKittens()
    form.reset()
}

function saveKittens() {
    let kittensJSON = JSON.stringify(kittens)
    console.log(kittensJSON)
    window.localStorage.setItem("kittens", kittensJSON)
    drawKittens()
}

function loadKittens() {
    let storedKittens = JSON.parse(window.localStorage.getItem("kittens"))
    console.log(storedKittens)
    if (storedKittens) {
        kittens = storedKittens
    }
    drawKittens()
}

function drawKittens() {
    let kittensElement = document.getElementById("kittens")
    let kittensTemplate = ""
    kittens.forEach(kitten => {
        kittensTemplate += `
        <div class="kitten ${kitten.mood}">
                    <i aria-hidden="true"></i>
                    <div class="card p-2 text-center w-50">
                        <img src="moody-logo.png" alt="kitten">
                        <p>${kitten.name}</p>
                        <button onclick="pet(event)" data-id="${kitten.id}">Pet</button>
                        <button onclick="catnip(event)" data-id="${kitten.id}">Give Catnip</button>
                    </div>
                </div>
            `
    })
    kittensElement.innerHTML = kittensTemplate
}

function findKittenById(id) {
    const kitten = kittens.find(kitten => kitten.id === id)
    return kitten
}

function pet(event) {
    event.preventDefault()
    const target = event.target
    let id = target.dataset.id

    let kitten = findKittenById(id)
    const affection = Math.random()
    console.log(affection)
    kitten.affection = affection
    console.log(kitten)

    kitten = setKittenMood(kitten)
    console.log(kitten)
    saveKitten(kitten)
    saveKittens()
    drawKittens()
}

function saveKitten(kitten) {
    // update an existing kitten in the kittens array
    const kittenIndex = kittens.findIndex(kitten1 => kitten1.id === kitten.id)
    kittens.splice(kittenIndex, 1, kitten)
}

function catnip(event) {
    event.preventDefault()
    const target = event.target
    let id = target.dataset.id


    console.log("looking for kitten with id: " + id)

    let kitten = findKittenById(id)
    kitten.affection = 1
    kitten = setKittenMood(kitten)
    saveKitten(kitten)
    saveKittens()
    drawKittens()
}

function setKittenMood(kitten) {
    if (kitten.affection > 0.65) {
        kitten.mood = "happy"
    } else if (kitten.affection > 3.5 && kitten.affection < 6.5) {
        kitten.mood = "tolerant"
    } else {
        kitten.mood = "angry"
    }
    return kitten
}

function clearKittens(kittenId) {
    let index = kittens.findIndex(kittens => kittens.id == kittenId)
    kittens.splice(0,kittens.length)
    saveKittens()
}

function getStarted() {
    document.getElementById("welcome").remove()
    document.getElementById("kittens").classList.remove("hidden")
}

function generateId() {
    return Math.floor(Math.random() * 10000000) + "-" + Math.floor(Math.random() * 10000000)
}

loadKittens()