const PORT = process.env.PORT || 3000
const express = require('express')
const app = express()


app.get('/', (request, response) => {
    response.send('Hello, world')
})


app.get('/date', (request, response) => {
    response.json({today: new Date()})
})


app.listen(PORT, () => console.log(`Listening for request on http://localhost:${PORT}`))