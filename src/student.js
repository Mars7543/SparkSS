class Student{
    /**
     * Constructor for the student object.
     * Will be mainly used to create freshman objects.
     * Take an academy, gender, name, address, town and zip.
     * 
     * THINGS TO DO:
     * Name, when read fromt he file, looks like this:
     *      "Kaluza, Alek"
     * Figure out a way to separate this and make firstname and lastname variables.
     */
    cosntructor(academy, gender, name, address, town, zip){
        this.academy = academy
        this.gender = gender
        tempnamearray = name.split(", ")
        this.firstname = tempnamearray[1]
        this.lastname = tempnamearray[0]
        this.address = address
        this.town = town
        this.zip = zip
    }

    changeAcademy(academy){
        this.academy = academy
    }

    changeName
    
}