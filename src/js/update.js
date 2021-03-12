/**
 * @namespace Update
 */
let Update = function () {
    // ---------- Global Variables & Stuff ----------
    let versionOnline = "0.0.0.0";
    let always_show = true;

    // Cache DOM for performance
    let $modalUpdate = $('#UpdateModal');
    let $buttonUpdateCheck = $('#updateCheckButton');
    let $updateOnlineState = $modalUpdate.find('#updateOnlineState');
    let $updateInstalledState = $modalUpdate.find('#updateInstalledState');
    let $updateOnlineDate = $modalUpdate.find('#updateOnlineDate');
    let $updateCommitMessage = $modalUpdate.find('#updateCommitMessage');
    let $updateCommitBody = $modalUpdate.find('#updateCommitBody');
    let $updateDownloadLink = $modalUpdate.find('#updateDownloadLink');
    let $UpdateModal_Retry = $modalUpdate.find('#UpdateModal_Retry');



    // ---------- Button Stuff ----------
    // Refresh GitHub data
    $buttonUpdateCheck.on('click', function() {
        if (!always_show) {
            if (versionOnline === BuildInfo.version) {
                M.toast({html: 'No updates found', displayLength: 2000, classes: 'gfl-grey'})
            }
            else {
                _show_modal();
            }
        }
        else {
            _show_modal();
        }

    })


    // Refresh GitHub data
    $UpdateModal_Retry.on('click', function() {
        _getState(undefined, true);
    })



    // ---------- Function Stuff ----------
    /**
     * Initialise the Updates Check.
     */
    let init = function(){
        // Get current GitHub State
        _getState();
    };


    /**
     * Get current GitHub State.
     * @param {boolean} [dev=false] include pre-releases
     * @param {boolean} [refresh=false]
     * @returns {JSON}
     * @private
     */
    let _getState = function(dev=false, refresh=false){
        let GitStateJSON = JSON;
        if (dev) {
            // All releases: https://api.github.com/repos/A-Van-Gestel/2APPAI1-CORDOVA-Project_Cordova_2020-2021/releases
            $.getJSON("https://api.github.com/repos/A-Van-Gestel/2APPAI1-CORDOVA-Project_Cordova_2020-2021/releases").done(function (json) {
                // console.log(json);
                versionOnline = json[0].tag_name;
                _render_html(json[0]);
                GitStateJSON = json;
            });
        }
        else {
            // Latest stable: https://api.github.com/repos/A-Van-Gestel/2APPAI1-CORDOVA-Project_Cordova_2020-2021/releases/latest
            $.getJSON("https://api.github.com/repos/A-Van-Gestel/2APPAI1-CORDOVA-Project_Cordova_2020-2021/releases/latest").done(function (json) {
                // console.log(json);
                versionOnline = json.tag_name;
                _render_html(json);
                GitStateJSON = json;
            });
        }
        if (refresh) {
            M.toast({html: 'Refresh completed', displayLength: 2000, classes: 'gfl-grey'})
        }
        return GitStateJSON;

    };

    /**
     * Renders the content to the Modal
     * @param {JSON} GitHubState
     * @private
     */
    let _render_html = function (GitHubState) {
        let commitBody = GitHubState.body
        let releaseDate = new Date(GitHubState.published_at);
        let releaseDateString = MaterialDateTimePicker.datetoString(releaseDate);
        let updateDownloadLinkBase = "https://github.com/A-Van-Gestel/2APPAI1-CORDOVA-Project_Cordova_2020-2021/releases/download/";


        $updateInstalledState.html(`<b>Installed: </b>${BuildInfo.version}`);
        $updateOnlineState.html(`<b>Online: </b>${GitHubState.tag_name}`);
        $updateOnlineDate.html(`<b>Release date: </b>${releaseDateString}`);
        $updateCommitMessage.html(`${GitHubState.name}`);
        $updateCommitBody.html(`${commitBody}`);
        if (device.platform === "Android") {
            $updateDownloadLink.attr("href", updateDownloadLinkBase + GitHubState.tag_name + "/app-debug.apk");
        }
        else if (device.platform === "browser") {
            $updateDownloadLink.attr("href", updateDownloadLinkBase + GitHubState.tag_name + "/browser.zip");
        }
        else {
            $updateDownloadLink.attr("href", GitHubState.html_url);
            $updateDownloadLink.html("Open release page");
        }
    }


    /**
     * Show "Check for updates" Modal.
     * @private
     */
    let _show_modal = function () {
        $modalUpdate.modal({dismissible: true}).modal('open');
    }


    /**
     * Close "Check for updates" Modal.
     */
    let close_modal = function () {
        $modalUpdate.modal().modal('close');
    }



    // ---------- Global Function returns (outside name : inside name) ----------
    return {
        init: init,
        close_modal: close_modal,
    };
}();