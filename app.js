const express = require('express');
const cors = require('cors')
const path = require('path');


const app = express();
app.use(express.static(__dirname));

const PORT = 5000 || process.env.PORT;
const HOST = '0.0.0.0';

app.use(cors())

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname+"/index.html"))
})


app.listen(PORT, HOST);