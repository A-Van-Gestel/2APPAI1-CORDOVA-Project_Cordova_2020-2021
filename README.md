# Project Cordova 2020 - 2021

- **Name**: Van Gestel Axel
- **Class**: 2 APPAI A
- **Studentnr**: r0784084
- **Download Page**: [link](https://vangestelaxel.sinners.be/2APPAI1/cordova/cordova_project/#download)  
- **Direct APK Download**: [download](https://vangestelaxel.sinners.be/2APPAI1/cordova/cordova_project/resources/app-debug.apk)  
- **Online version**: [link](https://vangestelaxel.sinners.be/2APPAI1/cordova/cordova_project/online/)  

<img src="resources/icon.png" width="150" height="150" alt="App icon">

## Short description of this app
My plan is to develop an app that allows the user to quickly find information (name, stats, skills, skins,...) about a specific T-Doll (character) from the game “Girls' Frontline”. To make this work efficiently I can use the `girlsfrontline-core API` that manages this info and keeps it up-to-date.<br />
The user can then store there favorite T-dolls in a local list for quicker access to their information.


## Plug-ins used in this app
- [cordova-plugin-buildinfo](https://www.npmjs.com/package/cordova-plugin-buildinfo)  
Used to retrieve the identifier, version & build number of the application, this way this happens automatically, so you do not have to change html code during an update or version change.
- [cordova-plugin-device](https://www.npmjs.com/package/cordova-plugin-device)  
Used to differentiate between the browser & Android version in code.
- [cordova-plugin-network-information](https://www.npmjs.com/package/@osvlabs/cordova-plugin-network-information)  
Used to check if the app has an internet connection during startup, if not the user will be notified that this app needs internet access to work correctly. 
- [skwas-cordova-plugin-datetimepicker](https://www.npmjs.com/package/skwas-cordova-plugin-datetimepicker)  
Used for the "Build Time" input, this plugin gives me more freedom on how the time picker looks and functions versus the standard MaterializeCSS time picker.
- [cordova-plugin-splashscreen](https://www.npmjs.com/package/cordova-plugin-splashscreen)  
Used to hide the pop-in that might happen while the app is loading and setting up the app during startup.


## Commands used during development
- `npm run watch`  
Copies the src JS-files to the app, generates the CSS needed by the app and sets up a live file watcher (browsersync).
- `npm run browser`  
Builds & launches the browser version of this app.
- `npm run android`  
Builds, deploys & launches the android version of this app on the connected android device.
- `npm run publish`  
Generates cleaned and optimized JS & CSS-files, after that it launches the browser version of the app.
- `npm run icon`  
Generates the app icons that the android version uses based from the `resources/icon.png`.
- `npm run splash`  
Generates the app splash screens that the android version uses based from the `resources/splash.png`.
- [Broken] `npm run JSDoc`  
Generates HTML Pages containing detailed documentation on every Javascript function used in this app in the folder `out/be.axelvangestel.project/1.0.0/index.html`.

[comment]: <> (## Tip: GitHub Markdown)
[comment]: <> ([https://docs.github.com/en/github/writing-on-github/basic-writing-and-formatting-syntax]&#40;https://docs.github.com/en/github/writing-on-github/basic-writing-and-formatting-syntax&#41;)
