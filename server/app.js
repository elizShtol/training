const express = require('express')
const config = require('config')
const path = require('path')
const util = require('util');
const fs = require('fs');
const mongoose = require("mongoose");
const User = require("./models/User");
require('dotenv').config()
const MongoClient = require('mongodb').MongoClient;
const app = express()
const PORT = config.get('port') || 5000

app.use(express.json({extended:true}))

app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/trainings', require('./routes/training.routes'))


if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, '../client', 'build')))
  
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'))
    })
  }

async function start() {
    try {
        const options = {
            useNewUrlParser: true,
            sslCA: fs.readFileSync(
                    config.get("mongoCertPath")),
            useUnifiedTopology: true,
            useCreateIndex: true,
        }

        await mongoose.connect(config.get("mongoUri"), options);
    } catch (e) {
        console.log('Server Error', e.message)
        process.exit(1)
    }
}
start()
app.listen(PORT, () => console.log(PORT,'Server startanul',PORT))