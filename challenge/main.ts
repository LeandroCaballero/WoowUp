export class Person {
  private name: string;
  private lastName: string;

  constructor(name: string, lastName: string) {
    this.name = name;
    this.lastName = lastName;
  }

  set dataName(name: string) {
    this.name = name;
  }

  set dataLastName(lastName: string) {
    this.lastName = lastName;
  }

  get getName() {
    return this.name;
  }

  get getLastName() {
    return this.lastName;
  }

  caminar(): boolean {
    return true;
  }
}
