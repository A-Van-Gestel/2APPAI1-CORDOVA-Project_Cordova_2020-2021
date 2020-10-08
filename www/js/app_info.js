let AppInfo = function () {
    let init = function () {

        let data = `
            <b>Application Identifier: </b>${navigator.appInfo.identifier}<br>
            <b>Application Version: </b>${navigator.appInfo.version}<br>
            <b>Application Build: </b>${navigator.appInfo.build}<br>
        `;
        $('#APPVersion').html(data);
    };
    return {
        init: init
    };
}();