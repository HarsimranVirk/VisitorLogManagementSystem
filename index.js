const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const https = require('https');
const fs = require('fs');
require('dotenv').config();

const visitor = require('./routes/visitor.route');
const faculty = require('./routes/faculty.route');
const visitingDetails = require('./routes/visitingDetails.route');
const admin = require('./routes/admin.route');
const query = require('./routes/query.route');

const options = {
    key: fs.readFileSync("rootSSL.key"),
    cert: fs.readFileSync("rootSSL.pem"),
    passphrase: "carmelconvent"
};

const mongoDB = process.env.MONGODB_URL;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("DB Connected"))
    .catch((error) => console.log(error));

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB Connection Error:'));
const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

app.use('/api/visitor', visitor);
app.use('/api/faculty', faculty);
app.use('/api/dashboard', visitingDetails);
app.use('/api/admin', admin);
app.use('/api/query', query);

app.set('view engine', 'ejs');
app.use(express.static('client/build'));

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, "client/build/index.html"));
});

const httpsServer = https.createServer(options, app);
const port = process.env.PORT || 5000;

httpsServer.listen(port);