const makeGroups    = require('./groupMaker')
const { table }     = require('table')  
// const table         = require('table')

const outputGroups = async () => {
    try {
        let groups = await makeGroups()

        groups.forEach((group, index) => {
            leader = [[`${group.leader.firstname} ${group.leader.lastname}'s Group:`]]
            students = []
            group.students.forEach((student) => {
                students.push([student.firstname + " " + student.lastname, student.academy, student.gender.slice(0, 1)])
            })

            console.log(table(leader) + table(students))
            console.log()
        })
    } catch (e) {
        console.log(e)
    }
}

outputGroups()