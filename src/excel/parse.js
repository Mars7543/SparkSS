const readXlsxFile  = require('read-excel-file/node')
const path          = require('path')

const xlsxPath = path.join(__dirname, '..', '..', 'public', 'assets', 'freshmanList.xlsx')
readXlsxFile(xlsxPath)
.then((rows) => {
    rows.forEach((row, index) => {
        if (index === 0 || index > 3) return // skip over headers row

        const [ academy, gender, name ]  = row
        const town = row[9]

        console.log(academy, gender, name, town)
    })
})
.catch((err) => {
    console.log(err)
})