const { getFreshmen, getSparkLeaders } = require('./parse')
const { Group } = require('./classes')

module.exports = async () => {
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
        Object.values(freshmen).forEach((academy) => {
            academy.forEach((student) => {
                let current_group = groups[group_index]

                // if eligible add student and increment group
                if (current_group.checkEligibility(student)) {
                    groups[group_index].addStudent(student)
                    group_index = (++group_index) % groups.length
                } else {
                    /**
                     * loop until finding an eligible group
                     * if every group was checked, then only check for gender eligible (no great gender disparity if the student joined)
                     * if no gender eligible groups were found just add to group with least # of ppl
                     */
                    let marked_index = group_index 
                    while (!current_group.checkEligibility(student)) { 
                        group_index = (++group_index) % groups.length
                        
                        if (marked_index === group_index) {
                            let found_gender_eligible_group = false
                            let smallest_group_index = 0
                            for (let i = 0; i < groups.length; i++) { 
                                if (groups[i].hasSpace() && groups[i].getSpace() > groups[group_index].getSpace()) {
                                    smallest_group_index = i

                                    const male_eligible = student.gender === 'Male' && (groups[i].male_count <= groups[i].female_count)
                                    const female_eligible = student.gender === 'Female' && (groups[i].female_count <= groups[i].male_count)
                                    
                                    if (male_eligible || female_eligible) {
                                        group_index = i
                                        found_gender_eligible_group = true
                                    }
                                }
                            }

                            if (!found_gender_eligible_group) group_index = smallest_group_index 

                            // if the group doesn't have space find the first one that does
                            if (!groups[group_index].hasSpace()) 
                                for (let i = 0; i < groups.length; i++)
                                    if (groups[i].hasSpace())
                                        group_index = i
                                
                            break
                        }
                    }

                    groups[group_index].addStudent(student)
                }
            })
        })

        return groups
    } catch (e) {
        console.log(e)
    }
}

// groups.forEach((group) => {
//     if (group.gender_disparity > 3) {
//         console.log(`\n${group.leader.firstname + " " + group.leader.lastname}'s group:\n`)
//         // console.log('\t' + group.male_count + " |  " + group.female_count)
//         group.students.forEach((student) => {
//             console.log("\t" + student.academy + " | " + student.gender)
//         })
//     }
// })