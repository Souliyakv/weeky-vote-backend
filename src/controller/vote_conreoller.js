import { authID } from "../middleware/auth.js";
import { getConnection } from "../config/database.js";
import { CHECKMEMBEROFTEAM } from "../model/memberofteam.js";
import {
  CHECKVOTE,
  GETALLCOMMENTOFUSER,
  GETMYCOMMENT,
  GETMYSUM,
  GETSUMPOINT,
  VOTE,
} from "../model/vote.js";

//  give the point and feetback to users. 

export const Vote_Controller = async (req, res) => {
  try {
    const { team_id, user_id, point, Comment } = req.body;
    if (!team_id) return res.json({ msg: "ກະລຸນາເລືອກທີມຂອງເຈົ້າ" });
    if (!user_id) return res.json({ msg: "ກະລຸນາເລືອກຄົນທີ່ເຈົ້າຕ້ອງການໂຫວດ" });
    if (!point) return res.json({ msg: "ກະລຸນາເລືອກຄະແນນທີ່ຕ້ອງການໂຫວດ" });
    // Check input point must is not more than 10. 
    if (parseInt(point) > 10)
      return res.json({ msg: "ຄະແນນຕ້ອງຕ່ຳກວ່າ 10 ຄະແນນ" });

    const USER_ID = await authID(req.headers["token"]);
    if (USER_ID == user_id) return res.json({ msg: "ບໍ່ສາມາດໂຫວດໃຫ້ໂຕເອງໄດ້" });

    const con = getConnection();
    const month = parseInt(new Date().getMonth() + 1);

    //  Setting date in database to check point and feetback

    const voteDay =
      new Date().getFullYear() + "/" + month + "/" + new Date().getDate();

    con.query(CHECKMEMBEROFTEAM, [user_id, team_id], (err, result) => {
      if (err) throw err;
      if (result === undefined || result.length <= 0) {
        return res.json({ msg: "ບໍ່ສາມາດໃຫ້ຄະແນນໄດ້" });
      } else {

        // check day in vote day 
        const comment_day = result[0].comment_day;

        if (new Date().getDay() != comment_day)
          return res.json({ msg: "ບໍ່ສາມາດໃຫ້ຄະແນນໄດ້ໃນມື້ນີ້" });
        con.query(
          CHECKVOTE,
          [team_id, USER_ID, user_id, voteDay],
          (err, result) => {
            if (err) throw err;
            if (result === undefined || result.length > 0) {
              return res.json({ msg: "ທ່ານໄດ້ໃຫ້ຄະແນນຄົນນີ້ໄປແລ້ວ" });
            } else {
              const values = [
                [team_id, user_id, USER_ID, point, Comment, voteDay],
              ];
              con.query(VOTE, [values], (error, resData) => {
                if (error) throw error;
                if (resData.affectedRows == 0) {
                  return res.json({ msg: "ບໍ່ສາມາດໂຫວດໄດ້" });
                } else {
                  return res.json({
                    type: "success",
                    msg: "ໂຫວດສຳເຫຼັດ",
                  });
                }
              });
            }
          }
        );
      }
    },
    );
  } catch (error) {
    return console.log(error);
  }
};

// See your own point

export const GetMySum_Controller = async (req, res) => {
  try {
    const USER_ID = await authID(req.headers["token"]);
    const con = getConnection();
    con.query(GETMYCOMMENT, [USER_ID], (err, result) => {
      if (err) throw err;
      const count = result.length;
      con.query(GETMYSUM, [USER_ID], (err, result) => {
        if (err) throw err;
        if (result === undefined || result.length <= 0) {
          return res.json({ msg: "ບໍ່ມີຂໍ້ມູນ" });
        } else {
          const total = result[0].sumpoint / count;
          let percent = total * 10;
          if (result[0].sumpoint == null) {
            result[0].sumpoint = 0;
            percent = 0;
          }
          return res.json({
            type: "success",
            percent: percent,
            sumpoint: result[0].sumpoint,
            email: result[0].email,
          });
        }
      });
    });
  } catch (error) {
    return console.log(error);
  }
};
//  See all point and feetback of someuser.

export const GetAllCommentOfUser_Controller = async (req, res) => {
  try {
    const USER_ID = await authID(req.headers["token"]);
    const { team_id, user_id } = req.body;
    if (!team_id) return res.json({ msg: "ກະລຸນາເລືອກທີມຂອງເຈົ້າ" });
    if (!user_id)
      return res.json({ msg: "ກະລຸນາເລືອກຄົນທີ່ເຈົ້າຕ້ອງການເບີ່ງ" });
    const con = getConnection();

    con.query(CHECKMEMBEROFTEAM, [USER_ID, team_id], (err, result) => {
      if (err) throw err;
      if (result === undefined || result.length <= 0) {
        return res.json({ msg: "ບໍ່ມີສິດເບີ່ງຂໍ້ມູນ" });
      } else {
        con.query(GETALLCOMMENTOFUSER, [team_id, user_id], (err, result) => {
          if (err) throw err;
          const allcomment = result;
          const count = result.length;
          con.query(GETSUMPOINT, [team_id, user_id], (err, result) => {
            if (err) throw err;
            if (result === undefined || result.length <= 0) {
              return res.json({ msg: "ບໍ່ມີຂໍ້ມູນ" });
            } else {
              const percent = (result[0].sumpoint / count) * 10;

              return res.json({
                type: "success",
                sumpoint: result[0].sumpoint,
                percent: percent,
                result: allcomment,
              });
            }
          });
        });
      }
    });
  } catch (error) {
    return console.log(error);
  }
};
