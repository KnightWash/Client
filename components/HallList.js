import { Hall, Halls } from "../components/Hall";

export default class HallList {

  constructor(halls) {
    const bolt = new Hall("Bolt", ["B/W/L", "B/D/LR"]);
    const timmer = new Hall("Timmer", ["B/W/L", "B/D/LR"]);
    const beta = new Hall("Beta", ["beta/washer/right", "beta/dryer/right"]);
    this.halls = halls;
  }
  getHalls() {
    return this.halls;
  }
}