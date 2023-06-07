const PORT = process.env.PORT || 3000
const express = require('express')
const app = express()


app.get('/', (request, response) => {
    response.send('Hello, world')
})


app.listen(PORT, () => `Listening for request on http://localhost:${PORT}`)