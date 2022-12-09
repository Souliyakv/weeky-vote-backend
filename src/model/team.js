//  create table team  ສ້າງຕາຕະລາງທີມ
export const CREATETABLE_TEAM = `CREATE TABLE teams(
    team_id varchar(40) PRIMARY KEY,
    team_name varchar(100) not null,
    image_url varchar(255),
    creter_id varchar(50) not null,
    comment_day varchar(10),
    description text,
    createAt timestamp DEFAULT CURRENT_TIMESTAMP,
    DeleteAt varchar(50) not null DEFAULT 'NO'
)ENGINE=INNODB DEFAULT charset=utf8`;
// create time ຄຳສັ່ງສ້າງທີມ
export const ADDTEAM = `INSERT INTO teams (team_id,team_name,image_url,creter_id,comment_day,description) VALUES ?`;
// check team ກວດສອບວ່າມີທີມນີ້ແລ້ວຫຼືບໍ່
export const CHECKTEAM = `SELECT * FROM teams WHERE team_id=?`