const request       = require('request')

const fetchData     = () => {
    return new Promise((resolve, reject) => {
        const url       = 'https://www.boredapi.com/api/activity'

        request({url: url, json: true}, (error, response) => {
            if(error) {
                return reject('Unable to load the URL')
            }
            
            resolve(response.body.activity)
        })
    })
}

const doWork    = async () => {
    const activity = await fetchData()
    
    return activity
}

doWork().then((activity) => {
    console.log('1: ' + activity)
}).catch((e) => {
    console.log('Error', e)
})

doWork().then((activity) => {
    console.log('2: ' + activity)
}).catch((e) => {
    console.log(e)
})

doWork().then((activity) => {
    console.log('3: ' + activity)
}).catch((e) => {
    console.log(e)
})

console.log('ABC')