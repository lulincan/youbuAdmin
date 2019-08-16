var mysql = require('mysql');
var $mysqlConfig = require("./config/dbConfig");

var dbPool = mysql.createPool($mysqlConfig);

function connect(sql, params, callback){
    dbPool.getConnection((poolErr, connect)=>{
        if(poolErr){
            console.log('connect mysql pool fail');
            callback('connect mysql pool fail')
        }    
        console.log('connect mysql pool success');

        connect.query(sql, params, (err, results, fields)=>{
            console.log(params, results)
            if(err){
                console.log(`${sql} run fail`);
                callback(`${sql} run fail`);
            }

            if(results.length == 0){
                console.log(`没有数据`);
                callback(`没有数据`);
            }

            callback(results);

            connect.release();
        });


    });
}

module.exports.connect = connect