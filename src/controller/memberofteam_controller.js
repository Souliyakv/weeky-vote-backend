import { authID } from "../middleware/auth.js";
import { getConnection } from "../middleware/database.js";
import { CHECKMEMBEROFTEAM, JOINTEAM } from "../model/memberofteam.js";
import { CHECKTEAM } from "../model/team.js";
//  jjoin to team ເຂົ້າຮ່ວມທີມ
export const JoinTeam_Controller = async (req, res) => {
  try {
    const team_id = req.body.team_id;
    if (!team_id) return res.json({ msg: "ກະລຸນາໃສ່ ID ຫ້ອງຂອງເຈົ້າ" });
    const USER_ID = await authID(req.headers["token"]);
    const con = getConnection();
    con.query(CHECKTEAM, [team_id], (err, result) => {
      if (err) throw err;
      if (result === undefined || result.length <= 0) {
        return res.json({ msg: "ບໍ່ມີຫ້ອງນີ້" });
      } else {
        con.query(CHECKMEMBEROFTEAM, [USER_ID, team_id], (err, result) => {
          if (err) throw err;
          if (result === undefined || result.length > 0) {
            return res.json({ msg: "ເຈົ້າຢູ່ໃນຫ້ອງນີ້ແລ້ວ" });
          } else {
            const values = [[USER_ID, team_id]];
            con.query(JOINTEAM, [values], (err, result) => {
              if (err) throw err;
              if (result.affectedRows == 0) {
                return res.json({ msg: "ບໍ່ສາມາດເຂົ້າຮ່ວມໄດ້" });
              } else {
                return res.status(201).json({ msg: "ເຂົ້າຮ່ວມສຳເຫຼັດ" });
              }
            });
          }
        });
      }
    });
  } catch (error) {
    return console.log(error);
  }
};
