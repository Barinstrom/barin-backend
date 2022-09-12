const parse = require("csv-parse/sync").parse;
const fs = require("fs");

const csvToJson = async (file) => {
   const data = fs.readFileSync(file.path);
   try {
      const result = parse(data);
      console.log("result =", result);

      const head = result[0];
      const ans = [];
      for (let i = 1; i < result.length; i++) {
         let tmp = {};
         for (let j = 0; j < result[0].length; j++) {
            tmp[head[j]] = result[i][j];
         }
         ans.push(tmp);
      }
      console.log("ans= ", ans);
      return ans;
   } catch (err) {
      console.log(err.message);
   }
};

module.exports = csvToJson;
