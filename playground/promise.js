var asyncAdd = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (typeof (a) === 'number' && typeof (b) === 'number')
                resolve(a + b);
            else {
                reject('Arguments should be numbers');
            }
        }, 1500);
    });
};

// var sPromise = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         //resolve('Hey! It worked');
//         reject('Unable to fulfill promise');
//     }, 2500);
// });
// sPromise.then((message) => {
//     console.log('Success: ' + message);
// }, (errorMessage) => {
//     console.log('errorMessage: ', errorMessage);

// })

// asyncAdd(5, 6).then(sum => {
//     console.log('sum: ', sum);

// }, (errorMessage) => {
//     console.log(errorMessage);
// });