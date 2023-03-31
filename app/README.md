# App/Website (GUI)

This is the web client. It works with the API to provide a GUI to the user so they dont have to manually make http requests to the api. Since the client and api aren't connected as long as you change the url in the code there can be many clients and they can be anywhere. 

For the website I used react as I have some expirience with it and i HATE tkinter. I can not describe in words how much i hate tkinter. I used vite to create the boiler plate for the react project. Most of the files in this folder are just node/react/vite/tailwind config. All of my code is in the `src` folder.

## Directory Structure
```bash
├── src
│   ├── App.tsx # this file manages routing and animation between pages
│   ├── components  # this folder contains all the components and pages
│   │   ├── create.tsx # this is the code for the radio-in page
│   │   ├── createRecordForm.tsx # this is the create record form that is shown on the radio in page
│   │   ├── events.ts # this file contains code to handle the event of creating a record
│   │   ├── home.tsx # this is the homepage which is just 3 buttons taking you to the pages
│   │   ├── index.ts # this file is kinda like an __init__.py file but the typescript version
│   │   ├── logs.tsx # this is the code for the logs page
│   │   ├── requests.ts # this file contains code to make http requests to the REST API
│   │   └── view.tsx # this file contains the main table data viewing page
│   ├── index.css # this is some base css basically justs sets the background
│   ├── index.tsx # this file starts the react app
│   └── vite-env.d.ts # another config file to ignore
```