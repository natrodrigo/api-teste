const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')


const db = [
    {
        "code": "0F1",
        "deposito": 1,
        "valor": 10.74,
        "estoque": 80
    },
    {
        "code": "0F2",
        "deposito": 1,
        "valor": 25.14,
        "estoque": 250
    },
    {
        "code": "0F3",
        "deposito": 1,
        "valor": 57.12,
        "estoque": 36
    },
    {
        "code": "0F4",
        "deposito": 1,
        "valor": 56.20,
        "estoque": 45
    },
    {
        "code": "0F5",
        "deposito": 1,
        "valor": 55,
        "estoque": 100
    },
    {
        "code": "0F6",
        "deposito": 1,
        "valor": 75.98,
        "estoque": 25
    },
    {
        "code": "0F7",
        "deposito": 1,
        "valor": 152.70,
        "estoque": 450
    },
    {
        "code": "0F8",
        "deposito": 1,
        "valor": 58.1,
        "estoque": 2
    },
    {
        "code": "0F9",
        "deposito": 1,
        "valor": 95.45,
        "estoque": 100
    },
    {
        "code": "0F10",
        "deposito": 1,
        "valor": 25.6,
        "estoque": 52
    },
    {
        "code": "0F11",
        "deposito": 1,
        "valor": 54.36,
        "estoque": 90
    },
    {
        "code": "0F12",
        "deposito": 1,
        "valor": 92.67,
        "estoque": 445
    },
    {
        "code": "0F13",
        "deposito": 1,
        "valor": 85.60,
        "estoque": 60
    },
    {
        "code": "0F14",
        "deposito": 1,
        "valor": 1.50,
        "estoque": 10
    },
    {
        "code": "0F1",
        "deposito": 2,
        "valor": 8.45,
        "estoque": 1000
    },
    {
        "code": "0F2",
        "deposito": 2,
        "valor": 6.90,
        "estoque": 500
    },
    {
        "code": "0F3",
        "deposito": 2,
        "valor": 58.40,
        "estoque": 6000
    },
    {
        "code": "0F4",
        "deposito": 2,
        "valor": 69.45,
        "estoque": 8450
    },
    {
        "code": "0F5",
        "deposito": 2,
        "valor": 58.10,
        "estoque": 1000
    },
    {
        "code": "0F6",
        "deposito": 2,
        "valor": 75.11,
        "estoque": 2451
    },
    {
        "code": "0F7",
        "deposito": 2,
        "valor": 91,
        "estoque": 6652
    },
    {
        "code": "0F8",
        "deposito": 2,
        "valor": 57.20,
        "estoque": 5181
    },
    {
        "code": "0F9",
        "deposito": 2,
        "valor": 65.10,
        "estoque": 4514
    },
    {
        "code": "0F10",
        "deposito": 2,
        "valor": 57.4,
        "estoque": 8812
    },
    {
        "code": "0F11",
        "deposito": 2,
        "valor": 81.20,
        "estoque": 821
    },
    {
        "code": "0F12",
        "deposito": 2,
        "valor": 205.70,
        "estoque": 8451
    },
    {
        "code": "0F13",
        "deposito": 2,
        "valor": 63.80,
        "estoque": 7841
    },
    {
        "code": "0F14",
        "deposito": 2,
        "valor": 72.70,
        "estoque": 4115
    },
]

const jsonParser = bodyParser.json();

const app = express();

const PORT = 5000 || process.env.PORT;
const HOST = '0.0.0.0';

app.use(cors())

app.get('/prices/', (req, res) => {

    let item = db.filter((item)=>{
        return (item.code == req.query.code && item.deposito == req.query.deposito)
    })

    if(item.length != 0){
        res.json({
            "sucesso": "Sim",
            "valor_produto": item[0].valor,
            "estoque": item[0].estoque
        })
    }

    else{
        res.json({
            "sucesso": "Não",
            "valor_produto": 0,
            "estoque":0
        })
    }
})

app.post('/estoque/', jsonParser,(req, res) => {

    let item = db.filter((item)=>{
        return (item.code == req.body.code && item.deposito == req.body.deposito)
    })

    if(item.length != 0){
        res.json({
            "sucesso": "Sim",
            "estoque": item[0].estoque
        })
    }

    else{
        res.json({
            "sucesso": "Não",
            "estoque":0
        })
    }
})
app.listen(PORT, HOST);