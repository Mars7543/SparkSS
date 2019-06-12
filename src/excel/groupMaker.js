const { getFreshmen, getSparkLeaders } = require('./parse')

const makeGroups = async () => {
    try {
        const freshmen = await getFreshmen()
        const sparkLeaders =  await getSparkLeaders()

        let totalFreshman = 0
        Object.values(freshmen).forEach((academy) => {
            totalFreshman += academy.length
        })

        const avg_group_size = totalFreshman / sparkLeaders.length
        let num_people_lower = Math.floor(avg_group_size)
        let num_people_higher = Math.ceil(avg_group_size)

        let num_higher_groups = Math.round(sparkLeaders.length * (avg_group_size - num_people_lower))
        let num_lower_groups  = sparkLeaders.length - num_higher_groups

        //console.log(num_people_lower, num_people_higher, num_lower_groups, num_higher_groups)
    

    } catch (e) {
        console.log(e)
    }
}

makeGroups()