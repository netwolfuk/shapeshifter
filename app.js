const express = require('express')
const app = express()

app.use(express.static('public'))
app.use('/js', express.static('src'))
app.use('/test', express.static('test'))
app.use('/docs', express.static('docs'))

app.listen(9000, () => console.log('Example app listening on port 9000!'))
