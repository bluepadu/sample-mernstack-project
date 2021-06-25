const jsonfile = require("jsonfile");

const moment = require("moment");
const simpleGit = require("simple-git");

const random = require("random");
const FILE_PATH = "./data.json";

const makeCommit = (n) => {
  if (n === 0) return simpleGit().push();
  const x = random.int(0, 54);
  const y = random.int(0, 6);
  var DATE = moment()
    .subtract(9, "y")
    .add(1, "d")
    .add(x, "w")
    .add(y, "d")
    .format();
  var data = {
    date: DATE,
  };
  console.log(DATE);
  if(DATE.substring(0,7)== "2021-07"){
    DATE = DATE.replace("7", "6");
    console.log("this is replace committed into " + DATE);
  }
  jsonfile.writeFile(FILE_PATH, data, () => {
    simpleGit()
      .add([FILE_PATH])
      .commit(DATE, { "--date": DATE }, makeCommit.bind(this, --n))
      .push();
  });
};

makeCommit(520);
