const DBSole = require('./DBSole');

(function () {

    "use strict";
    let argv = process.argv.splice(2);
    new DBSole().start(argv);

}());

