const fs = require('fs')

function numberOfFiles (userNum) {
    let directory_name = "uploads";
      // Function to get current filenames
      // in directory
      let filenames = fs.readdirSync(directory_name);
      var count = 0
      filenames.forEach((file) => {
        if(file.substr(0,6) == userNum) {
          ++count
        }
      })
  
      return count;
  }
  module.exports = numberOfFiles