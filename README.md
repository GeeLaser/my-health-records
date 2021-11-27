# my-health-records

[![Build Status](https://app.travis-ci.com/hhm14/my-health-records.svg?branch=main)](https://app.travis-ci.com/hhm14/my-health-records)
Team two - Allen Lu and Henry Madsen

SEE BOTTOM FOR USAGE

Project description: My Health Records seeks to empower individuals to take an active role in their health care, and provide technology and service to make that easy. The focus of the product is to host secure storage of a person’s records for that person’s use, as well as provide an easy to use application to facilitate viewing, sharing and updating health records.

Sprint 2 log:
During sprint two Allen and I decided implementing the ability to send multiple files, do in browser file viewing, and delete files were the most crucial to add . We did this by using a framework called nodemailer to deal with emails and express/fs to deal with deletes/viewing.

- Send multiple Health Records feature:
  - This feature is critical to this application because in many cases a patient will need to share multiple files. The implementation of this requred some json formatting and creating custom messages for nodemailer to send

- View/delete Health Records feature: 
  -  Being able to delete old health records in very important to eliminate outdated records so that users know they are always sharing the most current records and being able to delete helps eliminate blotage on the server/database. Being able to view your records is important because it eliminates any confusion about which record is which and if it can saely be deleted from the server. 

NEEDS UPDATING 
USAGE: 
1. Download or clone repo
2. Install the latest version of node js from https://nodejs.org/en/download/ (you can use homebrew if on mac but this can be weird)
3. Navigate to top level directory in your favorite IDE or your file system (go to the my-health-records directory)
4. Open a terminal at the my-health-records directory, run "npm i" (you may have to download some packages manually although this should not happen. In this case run: "npm i ejs" "npm i express", "npm i filereader", "npm i multer", "npm i sequelize", and/or npm i [package] that is not download my npm i)
5. On line 20 in index.js please replace "xxxx" with the password provided in the peer evaluation form we turned in (email henryhmadsen@gmail.com or allenlu9326@gmail.com if you need help with this step)
6. Run the project by typing "node index.js" in the terminal from the my-health-records directory 
7. In your web browser go to http://localhost:8080/ to view the app and try the features

Please email henryhmadsen@gmail.com or allenlu9326@gmail.com with any questions or for a demo of the project. 
