/**
 * @namespace NetworkState
 */
let NetworkState = function () {
    // ---------- Global Variables & Stuff ----------
    /**
     * Contains all the Network States.
     * @type {Object}
     */
    let states = {
        '2g' : 'Cell 2G connection',
        '3g' : 'Cell 3G connection',
        '4g' : 'Cell 4G connection',
        '5g' : 'Cell 5G connection',
        'cellular' : 'Cell generic connection',
        'ethernet' : 'Ethernet connection',
        'none' : 'No network connection',
        'unknown' : 'Unknown connection',
        'wifi' : 'WiFi connection'
    };


    // Cache DOM for performance
    let $NetworkModal_Retry = $('#NetworkModal_Retry');
    let $GFLC_API_Loaded = $('#GFLC_API_Loaded');
    let $networkState = $('#networkState');
    let $NetworkModal = $('#NetworkModal');



    // ---------- Button Stuff ----------
    // Checks the network state and if not offline reloads the app (Index.html)
    $NetworkModal_Retry.on('click', function() {
        // console.log("Button: NetworkModal_Retry");
        let NetworkState = _getState();

        if (NetworkState !== 'none') {
            $GFLC_API_Loaded.html(`<b>GFL-Core API: </b>Loading`);
            location.reload();
        }
    })



    // ---------- Function Stuff ----------
    /**
     * Initialise the Network State Check.
     */
    let init = function(){
        // Get current Network State
        let networkState = _getState()

        // If offline --> Show "No network connection" Modal
        if (networkState === 'none') {
            _show_modal()
        }
    };


    /**
     * Get current Network State.
     * @returns {string}
     * @private
     */
    let _getState = function(){
        let networkState = navigator.connection.type;
        console.log('Connection type: ', networkState);
        $networkState.html(`<b>Netwerk: </b>${states[networkState]}`);
        return networkState;
    };


    /**
     * Show "No network connection" Modal.
     * @private
     */
    let _show_modal = function () {
        $NetworkModal.modal().modal('open');
    }


    /**
     * Close "No network connection" Modal.
     */
    let close_modal = function () {
        $NetworkModal.modal().modal('close');
    }



    // ---------- Global Function returns (outside name : inside name) ----------
    return {
        init: init,
        close_modal: close_modal,
    };
}();