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
        this.academy    = academy
        this.firstname  = firstname
        this.lastname   = lastname
        this.town       = town
        this.known_students = known_students
    }

    addGroup(group){
        this.group = group
    }
}

class Group {
    constructor(group_length, leader){
        this.students = []
        this.group_length = group_length
        this.leader = leader
        this.female_count = 0
        this.male_count = 0
        this.gender_disparity = 0

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
    }

    /**
     * Adds a student to the group list
     * Also updates gender & academy related variables
     */
    addStudent(student){
        this.students.push(student)

        this.academy_count[student.academy]++
        
        if (student.gender === 'Male')
            this.male_count++
        else
            this.female_count++

        this.gender_disparity = Math.abs(this.male_count - this.female_count)
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

    /**
     * This method compares to students to determine if the student passed in is eligible for the group.
     * It will return false if student is not eligible and true if student is eligible.
     * The comparison is based off of academy and gender.
     * Also checks if there is space in the group using group_length.
     */
    checkEligibility(student){
        const space = this.students.length < this.group_length
        const eligible = this.students.every((current_student) => !((student.academy === current_student.academy) && (student.gender === current_student.gender)))

        return space && eligible && (this.gender_disparity < 2)
    }
}

module.exports = { SparkStudent, Student, Group}