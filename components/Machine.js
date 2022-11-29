export default class Machine {
  constructor(name, status) {
      this.name = name;
      this.status = status;
  }
  getName() {
    return this.name;
  }
  getStatus() {
    return this.status;
  }
}