export class Topic {
  name: string;
  constructor(name: string) {
    this.name = name;
  }

  get getName() {
    return this.name;
  }
}
