const express = require('express');
const cors = require('cors')



const app = express();

const PORT = 5000 || process.env.PORT;
const HOST = '0.0.0.0';

app.use(cors())

app.get('/', (req, res) => {
    const valor = Math.ceil(Math.random()*100);
    res.json({"valor_produto": valor})
})


app.listen(PORT, HOST);