# Project Cordova 2020 - 2021

- **Naam**: Van Gestel Axel
- **Klas**: 2 APPAI A
- **Studentnr**: r0784084
- **Download Page**: [link](https://vangestelaxel.sinners.be/2APPAI1/cordova/cordova_project/#download)  
- **Direct APK Download**: [download](https://vangestelaxel.sinners.be/2APPAI1/cordova/cordova_project/resources/app-debug.apk)  

<img src="resources/icon.png" width="150" height="150">

## Korte omschrijving van de app

Mijn plan is om een app te ontwikkelen waarmee de gebruiker snel informatie (naam, stats, skills, skins,...) over een bepaald T-doll (character) van de game “Girls' Frontline” kan opzoeken. Om dit efficiënt te laten verlopen kan ik gebruik maken van de `girlsfrontline-core API` die deze info beheert en up-to-date houd. <br />
De gebruiker kan dan bepaalde T-doll’s opslaan in een lokale lijst, zodat hij snel toegang heeft tot hun informatie.


## Plug-ins in mijn app

- [cordova-plugin-buildinfo](https://www.npmjs.com/package/cordova-plugin-buildinfo)  
Gebruikt voor de identifier, versie & build nummer van de applicatie op te halen, op deze manier gebeurt dit automatisch en hoef je geen html code te wijzigen bij een update of versie verandering.
- [cordova-plugin-device](https://www.npmjs.com/package/cordova-plugin-device)  
Used to differentiate between the browser & Android version in code.
- [cordova-plugin-network-information](https://www.npmjs.com/package/@osvlabs/cordova-plugin-network-information)  
Gebruikt voor het controleren of de app online kan tijdens het opstarten, zo niet dan krijgt de gebruiker een melding dat deze app internet toegang nodig heeft om correct te werken.
- [skwas-cordova-plugin-datetimepicker](https://www.npmjs.com/package/skwas-cordova-plugin-datetimepicker)  
Gebruikt voor de input van de Build Time, deze plugin geeft me meer vrijheid over hoe de time picker eruit ziet en functioneert tegenover de standaard MaterializeCSS time picker.
- [cordova-plugin-splashscreen](https://www.npmjs.com/package/cordova-plugin-splashscreen)  
Gebruikt voor de pop-in te verbergen, terwijl de app alles aan het inladen is bij startup.


## Tip: GitHub Markdown
[https://docs.github.com/en/github/writing-on-github/basic-writing-and-formatting-syntax](https://docs.github.com/en/github/writing-on-github/basic-writing-and-formatting-syntax)

## To Do
- [x] Idee vinden
- [x] Minstens 4 Tabs aanmaken (Info, T-Doll, Equipment, Fairy, Favorites,...)
- [x] Info Page (naam, e-mail, sms, tel, extra info app)
- [x] Mintens 1 Cordova Plug-in
- [x] Data uitwisseling met JSON (AJAX) - API (girlsfrontline-core API)
- [x] Local storage (Laatste selectie, favoriete,...)
- [x] Applicatie publiceren ([Sinners - Cordova Project](https://vangestelaxel.sinners.be/2APPAI1/cordova/cordova_project/))
- [ ] ...

