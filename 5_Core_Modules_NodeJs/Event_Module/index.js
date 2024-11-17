const EventEmitter = require("events");

class School extends EventEmitter {
  startPeriod() {
    console.log("Class has Started");

    setTimeout(() => {
      this.emit("bellRing", {
        period: "First",
        text: "Class Started",
      });
    }, 3000);
  }
}

module.exports = School;
