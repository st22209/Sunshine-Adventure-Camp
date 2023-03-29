# App/Website (GUI)

This is the web client. It works with the API to provide a GUI to the user so they dont have to manually make http requests to the api. Since the client and api aren't connected as long as you change the url in the code there can be many clients and they can be anywhere. 

For the website I used react as I have some expirience with it and i HATE tkinter. I can not describe in words how much i hate tkinter. I used vite to create the boiler plate for the react project. Most of the files in this folder are just node/react/vite/tailwind config. All of my code is in the `src` folder.

## Directory Structure
```bash
├── src
│   ├── App.tsx # this file manages routing and animation between pages
│   ├── components # all pages are in this folder
│   │   ├── create.tsx # code for the create new record page
│   │   ├── getData.ts # code to get data from the api 
│   │   ├── home.tsx # code for the home page
│   │   ├── index.ts # kinda like a __init__.py but in ts
│   │   ├── logs.tsx # code for the logs page
│   │   └── view.tsx # code for the view data table page
│   ├── index.css # base css (just sets the background)
│   ├── index.tsx # starts the react app
│   └── vite-env.d.ts
```
