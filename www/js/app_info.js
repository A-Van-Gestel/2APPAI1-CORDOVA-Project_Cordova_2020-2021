let AppInfo = function () {
    // ---------- Global Variables & Stuff ----------
    // Cache DOM for performance
    let $tabAPPInfo = $('#tabAPPInfo');
    let $APP_info_all = $tabAPPInfo.find('#APP_info_all');
    let $APP_info_identifier = $('#APP_info_identifier');
    let $APP_info_version = $('#APP_info_version');
    let $APP_info_build = $('#APP_info_build');





    // ---------- Function Stuff ----------
    let init = function () {
        // Get APP data
        let data = `
            <b>Identifier: </b>${navigator.appInfo.identifier}<br>
            <b>Version: </b>${navigator.appInfo.version}<br>
            <b>Build: </b>${navigator.appInfo.build}
        `;

        // Set APP data as HTML
        $APP_info_all.html(data);
        $APP_info_identifier.text(navigator.appInfo.identifier);
        $APP_info_version.text(navigator.appInfo.version);
        $APP_info_build.text(navigator.appInfo.build);
    };



    // ---------- Global Function returns (outside name : inside name) ----------
    return {
        init: init,
    };
}();