let fs = require("fs");

let promise = fs.promises.readFile('f11.txt');
console.log("Before");

//if it is settled
promise.then(function(data){
    console.log("" + data);
})

//if rejected
promise.catch(function(err){
    console.log(err);
})

