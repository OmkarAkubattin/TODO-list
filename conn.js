const mysql = require('mysql2');

exports.conn = async (q) => {
    try{
        const conn = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            database: 'doit',
            password: 'root'
        });
        results = await new Promise((resolve, reject) => {
            conn.query(q, (err,results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
        conn.end();
        return results;
    }catch(err){
        console.error('MySQL Connection Problem',err);
        throw err;
    }
};

