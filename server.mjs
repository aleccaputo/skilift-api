import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
const app = express();
import {db} from "./config/db";
import {routes} from "./app/routes";
const port = 8000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const uri = db.url;
mongoose.connect(uri, {useNewUrlParser: true});
const skilift = mongoose.connection;
skilift.on('error', console.error.bind(console, 'connection error:'));
skilift.once('open', () => {
    routes(app, skilift);
    app.listen(port, () => {
        console.log('We are live on ' + port);
    });
});

