const makeGroups = require('./groupMaker')

module.exports.editGroups = async () => {
    try {
        let groups = await makeGroups()
        return groups
    } catch (e) {
        console.log(e)
    }

    // let male_disparities    = 0
    // let female_disparities  = 0

    // let disparity           = ''
    // let disparity_groups    = []
    // let rest                = []

    // groups.forEach((group) => {
    //     if (group.male_disparity > 0) 
    //         male_disparities++
    //     else if (group.female_disparity > 0)
    //         female_disparities++
    // })

    // if (male_disparities > female_disparities) 
    //     disparity_type = 'male_disparity'
    
    // else if (female_disparities >= male_disparities) 
    //     disparity_type = 'female_disparity'

    // groups.forEach((group) => {
    //     if (group[disparity_type] > 0) disparity_groups.push(group)
    //     else rest.push(group)
    // })

    // rest.sort((groupA, groupB) => {
    //     if (groupA[disparity_type] > groupB[disparity_type]) return 1
    //     else return -1
    // })

    /**
     * sort the groups without a male disparity based on how many extra females there are 
     * that way groups with more females swap first 
     */
    

    // swap a male for a female || make more complex later
    // for (let i = 0; i < 1 /*male_disparity.length*/; i++) {
    //     let groupA  = male_disparity.pop()
    //     let males   = groupA.getMales()

    //     let groupB  = rest.pop()
    //     let females = groupB.getFemales()
        
    //     console.log(males)
    //     console.log(females)
    // }

    // groups.forEach((group) => {
    //     console.log(`\n${group.leader.firstname + " " + group.leader.lastname}'s group:\n`)
    //     console.log('\t' + group.male_count + " |  " + group.female_count)
    //     group.students.forEach((student) => {
    //         console.log("\t" + student.academy + " | " + student.gender)
    //     })
    // })

    

    // groups_to_change.forEach((group) => console.log(group.gender_disparity))
    // console.log(groups_to_change[0])

    // groups_to_change.forEach((group) => {
    //     let to_be_moved = []

    //     Object.entries(group.academy_count).forEach((academy_count) => {
    //         console.log(academy_count[1])
    //     })
    // })

    return groups
}

editGroups()