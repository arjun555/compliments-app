const express = require('express')
const app = express()
const axios = require('axios')
const logger = require('./logger')
const port = 8080;

// express config. Express knows what a 'view engine' is and we are setting the view engine to ejs
app.set('view engine', 'ejs')
app.use(logger)
app.use(express.static('public'))
app.listen(port, ()=>{
    console.log(`listening on port:${port}`)
})


app.get('/', (req, res)=>{
    axios.get('https://complimentr.com/api')
        .then((apiRes)=>{
            console.log(apiRes)
            res.render('home', {compliment: apiRes.data.compliment})
    })
})