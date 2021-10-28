# my-health-records
Team two - Allen Lu and Henry Madsen

Project description: My Health Records seeks to empower individuals to take an active role in their health care, and provide technology and service to make that easy. The focus of the product is to host secure storage of a person’s records for that person’s use, as well as provide an easy to use application to facilitate viewing, sharing and updating health records.

Sprint 1 log:
During sprint one Allen and I decided implementig upload, download, and share features were the most crucial to begin with. We did this by using a framework called multer to deal with uploads, express to deal with downloads, and nodemailer to facilitate sharing. During sprint 2 we plan to implement ehrBase and openEHR standards to store documents instead of storing them on the root folder and create a login system so assume while using the current implementation you have already logged into the application with a username and password. Below we go into more details about each feature and the plan moving forward:

- Upload Health Records feature:
  - This feature is critical to this application therefore it was the first feature we implemented. We use a multipart/form-data form to allow the user to choose       one or more files to upload and middleware called multer to deal with 'saving' the files to the uploads folder serverside. We are currently in discussion           whether or not to store documents as we are now or to store the file's binary data in a ehrBase database (we are leaning towards the latter option).

- Download Health Records feature: 
  -  Being able to download your records on the go and give them to a doctor is one key goal of this application som aking the process simple and easy was a top          priority. Using ejs and express, we display a link to each of the user's uploaded files and with one click, the user can download any file they need from the        site. Moving forward, we would like to give the user the ability to view the file they are downloading on the page before downloading it to thier device.

- Share Health Records feature: 
  - One of the biggest issues with managing one's health records is sharing them with those who need them. With our built in email api the user can simply navigate     to the 'send files' tab and fill in the form to any one of their health records to a medical professional or anyone else who might need it. We use nodemailer to     allow the user to share files without having to log into thier email address by sending the email from a email tied to the server (it is called                     testusersd4353@gmail.com) to avoid burdening the user with connectingour app to their mailing accounts and to ensure the security of their email                     credentials. Moving forward, we want to enable captcha and other security measures to avoid abuse on this system as well as allow users to send multiple files       at once.

USAGE: 

1. Download or clone repo
2. Install node js v14.17.4
3. Navigate to top level directory 
4. In a terminal at the project file, run "npm i" (you may have to download some packages manually. In this case run: "npm i ejs" "npm i express", "npm i filereader", "npm i multer", "npm i sequelize".
5. 
6. Finally run the project by running "node index.js" in the terminal 
