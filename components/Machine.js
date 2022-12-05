export default class Machine {
  constructor(name, status, notifs) {
      this.name = name;
      this.status = status;
      this.notifs = notifs
  }
  getName() {
    return this.name;
  }
  getStatus() {
    return this.status;
  }

  getNotifs() {
    return this.notifs;
  }
}