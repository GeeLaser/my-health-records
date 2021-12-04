
# My Health Records

  My Health Records is an application which enables everyday people to manage their own health records. Built on top of EHRbase (an implementation of the openEHR standard for Electronic Health Records), My Health Records allows users to upload, view and quickly share their health records with Medical professionals; all from a convenient web interface.
  
  The front end of the application is built using the standard trio of HTML, CSS and Javascript. The backend of the application is just EHRbase. Their project can be found here https://github.com/ehrbase/ehrbase Communication between the front end and the back end is handled via a REST api. The api is outlined as part of the openEHR standard. More information on that can be found here https://specifications.openehr.org/releases/ITS-REST/latest
  
To run this application, add your MongoDB connection details in `server/db/db.js` file.

To install MongoDB on your local machine, follow instructions from [here](https://levelup.gitconnected.com/how-to-install-mongodb-database-on-local-environment-19a8a76f1b92?source=friends_link&sk=416b443bad1f86b292e4b72602cf5c9b).

Start your MongoDB server as describe in the article by running `./mongod --dbpath=<path_to_mongodb-data_folder>` command from the terminal.

Open another terminal and execute the following commands in sequence from inside the project folder

```js
1. yarn install
2. cd server
3. yarn install
4. cd ..
5. yarn run start-app
```

and access the application at http://localhost:3030/

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

To view the uploaded file in mongoDB shell, do as following:
```js
1. mongo (open a mongo shell)
2. show dbs (list database)
3. use <databaseName>  (choose database in use)
4. show collections  (list collections inside the current database)
5. db.<collectionName>.find()  (list all records in the collection)
```
File is also upload to directory "./server/files" in the project folder.

Login info: 
username: user
password: test123
