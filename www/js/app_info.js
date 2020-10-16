let AppInfo = function () {
    let init = function () {

        let data = `
            <b>Identifier: </b>${navigator.appInfo.identifier}<br>
            <b>Version: </b>${navigator.appInfo.version}<br>
            <b>Build: </b>${navigator.appInfo.build}<br>
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