var http = require('http');
var fs = require('fs');
var path = require('path');
var htmlPdf = require('html-pdf');
var MushtacheModule = require('mustache');
const express = require('express');
var app= express()

const PORT=8000;

app.get('/', function(req, res) {
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, _run_calcfields");
    res.sendFile(path.join(__dirname + '/index.html'));
});
app.use('/node_modules/', express.static(__dirname + '/node_modules/'));
app.use('/templates/', express.static(__dirname + '/templates/'));
app.use('/scripts/', express.static(__dirname + '/scripts/'));
app.use('/',express.static(__dirname));
app.listen(PORT);
console.log('SERVER Stared at port:8000, running ......');





//            case 'receiving':
// htmlContent = MushtacheModule.render(receivingReceiptTemplate.templateStructure, receivingReceiptTemplate.templateData);
// break;
// case 'packing':
// htmlContent = MushtacheModule.render(packingSlipTemplate.templateStructure, packingSlipTemplate.templateData);
// break;
// case 'commercial':
// htmlContent = MushtacheModule.render(commercialSlipTemplate.templateStructure, commercialSlipTemplate.templateData);
// break;