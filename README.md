# Project Cordova 2020 - 2021

- **Naam**: Van Gestel Axel
- **Klas**: 2 APPAI A
- **Email**: <a href="mailto:r0784084@student.thomasmore.be">r0784084@student.thomasmore.be</a>
- **Studentnr**: r0784084
- **Download APK URL**: [download (WIP)](https://vangestelaxel.sinners.be/2APPAI1/cordova/cordova_project/resources/app-debug.apk)  

![Hier een link naar uw foto](resources/A_Van_Gestel_FACE_400px.JPG)

## Korte omschrijving van de app

Mijn plan is om een app te ontwikkelen waarmee de gebruiker snel informatie (naam, stats, skills, skins,...) over een bepaald T-doll (character) van de game “Girls' Frontline” kan opzoeken. Om dit efficiënt te laten verlopen kan ik gebruik maken van de `girlsfrontline-core API` die deze info beheert en up-to-date houd. <br />
De gebruiker kan dan bepaalde T-doll’s opslaan in een lokale lijst, zodat hij snel toegang heeft tot hun informatie.


## Plug-ins in mijn app

- [cordova-plugin-appinfo](https://www.npmjs.com/package/cordova-plugin-appinfo)  
Gebruikt voor de identifier, versie & build nummer van de applicatie op te halen, op deze manier gebeurt dit automatisch en hoef je geen html code te wijzigen bij een update of versie verandering.
- [cordova-plugin-network-information](https://www.npmjs.com/package/@osvlabs/cordova-plugin-network-information)  
Gebruikt voor het controleren of de app online kan tijdens het opstarten, zo niet dan krijgt de gebruiker een melding dat deze app internet toegang nodig heeft om correct te werken.
- [skwas-cordova-plugin-datetimepicker](https://www.npmjs.com/package/skwas-cordova-plugin-datetimepicker)  
Gebruikt voor de input van de Build Time, deze plugin geeft me meer vrijheid over hoe de time picker eruit ziet en functioneert tegenover de standaard MaterializeCSS time picker.


## Tip: GitHub Markdown
[https://docs.github.com/en/github/writing-on-github/basic-writing-and-formatting-syntax](https://docs.github.com/en/github/writing-on-github/basic-writing-and-formatting-syntax)

## To Do
- [x] Idee vinden
- [x] Minstens 4 Tabs aanmaken (Info, T-Doll, Equipment, Fairy, Favorites,...)
- [x] Info Page (naam, e-mail, sms, tel, extra info app)
- [x] Mintens 1 Cordova Plug-in
- [x] Data uitwisseling met JSON (AJAX) - API (girlsfrontline-core API)
- [x] Local storage (Laatste selectie, favoriete,...)
- [ ] Applicatie publiceren ([Sinners - Cordova Project (WIP)](https://vangestelaxel.sinners.be/2APPAI1/cordova/cordova_project/))
- [ ] ...

