const { getFreshmen, getSparkLeaders } = require('./parse')

const makeGroups = async () => {
    try {
        const freshmen = await getFreshmen()
        const sparkLeaders = await getSparkLeaders()

        let totalFreshman = 0
        Object.values(freshmen).forEach((academy) => {
            totalFreshman += academy.length
        })

        // a = # of freshman (288) b = # of spark leaders (33
        // x = # of groups w 8 | y = # of groups w 9

        // x + y = b
        // 8x + 9y = 288

        // 9x + 9y = 297
        // 8x + 9y = 288
        // x       = 9
        // y       = 33 - x = 24

        avg_group_size = Math.floor(totalFreshman / sparkLeaders.length)
        group_of_ags = Math.floor(totalFreshman / avg_group_size)
        group_of_ags_plus_1 = sparkLeaders.length - (totalFreshman % sparkLeaders.length)
        console.log(avg_group_size, group_of_ags, group_of_ags_plus_1)

    } catch (e) {
        console.log(e)
    }
}

makeGroups()