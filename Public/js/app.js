const form        = document.querySelector("form");
const search      = document.querySelector("input");
const mainContent = document.querySelector(".main-content")
const firstMsg    = document.createElement("p")
const secMsg      = document.createElement("p")

mainContent.appendChild(firstMsg)
mainContent.appendChild(secMsg)

form.addEventListener("submit", (e) =>{
    e.preventDefault()
    const location = search.value 
    fetchData(location)
})


const fetchData = (address) =>{
    const response = axios.get("http://localhost:3000/weather?address="+address)
    .then((response) =>{
        // const data = response.data;
        // const {timezone,address, temp, location} = data
        if (response.data.error){
            firstMsg.textContent = response.data.error
        }else
        firstMsg.textContent   = response.data.temp
        secMsg.textContent     = response.data.description
    
    })
} 


