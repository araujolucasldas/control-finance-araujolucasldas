function handleModal(){
    const button = document.querySelector("#showMessage")
    const modalController = document.querySelector(".modal__controller")

    button.addEventListener("click", () => {
        modalController.showModal()

        closeModal()
    })
}

function closeModal(){
    const buttonClose = document.querySelector(".modal__close")
    const buttonCancel = document.querySelector(".button--cancel")
    const modalController = document.querySelector(".modal__controller")

    buttonClose.addEventListener("click", () =>{
        modalController.close()
    })

    buttonCancel.addEventListener("click", () =>{
        modalController.close()
    })
}

handleModal()
