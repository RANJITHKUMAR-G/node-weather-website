const express = require('express')
const path = require('path')
const hbs = require('hbs')
const request = require('request')
const geoCode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// console.log(path.join(__dirname,'../public'))
const app = express()

const port = process.env.PORT || 3000;

//Define path for express config
const pubDirPath = path.join(__dirname,'../public')
const viewsDirPath = path.join(__dirname, '../templates/views')
const partialsDirPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and view location
app.set('view engine', 'hbs')
app.set('views',viewsDirPath);
hbs.registerPartials(partialsDirPath)

//setup static directory
app.use(express.static(pubDirPath))

app.get('',(req, res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Ranjith'
    })
})

app.get('/about',(req, res)=>{
    res.render('about',{
        title:'About Me',
        name:'Ranjith'
    })
})

app.get('/help',(req, res)=>{
    res.render('help',{
        title:'Help',
        name:'Ranjith',
        message:'This is a help page'
    })
})

app.get('/weather',(req, res)=>{
    if(!req.query.address){
        return res.send({
            error:'You must provide an address'
        })
    }
    geoCode(req.query.address,(error,data)=>{
        if(error){
            return res.send({error})
        }
        forecast(data.latitude,data.longtitude,(error,forecastData)=>{
            if(error){
                return res.send({error})
            }
            console.log('Location is: ',data.location)
            console.log('Data: ',forecastData)
            res.send({
                forecast: forecastData,
                location: data.location,
                address:req.query.address
            })
        })
    })
})


//http://localhost:3000/products?search=games&rating=5
app.get('/products',(req, res)=>{
    if(!req.query.search){
        return res.send({
            error:'You must provide a search value!'
        })
    }
    console.log(req.query)
    res.send({
        products:[]
    })
})

app.get('/help/*',(req, res)=>{
    res.render('404',{
        title:'Error',
        name:'Ranjith',
        errorMsg:'Help article not found'
    })
})

app.get('*',(req, res)=>{
    res.render('404',{
        title:'Error',
        name:'Ranjith',
        errorMsg:'Page not found'
    })
})

// app.get('/help',(req, res)=>{
//     res.send([
//         {
//         name:'Ranjith',
//         age:23
//         },
//         {
//             name:'Sabya',
//             age:23
//         }
// ])
// })

// app.get('/about',(req, res)=>{
//     res.send('<h1>About</h1>')
// })

app.get('/home',(req, res)=>{
    res.send('Home Page')
})

app.listen(port,()=>{
    console.log('Server is up!')
})