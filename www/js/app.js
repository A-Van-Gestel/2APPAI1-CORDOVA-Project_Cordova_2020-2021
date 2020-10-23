$(function(){
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
    $(document).ready(function(){
        $('select').formSelect();
    });

});



// ---------- Function Stuff ----------
function onDeviceReady() {
    console.log('Device is ready');
    AppInfo.init();                                  // Get & Set the APP Info
    NetworkState.init();                            // Get the Network State on Launch
    // GirlsFrontlineCoreAPI.init();
    // GirlsFrontlineCoreAPI.example();
    GirlsFrontlineCoreAPI.get_dolls_by_type();      // Get T-Doll by Type & Set the T-Doll Dropdown
};
