const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geoforecastAPI = require('./Utils/utility')

const app = express()
const port = process.env.PORT || 3000

const publicPathDir = path.join(__dirname, '../public')
const viewTemplate = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine','hbs')
app.set('views',viewTemplate)
hbs.registerPartials(partialsPath)
app.use(express.static(publicPathDir))

app.get('',(req, res)=>{
    //res.send('Hello')
    res.render('',{
        title: 'Weather Forecast',
        name:'Gebre'
    })
})

app.get('/about',(req, res)=>{
    res.render('about',{
        title:'About',
        name: 'Gebre'
    })
})

app.get('/weather',(req, res)=>{

    geoforecastAPI((error, data) => {
        console.log(req.query)
        if (error) {
            console.log('Forecast Error:', error);
            res.status(500).send(error); // Send the error to the client
            return;
        }
        //console.log('Weather Data:', data);
        res.send(data); // Send the weather data to the client
    });
})
app.get('/help',(req, res)=>{
    res.render('help',{
        title: 'Help page',
        name:'Gebre Reda'
    })
})

app.get('/help/*',(req, res)=>{
    return res.send('Help page not found!!')
        
})

const { createProxyMiddleware } = require('http-proxy-middleware');


app.use('/api', createProxyMiddleware({
    target: 'http://puzzle.mead.io',
    changeOrigin: true,
    pathRewrite: {
        '^/api': '',
    },
}));
app.get('*',(req, res)=>{
    res.render('404',{
        title:'404',
        name: 'Gebre'
    })
})

app.listen(port,()=>{
    console.log('Server is up and running!!')
})