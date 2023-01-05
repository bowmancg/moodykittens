let kittens = []

function addKitten(event) {
    event.preventDefault()
    let form = event.target

    let kitten = {
        id: generateId(),
        name: form.name.value,

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
}

function drawKittens() {
    let kittensElement = document.getElementById("kittens")
    let kittensTemplate = ""
    kittens.forEach(kitten => {
        kittensTemplate += `
        <div class="card mt-1 mb-1">
                <h3 class="mt-1 mb-1">${kitten.name}</h3>
                <div class="d-flex space-between">
                    <p>
                    <i class="fa fa-fw fa-phone"></i>
                    <span>${kitten.id}</span>
                    </p>
                    <i class="action fa fa-trash text-danger" onclick="removeContact('${kitten.id}')"></i>
                </div>
            </div>
            `
    })
    kittensElement.innerHTML = kittensTemplate
}

function findKittenbyId(id) {

}

function pet(id) {

}

function catnip(id) {

}

function setKittenMood(kitten) {

}

function clearKittens() {

}

function getStarted() {
    document.getElementById("welcome").remove()
}

function generateId() {
    return Math.floor(Math.random() * 10000000) + "-" + Math.floor(Math.random() * 10000000)
}

loadKittens()