const express = require('express')
const app = express()

const PORT = 35000

app.use('/',(req,res)=>{
    res.send('route working')
    
})

app.listen(PORT,()=>{
    console.log(`App is listening at PORT:${PORT}`)
})