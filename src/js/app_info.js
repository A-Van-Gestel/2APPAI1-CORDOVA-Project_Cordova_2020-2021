/**
 * @namespace AppInfo
 */
let AppInfo = function () {
    // ---------- Global Variables & Stuff ----------
    // Cache DOM for performance
    let $tabAbout = $('#tabAbout');
    let $APP_info_all = $tabAbout.find('#APP_info_all');
    let $APP_info_identifier = $('#APP_info_identifier');
    let $APP_info_version = $('#APP_info_version');
    let $APP_info_build = $('#APP_info_build');





    // ---------- Function Stuff ----------
    /**
     * Initialises the BuildInfo plugin & sets the info on the HTML5 page.
     */
    let init = function () {
        console.log("Platform: ", device.platform)
        // Get APP data
        let data = `
            <p class="center-align my-0">${BuildInfo.packageName}</p>
            <p class="center-align my-0">Ver. ${BuildInfo.version} (Build ${BuildInfo.versionCode})</p>
            <p class="center-align mt-0">${device.platform}</p>
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