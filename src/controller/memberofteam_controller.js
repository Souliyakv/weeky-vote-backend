import { authID } from "../middleware/auth.js";
import { getConnection } from "../config/database.js";
import { CHECKMEMBEROFTEAM, JOINTEAM } from "../model/memberofteam.js";
import { CHECKTEAM, CHECKTEAMOFUSER } from "../model/team.js";
//  Jion team 
export const JoinTeam_Controller = async (req, res) => {
  try {
    const team_id = req.body.team_id;
    if (!team_id) return res.json({ msg: "ກະລຸນາໃສ່ ID ຫ້ອງຂອງເຈົ້າ" });

    const USER_ID = await authID(req.headers["token"]);
    const con = getConnection();
    con.query(CHECKTEAM, [team_id], (errCt, resultCt) => {
      if (errCt) throw errCt;
      if (resultCt === undefined || resultCt.length <= 0) {
        return res.json({ msg: "ບໍ່ມີຫ້ອງນີ້" });
      } else {
        con.query(CHECKTEAMOFUSER, [USER_ID], (errCtu, resultCtu) => {
          if (errCtu) throw errCtu;
          if (resultCtu === undefined || resultCtu.length <= 0) {
            // check user's team, becuase One user can join one team
            con.query(CHECKMEMBEROFTEAM, [USER_ID, team_id], (errCmt, resultCmt) => {
              if (errCmt) throw errCmt;
              if (resultCmt === undefined || resultCmt.length > 0) {
                return res.json({ msg: "ເຈົ້າຢູ່ໃນຫ້ອງນີ້ແລ້ວ" });
              } else {
                const values = [[USER_ID, team_id]];
                con.query(JOINTEAM, [values], (err, result) => {
                  if (err) throw err;
                  if (result.affectedRows == 0) {
                    return res.json({ msg: "ບໍ່ສາມາດເຂົ້າຮ່ວມໄດ້" });
                  } else {
                    return res.json({
                      type: "success",
                      team_id: team_id,
                      Status: "USER",
                      msg: "ເຂົ້າຮ່ວມສຳເຫຼັດ",
                    });
                  }
                });
              }
            });
          } else {
            return res.json({ msg: "ທ່ານມີທີມຢູ່ແລ້ວ" });
          }
        });
      }
    });
  } catch (error) {
    return console.log(error);
  }
};
