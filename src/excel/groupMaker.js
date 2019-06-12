const parse = require('./parse')
const path  = require('path')

const freshmanList  = path.join(__dirname, '..', '..', 'public', 'assets', 'freshmanList.xlsx')
const sparkList  = path.join(__dirname, '..', '..', 'public', 'assets', 'sparkLeaders.xlsx')

parse(freshmanList, 'Freshman')
.then((freshmen) => {
    console.log(freshmen)
})
.catch((e) => console.log(e))