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
    getCompliment()
        .then(compliment => {
            res.render('home', {name: '', 
                                compliment: compliment, 
                                color: randomColor()})
        }
    )})

app.get('/:name', (req, res)=>{
    getCompliment()
        .then(compliment => {
            res.render('home', {name: req.params.name,
                                compliment: compliment, 
                                color: randomColor()})
        })
})


function getCompliment(){
    return axios.get('https://complimentr.com/api')
                .then((res)=>{
                    return res.data.compliment
                })
}

function randomColor(){
    var x = Math.floor(Math.random()*256)
    var y = Math.floor(Math.random()*256)
    var z = Math.floor(Math.random()*256)

    return {
        normal: `rgb(${x}, ${y}, ${z})`,
        inverted: `rgb(${Math.abs(x -256)}, ${Math.abs(y -256)}, ${Math.abs(z -256)})`
    }
}

