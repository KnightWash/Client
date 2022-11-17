
export default class Hall {
  constructor(name, machines) {
      this.name = name;
      this.machines = machines;
  }
  getName() {
    return this.name;
  }
  getMachines() {
    return this.machines;
  }
}