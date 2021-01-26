let AppInfo = function () {
    // ---------- Global Variables & Stuff ----------
    // Cache DOM for performance
    let $tabAbout = $('#tabAbout');
    let $APP_info_all = $tabAbout.find('#APP_info_all');
    let $APP_info_identifier = $('#APP_info_identifier');
    let $APP_info_version = $('#APP_info_version');
    let $APP_info_build = $('#APP_info_build');





    // ---------- Function Stuff ----------
    let init = function () {
        console.log("Platform: ", device.platform)
        // Get APP data
        let data = `
            <p class="center-align" style="margin-top:0; margin-bottom: 0">${BuildInfo.packageName}</p>
            <p class="center-align" style="margin-top: 0; margin-bottom: 0">Ver. ${BuildInfo.version} (Build ${BuildInfo.versionCode})</p>
            <p class="center-align" style="margin-top: 0">${device.platform}</p>
        `;

        // Set APP data as HTML
        $APP_info_all.html(data);
        $APP_info_identifier.text(BuildInfo.packageName);
        $APP_info_version.text(BuildInfo.version);
        $APP_info_build.text(BuildInfo.versionCode);
    };



    // ---------- Global Function returns (outside name : inside name) ----------
    return {
        init: init,
    };
}();