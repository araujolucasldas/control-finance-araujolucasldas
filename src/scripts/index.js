import { insertedValues, valuesCategory} from "./valuesDatabase.js"

function createNewRegister(values){
    const liElement = document.createElement("li")
    const pElement = document.createElement("p")
    const divElement = document.createElement("div")
    const spanElement = document.createElement("span")
    const buttonElement = document.createElement("button")

    liElement.append(pElement, divElement)
    divElement.append(spanElement,buttonElement)

    liElement.classList.add("item__list")
    pElement.classList.add("item__text")
    divElement.classList.add("item__contents")
    spanElement.classList.add("item__status")
    buttonElement.classList.add("item__remove")
    
    const priceValue = values.value.toFixed(2)
    pElement.innerText = `R$ ${priceValue}`

    if(values.categoryID == 0){
        spanElement.innerText = "Entrada"
    }
    else if(values.categoryID == 1){
        spanElement.innerText = "Saída"
    }

    buttonElement.addEventListener("click", ()=>{
        const index = insertedValues.indexOf(values)
        insertedValues.splice(index,1)
        renderElements(insertedValues)
    })

    return liElement
}

function renderElements(parameter){
    const ulElement = document.querySelector("ul")

    ulElement.innerHTML = ""

    const mapElements = parameter.forEach(currentValue => {
        const card = createNewRegister(currentValue)      
        ulElement.appendChild(card)  
    });

    return ulElement
}

console.log(renderElements(insertedValues))

function addInputValue(parameter, category){
    const form = document.querySelector(".modal__container")

    form.addEventListener("submit", (event)=>{
        event.preventDefault()

        const typeEntrada = document.querySelector("#entrada")
        const typeSaida = document.querySelector("#saida")
        let inputType 

        typeEntrada.addEventListener("click",()=>{
            inputType = category[0]
            console.log(category[0])
        })

        typeSaida.addEventListener("click",()=>{
            inputType = category[1]
            console.log(category[1])
        })        

        const inputValue = document.querySelector(".modal__input")
        const newValue = {
            id: parameter.length +1,
            value: Number (inputValue.value),
            categoryID: inputType,
          }

    parameter.push(newValue)
    console.log(newValue)
    renderElements(parameter)

    })
}
addInputValue(insertedValues, valuesCategory)