const mariadb = require('mariadb');
const mariadbcallback = require('mariadb/callback')

exports.setConnectionToDatabase = function () {
    var pool = mariadb.createPool({
        host: 'localhost',
        port: '3306',
        user: 'root',
        password: '1wax2qsz',
        database: 'aplikacja_dieta',
        connectionLimit: 5
    });
    pool.getConnection()
        .then(conn => {
            console.log("promise connected ! connection id is " + conn.threadId);
            conn.end(); //release to pool
        })
        .catch(err => {
            console.log("not connected due to error: " + err);
        });
    return pool;
}

exports.setCallbackConnectionToDatabase = function () {
    var conn = mariadbcallback.createConnection({
        host: 'localhost',
        port: '3306',
        user: 'root',
        password: '1wax2qsz',
        database: 'aplikacja_dieta',
    });
    conn.connect(err => {
        if (err) {
            console.log("not connected due to error: " + err);
        } else {
            console.log("callback connected ! connection id is " + conn.threadId)
        }
    })
    return conn;
}