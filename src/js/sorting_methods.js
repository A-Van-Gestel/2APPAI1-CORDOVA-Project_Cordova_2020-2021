let Sorting_methods = function () {
    // TODO: Add setting to select default sort method
    // ---------- Function Stuff ----------
        // By ID
        let array_index_0_number = function(a, b) {
            return a[0] - b[0];
        }

        // By name
        let array_index_1_string = function(a, b) {
            return a[1].localeCompare(b[1]);
        }

        // By rank (1 -> 7)
        let array_index_2_number = function(a, b) {
            return a[2] - b[2];
        }

        // By rank (7 -> 1)
        let array_index_2_number_reversed = function(a, b) {
            return b[2] - a[2];
        }

        // By buildTime (low -> high)
        let array_index_3_number = function(a, b) {
            return a[3] - b[3];
        }

        // By buildTime (high -> low)
        let array_index_3_number_reversed = function(a, b) {
            return b[3] - a[3];
        }



    // ---------- Global Function returns (outside name : inside name) ----------
    return {
        array_index_0_number: array_index_0_number,
        array_index_1_string: array_index_1_string,
        array_index_2_number: array_index_2_number,
        array_index_2_number_reversed: array_index_2_number_reversed,
        array_index_3_number: array_index_3_number,
        array_index_3_number_reversed: array_index_3_number_reversed,
    };
}();