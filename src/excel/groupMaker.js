const { getFreshmen, getSparkLeaders } = require('./parse')
const { Student, Group } = require('./classes')

const makeGroups = async () => {
    try {
        const freshmen = await getFreshmen()
        const spark_leaders =  await getSparkLeaders()

        let total_freshman = 0
        Object.values(freshmen).forEach((academy) => {
            total_freshman += academy.length
        })

        const avg_group_size = total_freshman / spark_leaders.length
        let num_people_lower = Math.floor(avg_group_size)
        let num_people_higher = Math.ceil(avg_group_size)

        let num_higher_groups = Math.round(spark_leaders.length * (avg_group_size - num_people_lower))
        let num_lower_groups  = spark_leaders.length - num_higher_groups

        let groups = []

        for (let i = 0; i < spark_leaders.length; i++) {
            if (i < num_higher_groups)
                groups.push(new Group(num_people_higher, spark_leaders[i]))
            else 
                groups.push(new Group(num_people_lower, spark_leaders[i]))
        }

        let group_index = 0
        let students_on_hold = []
        Object.values(freshmen).forEach((academy) => {
            academy.forEach((student) => {
                let temp_group = groups[group_index]

                if (temp_group.checkEligibility(student)) {
                    groups[group_index].addStudent(student)
                    group_index = (++group_index) % spark_leaders.length
                } else {
                    let temp_index = group_index
                    let addable = true
                    while (!temp_group.checkEligibility(student)) {
                        group_index = (++group_index) % spark_leaders.length
                        temp_group = groups[group_index]

                        if (temp_index === group_index) { // if every group was checked --> add student to group with least # of students
                            // students_on_hold.push(student)
                            // addable = false
                            // break
                            for (let i = 0; i < groups.length; i++) 
                                if (groups[group_index].getSpace() < groups[i].getSpace())
                                    group_index = i
                            
                            break
                        }
                    }

                    if (addable) groups[group_index].addStudent(student)
                }
            })
        })

        // console.log(students_on_hold.length)
        groups.forEach((group) => {
            if (group.gender_disparity > 3) {
                console.log(`\n${group.leader.firstname + " " + group.leader.lastname}'s group:\n`)
                // console.log('\t' + group.male_count + " |  " + group.female_count)
                group.students.forEach((student) => {
                    console.log("\t" + student.academy + " | " + student.gender)
                })
            }
        })

    } catch (e) {
        console.log(e)
    }
}

makeGroups()