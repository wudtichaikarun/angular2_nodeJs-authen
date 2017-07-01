import express from 'express'
import fs from 'fs'
import bodyParser from 'body-parser'
//import cors from 'cors'
//import passport from 'passport'
//import mongoose from 'mongoose'

const config = require('./config/database');

//for call folder app
function setupRoutes(app){
    const APP_DIR = `${__dirname}/app`
    const features = fs.readdirSync(APP_DIR).filter(
        file => fs.statSync(`${APP_DIR}/${file}`).isDirectory()
    )

    features.forEach(feature => {
        const router = express.Router()
        const routes = require(`${APP_DIR}/${feature}/routes.js`)

        routes.setup(router)
        app.use(`/${feature}`, router)
    })
}

export function setup() {

    // // Connect To Database
    // mongoose.connect(config.database);
    // // On Connection
    // mongoose.connection.on('connected', () => {
    //     console.log('Connected to database ' + config.database);
    // });
    // // On Error
    // mongoose.connection.on('error', (err) => {
    //     console.log('Database error ' + err);
    // });

    const app = express()
    const port = 3000

    // app.use(cors())
    // app.use(express.static(path.join(__dirname, 'public')))
    app.use(bodyParser.urlencoded({  extended: true }))
    app.use(bodyParser.json());
    // app.use(passport.initialize());
    // app.use(passport.session());
    setupRoutes(app)
 
    // app.get('*', (req, res) =>{
    //     res.sendFile(path.join(__dirname, 'public/index.html'));
    // });

    // Start Server
    app.listen(port, () => {
        console.log("server start on port" + port);
    });

}
