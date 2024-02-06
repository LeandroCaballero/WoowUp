export class Person {
    constructor(name, lastName) {
        this.name = name;
        this.lastName = lastName;
    }
    set dataName(name) {
        this.name = name;
    }
    set dataLastName(lastName) {
        this.lastName = lastName;
    }
    get getName() {
        return this.name;
    }
    get getLastName() {
        return this.lastName;
    }
    caminar() {
        return true;
    }
}
