$(function () {
    // TODO: Add Debug Mode
    // TODO: Add State system (save app state)
    // TODO: Make web compatible
    // TODO: Add browser check (needs device-info plugin)
    document.addEventListener("deviceready", onDeviceReady, false);


    // ---------- Button Stuff ----------
    // SideNav initialisation
    $('.sidenav').sidenav();	/* https://materializecss.com/sidenav.html */

    $('.sidenav a').click(function () {
        $('.spa').hide();                           // Alles met de tag "spa" wordt gehide
        $('#' + $(this).data('show')).show();       // De huidige link dat je klikt wordt geshowed
        $('.sidenav').sidenav('close');             // De navbar sluit zichzelf
    });


    // Form Selection Initialization (dropdowns)
    $('select').formSelect();
});


// ---------- Function Stuff ----------
function onDeviceReady() {
    console.log('Device is ready');
    Settings.init();                                  // Set Settings for the APP
    AppInfo.init();                                  // Get & Set the APP Info
    NetworkState.init();                            // Get the Network State on Launch
    GirlsFrontlineCoreAPI.init();
    MaterialDateTimePicker.init();
}
