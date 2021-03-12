$(function () {
    // TODO: Add Debug Mode
    // TODO: Add State system (save app state)
    document.addEventListener("deviceready", onDeviceReady, false);


    // ---------- Button Stuff ----------
    // SideNav initialisation
    $('.sidenav').sidenav();	/* https://materializecss.com/sidenav.html */

    $('.sidenav a').click(function () {
        $('.spa').hide();                           // Hide everything with the '.spa'-tag
        $('#' + $(this).data('show')).show();       // Show the pressed link
        if ($(window).width() <= 992) {
            $('.sidenav').sidenav('close');             // Close the sidenav on Smaller Screens (< 992px)
        }
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
    // Update.init();       // Now initialized by Settings
    navigator.splashscreen.hide();      // Hide the splashscreen
}
