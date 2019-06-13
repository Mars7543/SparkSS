class Student {
    /**
        * Constructor for the student object.
        * Will be mainly used to create freshman objects.
        * Take an academy, gender, name, address, town and zip. 
    **/
    constructor(academy, gender, firstname, lastname, address, town, zip) {
        this.academy    = academy
        this.gender     = gender
        this.firstname  = firstname
        this.lastname   = lastname
        this.address    = address
        this.town       = town
        this.zip        = zip
    }

    /**
     * Simple .equals() function 
     */
    equals(student) {
        return (this.academy === student.academy) && (this.gender === student.gender) && (this.firstname === student.firstname) && (this.lastname === student.lastname) && (this.address === student.address) && (this.town === student.town) && (this.zip === student.zip)
    }

}

/**
Constraints:
   - Even # of males to females
   - Good spread of academies (max 2 of one academy)
   - Good spread of towns (including spark leader)
   - Roughly same amnt of ppl per group (# of students / # of spark leaders) : 1 spark leader / group
**/
class SparkStudent {
    constructor(academy, firstname, lastname, town, known_students) {
        this.academy        = academy
        this.firstname      = firstname
        this.lastname       = lastname
        this.town           = town
        this.known_students = known_students
    }

    addGroup(group){
        this.group = group
    }
}

class Group {
    constructor(group_length, leader){
        this.leader         = leader
        this.students       = []
        this.group_length   = group_length

        this.male_count         = 0
        this.male_disparity     = 0
        this.female_count       = 0
        this.female_disparity   = 0
        this.gender_disparity   = 0

        this.academy_count = {
            'ATCS': 0,
            'AMST': 0,
            'ABFIB': 0,
            'AAST': 0,
            'AEDT': 0,
            'ACHA': 0,
            'AVPA/T': 0,
            'AVPA/M': 0,
            'AVPA/V': 0
        }

        this.strong_presence    = []
        this.weak_presence      = []
    }

    /**
     * Adds a student to the group list
     * Also updates gender & academy related variables
     */
    addStudent(student){
        this.students.push(student)

        this.academy_count[student.academy]++

        // if a group has 2 or more ppl from the same academy, the academy has a "strong presence" and vice versa
        Object.entries(this.academy_count).forEach((academy) => {
            if (academy[1] >= 2) this.strong_presence.push(academy[0]) 
            else this.weak_presence.push(academy[0])
        })

        if (student.gender === 'Male')
            this.male_count++
        else
            this.female_count++

        this.gender_disparity   = Math.abs(this.male_count - this.female_count)
        this.male_disparity     = this.male_count - this.female_count
        this.female_disparity   = this.female_count - this.male_count
    }

    getMales() {
        return this.students.filter((student) => student.gender === 'Male')
    }

    getFemales() {
        return this.students.filter((student) => student.gender === 'Female')
    }
    
    /**
     * swapStudents takes a group and a student, where the student is in th group that calls the function.
     * It then swaps that student with one from the group passed in, which is a group separate from the current one.
     */
    swapStudents(outgoing_student, group, incoming_student) {
        this.students.forEach((student, index) => {
            if (student.equals(outgoing_student))
                this.students[index] = incoming_student
        })

        group.students.forEach((student, index) => {
            if(student.equals(incoming_student))
                group.students[index] = outgoing_student
        })
    }

    /**
     * Returns the amount of slots left for students
     */
    getSpace(){
        return this.group_length - this.students.length
    }

    hasSpace() {
        return this.students.length < this.group_length
    }

    /**
     * This method compares to students to determine if the student passed in is eligible for the group.
     * It will return false if student is not eligible and true if student is eligible.
     * The comparison is based off of academy and gender.
     * Also checks if there is space in the group using group_length.
     */
    checkEligibility(student){
        const space = this.students.length < this.group_length
        const eligible = this.students.every((current_student) => !((student.academy === current_student.academy) && (student.gender === current_student.gender)))
        const academy_check = this.academy_count[student.academy] < 2
        
        let gender_check = true

        if (student.gender === 'Male' && this.male_disparity > 1)
            gender_check = false
        else if (student.gender === 'Female' && this.female_disparity > 1)
            gender_check = false

        return space && eligible && gender_check && academy_check
    }
}

module.exports = { SparkStudent, Student, Group}