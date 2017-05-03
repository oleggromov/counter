const express = require('express')
const app = express()

const port = process.env.NODE_ENV === 'production' ? 80 : 3000

app.get('/', (req, res) => {
  res.send('Counter 0.1')
})

app.listen(port, () => console.log(`Server is running on ${port}`))
