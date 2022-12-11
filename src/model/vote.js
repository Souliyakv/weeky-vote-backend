//  create table vote
export const CREATETABLE_VOTE = `CREATE TABLE vote(
    vote_id int(20) PRIMARY KEY AUTO_INCREMENT,
    team_id varchar(50) not null,
    user_id varchar(50) not null,
    voter_id varchar(50) not null,
    point int(10) not null,
    Comment text,
    voteDay varchar(50) not null,
    voteAt timestamp DEFAULT CURRENT_TIMESTAMP
)ENGINE=INNODB DEFAULT charset=utf8`;
//  give point
export const VOTE = `INSERT INTO vote(team_id,user_id,voter_id,point,Comment,voteDay) VALUES ?`;
//  check vote in team
export const CHECKVOTE = `SELECT * FROM vote WHERE team_id=? AND voter_id = ? and user_id=? AND voteDay=?`;
//  select sum point user of team
export const GETSUMPOINT = `SELECT SUM(point) as sumpoint,voteDay  FROM vote WHERE team_id=? AND user_id=?`;
// select my point
export const GETMYSUM = `SELECT SUM(vote.point) as sumpoint,vote.voteDay,users.email   FROM vote INNER JOIN users on users.user_id = vote.user_id WHERE vote.user_id=?`;
// select all my coment 
export const GETMYCOMMENT = `SELECT vote_id,Comment,voteAt FROM vote WHERE user_id =?`
//  select all comment some user of team
export const GETALLCOMMENTOFUSER = `SELECT vote_id,Comment,voteAt FROM vote WHERE team_id=? AND user_id =? ORDER BY vote_id DESC`;


