const PORT = process.env.PORT || 3000
const express = require('express')
const app = express()
const {countAllrequests} = require('./monitoring')

app.use(countAllrequests())

app.get('/', (request, response) => {
    response.send('Hello, world')
})


app.listen(PORT, () => console.log(`Listening for request on http://localhost:${PORT}`))