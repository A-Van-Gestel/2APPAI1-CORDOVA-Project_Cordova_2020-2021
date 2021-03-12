/**
 * @namespace Update
 */
let Update = function () {
    // ---------- Global Variables & Stuff ----------
    let versionOnline = "0.0.0.0";
    let setting_dev_builds = false;
    let setting_show_on_startup = "false";
    let setting_show_modal_always = true;

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
        _getState(setting_dev_builds).then(function(json){
            if (!setting_show_modal_always && versionOnline === BuildInfo.version) {
                M.toast({html: 'No updates found', displayLength: 2000, classes: 'gfl-grey'})
            }
            else {
                _render_html(json);
                _show_modal();
            }
        });
    })


    // Refresh GitHub data
    $UpdateModal_Retry.on('click', function() {
        _getState(setting_dev_builds).then(function(json){
            _render_html(json);
            M.toast({html: 'Refresh completed', displayLength: 2000, classes: 'gfl-grey'});
        });
    })



    // ---------- Function Stuff ----------
    /**
     * Initialise the Updates Check.
     */
    let init = function () {
        if (setting_show_on_startup !== "false") {
            // Get current GitHub State
            _getState(setting_dev_builds).then(function(json){
                _render_html(json);
                _check_update();
            });
        }
    };


    let _check_update = function () {
        // console.log("Update: versionOnline = ", versionOnline)
        // console.log("Update: versionInstalled = ", BuildInfo.version)
        if (versionOnline !== BuildInfo.version) {
            if (setting_show_on_startup === "modal") {
                _show_modal();
            } else if (setting_show_on_startup === "toast") {
                M.toast({html: 'An update is available', displayLength: 5000, classes: 'gfl-orange gfl-grey-text'})
            }
        }
    }


    /**
     * Get current GitHub State.
     * @param {boolean} [dev=false] include pre-releases
     * @returns {JSON}
     * @private
     */
    function _getState(dev=false){
        if (dev) {
            // All releases: https://api.github.com/repos/A-Van-Gestel/2APPAI1-CORDOVA-Project_Cordova_2020-2021/releases
            return $.getJSON("https://api.github.com/repos/A-Van-Gestel/2APPAI1-CORDOVA-Project_Cordova_2020-2021/releases").then(function (json) {
                // console.log(json);
                versionOnline = json[0].tag_name;
                return json[0];
            });
        }
        else {
            // Latest stable: https://api.github.com/repos/A-Van-Gestel/2APPAI1-CORDOVA-Project_Cordova_2020-2021/releases/latest
            return $.getJSON("https://api.github.com/repos/A-Van-Gestel/2APPAI1-CORDOVA-Project_Cordova_2020-2021/releases/latest").then(function (json) {
                // console.log(json);
                versionOnline = json.tag_name;
                return json;
            });
        }
    }


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



    // ---------- Settings stuff ----------
    /**
     * Contains all the settings stuff.
     */
    let set_settings = function () {
        /**
         * Sets if dev builds (pre-releases) should be shown during update check.
         * @param dev_builds
         * @param {boolean} [init=false] - True delays the dropdown initialisation
         */
        let update_dev_builds_method = function (dev_builds, init=false) {
            setting_dev_builds = dev_builds;
            // console.log("Update: set_settings: setting_dev_builds = ", dev_builds);

            if (!init) {
                _getState(setting_dev_builds).then(function(json){
                    _render_html(json);
                    _check_update();
                });
            }
        }


        /**
         * Sets if message or modal is presented if an update is found on startup.
         * @param show_on_startup
         */
        let update_show_on_startup_method = function (show_on_startup) {
            setting_show_on_startup = show_on_startup;
            // console.log("Update: set_settings: setting_show_on_startup = ", show_on_startup);
        }


        /**
         * Sets if modal is opened even if no update is found.
         * @param show_modal_always
         */
        let update_show_modal_always_method = function (show_modal_always) {
            setting_show_modal_always = show_modal_always;
            // console.log("Update: set_settings: setting_show_modal_always = ", show_modal_always);
        }


        // ---------- Global Function returns (outside name : inside name) ----------
        return {
            update_dev_builds_method: update_dev_builds_method,
            update_show_on_startup_method: update_show_on_startup_method,
            update_show_modal_always_method: update_show_modal_always_method,
        };
    }()



    // ---------- Global Function returns (outside name : inside name) ----------
    return {
        init: init,
        close_modal: close_modal,
        set_settings: set_settings
    };
}();