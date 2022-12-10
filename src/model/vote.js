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

export const VOTE = ``;
export const CKECKVOTE = `SELECT * FROM vote WHERE team_id=? AND voter_id = ? and user_id=? AND voteDay=?`;