$(function () {
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
    $(document).ready(function () {
        $('select').formSelect();
        $('.timepicker').timepicker({
            defaultTime: '00:20:00',
            twelveHour: false, // change to 12 hour AM/PM clock from 24 hour
            autoClose: false,
            vibrate: true
        });
    });
});


// ---------- Function Stuff ----------
function onDeviceReady() {
    console.log('Device is ready');
    AppInfo.init();                                  // Get & Set the APP Info
    NetworkState.init();                            // Get the Network State on Launch
    GirlsFrontlineCoreAPI.init();
    MaterialDateTimePicker.init();

    GirlsFrontlineCoreAPI.example();
}
