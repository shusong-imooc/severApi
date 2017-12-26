const mysql=require('mysql')
const cfg=require('../conf')
const md5=require('md5')
const pool = mysql.createPool({
    connectionLimit : 10,  
    host: cfg.dbhost,  
    user: cfg.dbuser, 
    password: cfg.dbpassword,  
    database: cfg.dbname,
    multipleStatements: true,  
    port: cfg.dbport || 3306  
}); 


pool.getConnection(function (err,connection) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    console.log('connected as id ' + connection.threadId);
});

function query(){
    return new Promise((resolve, reject) => {
        var args = Array.prototype.slice.call(arguments);
        args.push(function (error, results, fields) {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
        pool.query.apply(pool, args);
    });
}

module.exports = {
    query:query
};