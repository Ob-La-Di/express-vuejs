var spawn = require("child_process").spawn;


module.exports = function () {

    return new Promise(function(resolve, reject) {
        var pythonProcess = spawn('python2', [__dirname + '/script.py']);

        pythonProcess.stdout.on('data',function(chunk){

            var textChunk = chunk.toString('utf8');

            resolve(textChunk);
            
        });

        pythonProcess.stdout.on('error', reject);
    });
};
