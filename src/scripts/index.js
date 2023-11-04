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
        valueSum (insertedValues)

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

renderElements(insertedValues)

function addInputValue(parameter){
    const submitButton = document.querySelector(".button--insert")
    const typeEntrada = document.querySelector("#entrada")
        const typeSaida = document.querySelector("#saida")
        let inputType 

        typeEntrada.addEventListener("click",()=>{
            inputType = 0
        })

        typeSaida.addEventListener("click",()=>{
            inputType = 1
        })   

    submitButton.addEventListener("click", (event)=>{
        event.preventDefault()
     

        const inputValue = document.querySelector(".modal__input")
        const newValue = {
            id: parameter.length +1,
            value: Number (inputValue.value),
            categoryID: inputType,
          }

    parameter.push(newValue)
    valueSum (parameter)
    renderElements(parameter)

    })
}
addInputValue(insertedValues)

function valueSum (insertedValues){
    const sum = document.querySelector(".sum-area__number")

    const result = insertedValues.reduce((acc, cur) => {
        return acc + cur.value
      }, 0);

    sum.innerText = `R$ ${result.toFixed(2)}`
}

valueSum(insertedValues)

function filterByType (insertedValues){
    const buttonsContainer = document.querySelector(".filter-area__buttons-container")
    const buttonEntrada = document.querySelector("#entradas")
    const buttonSaida = document.querySelector("#saidas")
    const buttonTodos = document.querySelector("#todos")

    buttonsContainer.addEventListener("click", (event)=>{

        if(event.target == buttonEntrada){
            const valuesByType = insertedValues.filter((currentValue)=> currentValue.categoryID == 0)
            renderElements(valuesByType)
            valueSum(valuesByType)

        }
        else if(event.target == buttonSaida){
            const valuesByType = insertedValues.filter((currentValue)=> currentValue.categoryID == 1)
            renderElements(valuesByType)
            valueSum(valuesByType)

        }else if(event.target == buttonTodos){
            const valuesByType = insertedValues
            renderElements(valuesByType)
            valueSum(valuesByType)
        }
    })
}
filterByType(insertedValues)
