const { Student, SparkStudent } = require('./classes')
const readXlsxFile              = require('read-excel-file/node')

module.exports = async (pathToFile, studentType) => {
    try {
        student_data = await readXlsxFile(pathToFile)
        
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
            if (index == 0 || index > 3) return // skip over headers row

            if (studentType === 'Freshman') {
                const [ academy, gender, name ] = student
                const [ lastName, firstName ] = name.split(', ')

                const address = student[8]
                const town = student[9]
                const zip = student[10]

                students[academy].push(new Student(academy, gender, firstName, lastName, address, town, zip))
            } else if (studentType === 'Spark Leader') {
                const [ academy, name, town, knownStudents ] = student
                const [ lastName, firstName ] = name.split(', ')

                if (knownStudents) {
                    tempStudents = []
                    knownStudents = knownStudents.split(':')
                    
                    knownStudents.forEach((freshman) => {
                        const [ freshman_lastName, freshman_firstName ] = freshman
                    })
                }

                // if (knownStudents)
                //     knownFreshmen = knownStudents.split(':')

                // if (typeof knownFreshmen !== 'undefined')
                //     console.log(knownFreshmen)

                students.push(new SparkStudent(academy, firstName, lastName, town, null))
            }
        })

        return students
    } catch (e) {
        throw new Error(e)
    }
}