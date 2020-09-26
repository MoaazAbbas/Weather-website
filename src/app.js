const path    = require("path") // to defind paths
const express = require("express")
const hbs     = require("hbs")
const axios   = require("axios")
const forecast = require("./utils/forecast")
const geoCode = require("./utils/geoCode")
const app     = express()

// Define paths for Express Config
const public       = path.join(__dirname,"../Public") // static path
const viewsPath    = path.join(__dirname,"../Templates/views")
const partialsPath = path.join(__dirname,'../templates/partials')

// setup handelbar engine and views location

app.set("view engine", "hbs");
app.set("views", viewsPath)
hbs.registerPartials(partialsPath)

// Define Public path

app.use(express.static(public)) // static 

// Routes

app.get("", (req, res) => {
    res.render("index", {
        title: "Weather App",
        name: "Moaaz Abbas"
    })
})

app.get("/about", (req, res) => {
    res.render("about",{
        title: "about Me",
        name:"Moaaz Abbas"
    })
})

app.get("/help",(req, res) => {
    res.render("help",{ 
        title: "help page",
        name:"Moaaz Abbas",
        message: "Do you need help?",
    })
})

app.get('/help/*', (req, res) => {
    res.render("404",{
        title: "404",
        message:"Help article was not found",
        name:"Moaaz Abbas"
    })
})

app.get("/weather", (req, res)=>{
    if(!req.query.address){
        return res.send({
            error: "You must provide an address"
        }) 
    }else{
        geoCode((req.query.address), (error, {latitude, longtude, location} = {}) => {
          if(error){
            return res.send({error})
          }
          forecast(latitude,longtude,(error, {temp, description}) => {
            if(error){
                return res.send("Error",error)
            }
                return res.send({
                    temp,
                    description,
                    location,
                    address: req.query.address
                }
          )})  
        })
      }
  })
    
app.get('*', (req, res) => {
    res.render("404",{
        message: "page is not found",
        name: "Moaaz Abbas",
        title: "404"
    })
})



app.listen(3000,()=>{
    console.log("server is up and running")
})