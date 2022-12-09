// create table member ຄຳສັ່ງສ້າງຕາຕະລາງສະມາຊິກຂອງທີມ
export const CREATETABLE_MEMBER = `CREATE TABLE memberofteam(
    MEMBER_ID int(15) PRIMARY KEY AUTO_INCREMENT,
    user_id varchar(40) not null,
    team_id varchar(40) not null,
    Status varchar(10) not null DEFAULT 'USER',
    joinAt timestamp DEFAULT CURRENT_TIMESTAMP,
    DeleteAt varchar(50) not null DEFAULT 'NO'
)ENGINE=INNODB DEFAULT charset=utf8`;
// add member to team ເພີ່ມສະມາຊິກເຂົ້າທິມ
export const ADDMEMBER = `INSERT INTO memberofteam (user_id,team_id,Status) VALUES ?`;
//  join to team ຂໍເຂົ້າຮ່ວມທີມ
export const JOINTEAM = `INSERT INTO memberofteam (user_id,team_id) VALUES ?`;
// check member in the team ກວດສອບວ່າເຈົ້າຢູ່ໃນກຸ່ມນີ້ແລ້ວບໍ່
export const CHECKMEMBEROFTEAM = `SELECT * FROM memberofteam where user_id=? AND team_id=? AND DeleteAt ='NO'`;