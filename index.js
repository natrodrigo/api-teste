const express = require('express');
const cors = require('cors');
const axios = require('axios')
const bodyParser = require('body-parser')
const path = require('path');

const db = [
    {
        "code": "P01",
        "deposito": 1,
        "valor": 10.74,
        "estoque": 80
    },
    {
        "code": "P02",
        "deposito": 1,
        "valor": 25.14,
        "estoque": 250
    },
    {
        "code": "P03",
        "deposito": 1,
        "valor": 57.12,
        "estoque": 36
    },
    {
        "code": "P04",
        "deposito": 1,
        "valor": 56.20,
        "estoque": 45
    },
    {
        "code": "P05",
        "deposito": 1,
        "valor": 55,
        "estoque": 100
    },
    {
        "code": "P06",
        "deposito": 1,
        "valor": 75.98,
        "estoque": 25
    },
    {
        "code": "P07",
        "deposito": 1,
        "valor": 152.70,
        "estoque": 450
    },
    {
        "code": "P08",
        "deposito": 1,
        "valor": 58.1,
        "estoque": 2
    },
    {
        "code": "P09",
        "deposito": 1,
        "valor": 95.45,
        "estoque": 100
    },
    {
        "code": "P10",
        "deposito": 1,
        "valor": 25.6,
        "estoque": 52
    },
    {
        "code": "P11",
        "deposito": 1,
        "valor": 54.36,
        "estoque": 90
    },
    {
        "code": "P12",
        "deposito": 1,
        "valor": 92.67,
        "estoque": 445
    },
    {
        "code": "P13",
        "deposito": 1,
        "valor": 85.60,
        "estoque": 60
    },
    {
        "code": "P14",
        "deposito": 1,
        "valor": 1.50,
        "estoque": 10
    },
    {
        "code": "P01",
        "deposito": 2,
        "valor": 8.45,
        "estoque": 1000
    },
    {
        "code": "P02",
        "deposito": 2,
        "valor": 6.90,
        "estoque": 500
    },
    {
        "code": "P03",
        "deposito": 2,
        "valor": 58.40,
        "estoque": 6000
    },
    {
        "code": "P04",
        "deposito": 2,
        "valor": 69.45,
        "estoque": 8450
    },
    {
        "code": "P05",
        "deposito": 2,
        "valor": 58.10,
        "estoque": 1000
    },
    {
        "code": "P06",
        "deposito": 2,
        "valor": 75.11,
        "estoque": 2451
    },
    {
        "code": "P07",
        "deposito": 2,
        "valor": 91,
        "estoque": 6652
    },
    {
        "code": "P08",
        "deposito": 2,
        "valor": 57.20,
        "estoque": 100
    },
    {
        "code": "P09",
        "deposito": 2,
        "valor": 65.10,
        "estoque": 4514
    },
    {
        "code": "P10",
        "deposito": 2,
        "valor": 57.4,
        "estoque": 8812
    },
    {
        "code": "P11",
        "deposito": 2,
        "valor": 81.20,
        "estoque": 821
    },
    {
        "code": "P12",
        "deposito": 2,
        "valor": 205.70,
        "estoque": 8451
    },
    {
        "code": "P13",
        "deposito": 2,
        "valor": 63.80,
        "estoque": 7841
    },
    {
        "code": "P14",
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
app.use(express.static(__dirname));
app.use(express.urlencoded());


app.get('/', (req, res) => {


    
    res.json({ "status": "Ok!" })


})

app.get('/prices/', (req, res) => {
    console.log(req.query)



    let itens = db.filter((item) => {
        return (item.code == req.query.code && item.deposito == req.query.deposito)
    })

    if (!req.query.client_code) {
        res.json({
            "sucesso": "Não",
            "valor_produto": 0,
            "estoque": 0
        })
    }

    else if (itens.length != 0) {
        res.json({
            "sucesso": "Sim",
            "price": itens[0].valor,
            "estoque": itens[0].estoque
        })
    }

    else {
        res.json({
            "sucesso": "Não",
            "valor_produto": 0,
            "estoque": 0
        })
    }
})

app.post('/estoque/', jsonParser, (req, res) => {

    let itens = db.filter((item) => {
        return (item.code == req.body.code && item.deposito == req.body.deposito)
    })

    if (itens.length != 0) {
        res.json({
            "sucesso": "Sim",
            "estoque": itens[0].estoque
        })
    }

    else {
        res.json({
            "sucesso": "Não",
            "estoque": 0
        })
    }
})
app.get('/create-contact/', (req, res) => {

    res.sendFile(path.join(__dirname + "/form.html"))
})

app.post('/create-contact/', jsonParser, (req, res) => {
    console.log(req.body)

    const client = {
        "Name": req.body.name,
        "TypeId": 1,
        "CNPJ": req.body.cnpj,
        "Phones": [
            {
                "PhoneNumber": req.body.tel,
                "TypeId": 1,
                "CountryId": 76
            },

        ],
        "OtherProperties": [{ FieldKey: "contact_955844D2-3A14-4EA6-B223-962FF575F25A", StringValue: req.body.code }]
    }

    const options = {
        headers: {
            "Content-Type": "application/json",
            "User-Key": "576CB9A7DDA11D3AB616AC6E2C35BE48BD91ED2B0A7635C6533E46819E6D65725463DB62EEC6C9041C5FA8977A6E1FC28DB806B820ECC147ADC29163271631F2"
        }
    }

    async function criarCliente() {
        axios.post('https://public-api2.ploomes.com/Contacts', client, options)
            .then((response) => {
                console.log(response.status)
                res.send(`
                    <h1>Cliente Criado!</h1>
                    <a href='/create-contact'>Clique aqui para voltar</a>
                `)
            }

            )
            .catch((error) => {
                res.send(`<h1>Erro ao criar cliente. (${error})</h1>
                <a href='/create-contact'>Clique aqui para voltar</a>`)
            })


    }

    criarCliente();
})
app.listen(PORT, HOST);