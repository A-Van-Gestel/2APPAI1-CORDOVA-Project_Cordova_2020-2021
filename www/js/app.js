$(function(){
    document.addEventListener("deviceready", onDeviceReady, false);

    $('.sidenav').sidenav();	/* https://materializecss.com/sidenav.html */

    $('.sidenav a').click(function () {
        $('.spa').hide();                           // Alles met de tag "spa" wordt gehide
        $('#' + $(this).data('show')).show();       // De huidige link dat je klikt wordt geshowed
        $('.sidenav').sidenav('close');             // De navbar sluit zichzelf
    });

    // Form Selection Initialization
    $(document).ready(function(){
        $('select').formSelect();
    });





});

function onDeviceReady() {
    console.log('Device is ready');
    AppInfo.init();
    GirlsFrontlineCoreAPI.init();
    // GirlsFrontlineCoreAPI.example();
    GirlsFrontlineCoreAPI.get_dolls_by_type('hg');
};
