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

class SparkStudent {
    constructor(academy, firstname, lastname, town, knownStudents) {
        this.academy    = academy
        this.gender     = gender
        this.firstname  = firstname
        this.lastname   = lastname
        this.town       = town
    }
}

/**
Constraints:
   - Even # of males to females
   - Good spread of academies (max 2 of one academy)
   - Good spread of towns (including spark leader)
   - Roughly same amnt of ppl per group (# of students / # of spark leaders) : 1 spark leader / group
**/

class Group {
    constructor() {

    }
}

module.exports = { SparkStudent, Student, Group }