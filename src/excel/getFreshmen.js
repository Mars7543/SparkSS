const { Student }   = require('./classes')
const readXlsxFile  = require('read-excel-file/node')
const path          = require('path')
const freshmanList  = path.join(__dirname, '..', '..', 'public', 'assets', 'freshmanList.xlsx')

module.exports = async () => {
    try {
        freshmen_data = await readXlsxFile(freshmanList)
        freshmen = []

        freshmen_data.forEach((freshman, index) => {
            if (index == 0 || index > 3) return // skip over headers row

            const [ academy, gender, name ] = freshman
            const [ lastName, firstName ] = name.split(', ')

            const address = freshman[8]
            const town = freshman[9]
            const zip = freshman[10]

            freshmen.push(new Student(academy, gender, firstName, lastName, address, town, zip))
        })

        return freshmen
    } catch (e) {
        throw new Error(e)
    }
}