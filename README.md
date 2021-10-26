# my-health-records
Team two - Allen Lu and Henry Madsen

Project description: My Health Records seeks to empower individuals to take an active role in their health care, and provide technology and service to make that easy. The focus of the product is to host secure storage of a person’s records for that person’s use, as well as provide an easy to use application to facilitate viewing, sharing and updating health records.

Sprint 1 log:
During sprint one Allen and I decided implementig upload, download, and share features were the most crucial to begin with. We did this by using a framework called multer to deal with uploads, express to deal with downloads, and google's email apis to facilitate sharing. During sprint 2 we plan to implement ehrBase and openEHR standards to store documents instead of storing them on the root folder and create a login system so assume while using the current implementation you have already logged into the application with a username and password.

USAGE: 

1. Download or clone repo
2. Install node js v14.17.4
3. Navigate to top level directory 
4. In a terminal at the project file, run "npm i" (you may have to download some packages manually. In this case run: "npm i ejs" "npm i express", "npm i filereader", "npm i multer", "npm i sequelize".
6. Finally run the project by running "node index.js" in the terminal 
