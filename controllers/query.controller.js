const VisitingDetails = require("../models/visitingDetails");
const Admin = require("../models/admin");
const Visitor = require("../models/visitor");
const Faculty = require("../models/faculty");
const ejs = require('ejs');
const pdf = require('html-pdf');


exports.sendQuery = (req, res) => {
    eval(req.body.function);
};

exports.generatePdf = (req, res) => {
    ejs.renderFile(__dirname + '/report-template.ejs', {
        json: JSON.parse(req.body.data)
    },
    (err, html) => {
        if(err) console.log(err);
        pdf.create(html).toFile('./report.pdf', (err, file) => {
            if(err) console.log(err);
            res.download(file);
        })
    }
    )
}