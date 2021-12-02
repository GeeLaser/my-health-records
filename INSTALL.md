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
