const path = require('path') // serving up static assets
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public') // only directory exposed by server
const viewsPath = path.join(__dirname,'../src/templates/views') // customizing views directory
const partialsPath = path.join(__dirname,'../src/templates/partials')

app.set('view engine','hbs') // setup handlebars engine
app.set('views',viewsPath) // setup views location
hbs.registerPartials(partialsPath) // configuration
app.use(express.static(publicDirectoryPath)) // setup static directory to serve

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Sruthi Murali'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Sruthi Murali'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Sruthi Murali '
    })
})

// building a json http endpoint
app.get('/weather', (req, res) => {

    // no address send back an error msg 
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => { // default fn. parameter
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Sruthi Murali',
        errorMessage: 'Help article not found.'
    })
})

app.get('/hello',(req,res) => {
    res.send('<h1>Hello Express!</h1>') 
})

//404 page error
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Sruthi Murali',
        errorMessage: 'Page not found.'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})

