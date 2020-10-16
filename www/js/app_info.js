let AppInfo = function () {
    let init = function () {

        let data = `
            <b>Application Identifier: </b>${navigator.appInfo.identifier}<br>
            <b>Application Version: </b>${navigator.appInfo.version}<br>
            <b>Application Build: </b>${navigator.appInfo.build}<br>
        `;
        $('#APP_info_all').html(data);
        $('#APP_info_identifier').html(navigator.appInfo.identifier);
        $('#APP_info_version').html(navigator.appInfo.version);
        $('#APP_info_build').html(navigator.appInfo.build);
    };

    return {
        init: init,
    };
}();