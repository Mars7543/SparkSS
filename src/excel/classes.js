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
    }

    /**
     * Adds a student to the group list
     * Also updates gender-related variables
     */
    addStudent(student){
        this.students.push(student)
        
        if (student.gender === 'Male')
            this.male_count++
        else
            this.female_count++

        this.gender_disparity = Math.abs(this.male_count - this.female_count)
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

        return space && eligible && (this.gender_disparity <= 2)
    }
}

module.exports = { SparkStudent, Student, Group}