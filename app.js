(function() {
    'use strict';

    // Uses only pure JS, no external libraries
    var _start = new Date().getTime(),
        _data = null;

    activate();


    function activate() {
        log('activation started');

        // load the data
        loadJSON('data.json', onDataLoad);

    }

    function onDataLoad(response) {
        // Parse JSON string into object
        _data = JSON.parse(response);
        log('data loaded');
        createTable(_data);
    }

    function createTable(data) {
        var _rowData = data.rows,
            _i,
            _l = _rowData.length,
            _table = document.createElement('table'),
            _tbody = document.createElement('tbody'),
            _body = document.body;

        for (_i = 0; _i < _l; _i += 1) {
            _tbody.appendChild(createRow(_rowData[_i]));
        }
        _table.appendChild(_tbody);
        _body.appendChild(_table);
        log('rows added')
    }

    function createRow(data) {
        var _cellData = data.values,
            _i,
            _l = _cellData.length,
            _tr = document.createElement('tr');

        for (_i = 0; _i < _l; _i += 1) {
            _tr.appendChild(createCell(_cellData[_i]));
        }
        return _tr;
    }

    function createCell(data) {
        var _td = document.createElement('td'),
            _tdContent = document.createTextNode(data.value);

        _td.appendChild(_tdContent);
        return _td;
    }

    function log(message) {
        console.log(message + ' time:' + (new Date().getTime() - _start) + 'ms');
    }

    function loadJSON(filename, callback) {
        var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
        xobj.open('GET', filename, true); // Replace 'my_data' with the path to your file
        xobj.onreadystatechange = function() {
            if (xobj.readyState == 4 && xobj.status == "200") {
                // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
                callback(xobj.responseText);
            }
        };
        xobj.send(null);
    }

})();