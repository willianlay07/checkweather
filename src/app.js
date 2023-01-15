const path          = require('path')
const express       = require('express')
const hbs           = require('hbs')
const gecode        = require('./utils/gecode')
const forecast      = require('./utils/forecast')

const app           = express()
const port          = process.env.PORT || 3000

// Define Path for Express Config
const publicDirectory   = path.join(__dirname, '../public')
const viewsPath         = path.join(__dirname, '../templates/views')
const partialPath       = path.join(__dirname, '../templates/partials')

// Set up handler engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

// Set up static directory to serve
app.use(express.static(publicDirectory))

app.get('', (req, res) => {
    //res.send('Home Page')
    res.render('index', {
        title: 'Home',
        createdBy: 'Wai H. Hein'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About',
        createdBy: 'Wai H. Hein'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide the address!!!'
        })
    }
    
    gecode(req.query.address, (error, {latitude, longitude, locationName} = {}) => {
        if(error) {
            return res.send({
                error: error,
                forecast: '',
                locationName: '',
                address: ''
            })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({
                    error: error,
                    forecast: '',
                    locationName: '',
                    address: ''
                })
            }

            res.send({
                error: '',
                forecast: forecastData,
                locationName,
                address: req.query.address
            })
        })
    })
})

app.listen(port, () => {
    console.log('Server is on port ' + port)
})