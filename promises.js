const doWorkPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        // resolve([, 4,1])
        reject('Things went wrong !')
    }, 2000)
})

doWorkPromise.then((result) => {
    console.log('success !', result)
}).catch((error) => {
    console.log('Error !', error)
})
