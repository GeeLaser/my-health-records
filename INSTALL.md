# Installation Instructions

The project is currently three different components. To demo the project each individual component needs to be installed/configured/run separately.

If you have cloned this repository you should be able to switch to each individuals branch and then run the component from there.

## For Login/Registration:

- Switch to Group-A-Branch-Will
- Open server.env in a text editor:
  - You need to edit the SENDGRID_API_KEY, SENDING_EMAIL, SESSION_KEY
  - To get a SENDGRID_API_KEY you need to sign up at https://sendgrid.com/
  - Generate a SESSION_KEY here https://cloud.google.com/network-connectivity/docs/vpn/how-to/generating-pre-shared-key
  - The SENDING_EMAIL should be whichever email you signed up for sendgrid with.
- Once server.env has been edited you can start the project
- From the main project directory run `docker-compose up --build`
- The project may start without supplying an api key or session key. Emailing will for sure not work.

## For Emailing Features

- To test the email functionality
- open the mailer.js file
- under mail options, change the text within the to field to an email that you would like to send an email and test the functionality
- for examle to: 'youremail@gmail.com',
- to send attachments you must also make the sure that the attachment file in within this directory
- in the mailer.js file, within the attachments filed in mailOptions, change the file variable to the filename of an attachment you would like to send
- then also change the text part of the path variable to the pathname of the attachment you are sending, e.g. '/attachment.txt'
- change to the nodemailer directory in the console
- in the console, run the .js file by running the command - node mailer.js
- the console should then output whether or not the email was successfully sent or not
- check email for message!

