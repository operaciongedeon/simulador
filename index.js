
const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const port = process.env.PORT || 8084;

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://dionnyfernandez:drC9uNqgcjHQHANk@cluster0.hgdvnya.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}
run().catch(console.dir);

app.get('/', function(req, res){
    const s ={
        "hola":"mundo"
    }
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.send(s);
})


app.post('/api/transacciones/agregar', function (req, res) {

    const msj = {
        "nroContrato": req.body.nroContrato,
        "tiposervicio":req.body.tiposervicio,
        "metodoPago":req.body.metodoPago,
         "ip": req.body.ip,
         "navegador": req.body.navegador,
         "marca": req.body.marca,
         "modelo": req.body.modelo,
         "version": req.body.version,
         "latitud": 37.422476,
         "longitud": 122.08425,
         "tipoOperacion": req.body.tipoOperacion,
         "cedula": req.body.cedula,
         "monto": req.body.monto,
         "banco": req.body.banco,
         "telefono": req.body.telefono,
         "referencia": req.body.referencia,
         "token": req.body.token,
         "nro_operacion":req.body.nro_operacion,
         "cliente_peticion":req.body.cliente_peticion
     }

    const factura = req.body.referencia;


    if (factura == "123456789") {
        let respuesta = enviar(msj)
        console.log(respuesta)
        var s = {
            "codigo": "00",
            "mensaje": "Operacion exitosa",
            "referencia": "1683397688294284"
        }
    } else {
        let respuesta = enviar(msj)
        console.log(respuesta)
        var s = {
            "codigo": "C1",
            "mensaje": "Ocurrio un error interno, intente mas tarde.",
            "referencia": "1683397688294283"
        }
    }

    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.send(s);
});


async function enviar(msj){
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("Gedeon").collection("Transacciones").insertOne(msj)
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}



app.listen(port);
console.log(`Server running en el puerto: ${port}`);

