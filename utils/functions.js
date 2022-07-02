var fs = require('fs');

//Convertendo arquivo em binário
function base64_encode(filePath) {
    var bitmap = fs.readFileSync(filePath);
    return new Buffer(bitmap).toString('base64');
}

//Convertendo binario em arquivo
function base64_decode(base64str, fileName) {
    var bitmap = new Buffer(base64str, 'base64');
    fs.writeFileSync('src/temp/' + fileName + '', bitmap, 'binary', function (err) {
        if (err) {
            console.log('Conversao com erro');
        }
    });
}


module.exports = { base64_encode, base64_decode }