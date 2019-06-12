const { Student, SparkStudent } = require('./classes')
const readXlsxFile              = require('read-excel-file/node')

const path  = require('path')
const freshmanList  = path.join(__dirname, '..', '..', 'public', 'assets', 'freshmanList.xlsx')
const sparkList  = path.join(__dirname, '..', '..', 'public', 'assets', 'sparkLeaders.xlsx')

module.exports.getFreshmen = async () => {
    try {
        student_data = await readXlsxFile(freshmanList)
        students = {
            'ATCS': [],
            'AMST': [],
            'ABFIB': [],
            'AAST': [],
            'AEDT': [],
            'ACHA': [],
            'AVPA/T': [],
            'AVPA/M': [],
            'AVPA/V': []
        }

        student_data.forEach((student, index) => {            
            if (index == 0) return // skip over headers row

            const [ academy, gender, name ] = student
            const [ lastName, firstName ] = name.split(', ')

            const address = student[8]
            const town = student[9]
            const zip = student[10]

            students[academy].push(new Student(academy, gender, firstName, lastName, address, town, zip))
        })

        return students
    } catch (e) {
        throw new Error(e)
    }
}

module.exports.getSparkLeaders = async () => {
    try {
        student_data = await readXlsxFile(sparkList)
        students = []

        student_data.forEach((student, index) => {            
            if (index == 0) return // skip over headers row

            const [ academy, name, town ]   = student
            const [ lastName, firstName ]   = name.split(', ')
            let knownStudents               = student[3]

            if (knownStudents) {
                tempStudents = []
                knownStudents.split(':').forEach((freshman) => {
                    const [ freshman_lastName, freshman_firstName ] = freshman.split(',')
                    tempStudents.push(new Student(null, null, freshman_firstName, freshman_lastName, null, null, null))
                })

                knownStudents = tempStudents
            }

            students.push(new SparkStudent(academy, firstName, lastName, town, knownStudents))
        })

        return students
    } catch (e) {
        throw new Error(e)
    }
}