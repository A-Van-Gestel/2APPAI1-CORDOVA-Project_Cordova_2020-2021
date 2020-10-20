let NetworkState = function () {
    let states = {};

    $('#NetworkModal_Retry').on('click', function() {
        // console.log("Button: NetworkModal_Retry");
        let NetworkState = _getState();

        if (NetworkState !== 'none') {
            let GirlsFrontlineCoreAPI_state = GirlsFrontlineCoreAPI.get_loaded_dynamically();
            console.log('Button: Retry: GirlsFrontlineCoreAPI_state = ', GirlsFrontlineCoreAPI_state);
        }
    })

    let init = function(){
        states[Connection.UNKNOWN]  = 'Unknown connection';
        states[Connection.ETHERNET] = 'Ethernet connection';
        states[Connection.WIFI]     = 'WiFi connection';
        states[Connection.CELL_2G]  = 'Cell 2G connection';
        states[Connection.CELL_3G]  = 'Cell 3G connection';
        states[Connection.CELL_4G]  = 'Cell 4G connection';
        states[Connection.CELL]     = 'Cell generic connection';
        states[Connection.NONE]     = 'No network connection';
        console.log('states', states);

        let networkState = _getState()

        if (networkState === 'none') {
            _show_modal()
        }
    };
    let _getState = function(){
        let networkState = navigator.connection.type;
        console.log('Connection type: ', networkState);
        $('#networkState').html(`<b>Netwerk: </b>${states[networkState]}`);
        return networkState;
    };


    let _show_modal = function () {
        $('#NetworkModal').modal().modal('open');
    }

    let close_modal = function () {
        $('#NetworkModal').modal().modal('close');
    }

    return {
        init: init,
        close_modal: close_modal,
    };
}();