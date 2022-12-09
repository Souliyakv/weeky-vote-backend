// create table user ສ້າງຕາຕະລາງຜູ້ໃຊ້
export const CREATETABLE_USER = `CREATE TABLE users (
    user_id varchar (45) PRIMARY KEY,
    fname varchar(50) not null,
    lname varchar(50) not null,
    email varchar(100) not null UNIQUE KEY,
    password varchar(255) not null,
    position varchar(15),
    createAt timestamp DEFAULT CURRENT_TIMESTAMP,
    imagePf text
)ENGINE=INNODB DEFAULT charset=utf8`;
//  create user ສ້າງບັນຊີຜູ້ໃຊ້
export const REGISTER = `INSERT INTO users (user_id,fname,lname,email,password,position,imagePf) VALUES ?`;
// check email ກວດສອບວ່າອີເມວນີ້ມີຫຼືບໍ່
export const CHECKEMAIL = `SELECT * FROM users WHERE email =?`;
// check User_ID ກວດສອບວ່າ ໄອດີຜູ້ໃຊ້ນີ້ມີໂຕຕົນແທ້ຫຼືບໍ່
export const CHECKUSERID = `SELECT * FROM users WHERE user_id=?`