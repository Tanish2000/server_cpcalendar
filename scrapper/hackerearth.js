

let runPy = new Promise(function (success, nosuccess) {

    const { spawn } = require('child_process');
    const pyprog = spawn('python', ['./hackerearth.py']);

    pyprog.stdout.on('data', function (data) {

        success(data);
    });

    pyprog.stderr.on('data', (data) => {

        nosuccess(data);
    });
});

module.exports = runPy;

