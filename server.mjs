import express from 'express';
import MongoClient from 'mongodb';
import bodyParser from 'body-parser';
const app = express();
import {db} from "./config/db";
import {routes} from "./app/routes";
const port = 8000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const uri = db.url;
MongoClient.connect(uri, (err, database) => {
    if (err) return console.log(err);
    // Make sure you add the database name and not the collection name
    const skilift = database.db("skilift");
    routes(app, skilift);
    app.listen(port, () => {
        console.log('We are live on ' + port);
    });
});
