import mysql from "mysql2";
export function getConnection(){
    const con = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'hackathon',
    })
    con.connect(function(err){
        if (err) {
            return console.error('error: ' + err.message);
        }
        console.log("Mysql Connected....");
    });
    return con;
}