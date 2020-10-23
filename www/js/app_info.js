let AppInfo = function () {
    // ---------- Function Stuff ----------
    let init = function () {
        // Get APP data
        let data = `
            <b>Identifier: </b>${navigator.appInfo.identifier}<br>
            <b>Version: </b>${navigator.appInfo.version}<br>
            <b>Build: </b>${navigator.appInfo.build}
        `;

        // Set APP data as HTML
        $('#APP_info_all').html(data);
        $('#APP_info_identifier').text(navigator.appInfo.identifier);
        $('#APP_info_version').text(navigator.appInfo.version);
        $('#APP_info_build').text(navigator.appInfo.build);
    };



    // ---------- Global Function returns (outside name : inside name) ----------
    return {
        init: init,
    };
}();