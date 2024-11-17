const School = require("../Event_Module/index");

const school = new School();

school.on("bellRing", ({ period, text }) => {
  console.log(`We need to run because ${period} ${text}`);
});

school.startPeriod();
