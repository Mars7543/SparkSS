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
    }

    addStudent(student){
        this.students.push(student)
    }

    compareStudent(student){
        const a = this.students.every((current_student) => !((student.academy === current_student.academy) && (student.gender === current_student.gender)))

        console.log(a)
    }
}

module.exports = { SparkStudent, Student, Group}