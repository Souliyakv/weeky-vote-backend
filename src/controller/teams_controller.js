import { authID, CheckAuth } from "../middleware/auth.js";
import UploadImage from "../config/cloudinary.js";
import { getConnection } from "../config/database.js";
import { ADDTEAM, GETTEAMOFUSER } from "../model/team.js";
import { v4 as uuidv4 } from "uuid";
import { ADDMEMBER, GETALLMEMBEROFTEAM } from "../model/memberofteam.js";

// create team ສ້າງທີມ
export const AddTeam_Controller = async (req, res) => {
  try {
    const { team_name, image_url, comment_day, description } = req.body;
    if (!team_name) return res.json({ msg: "ກະລຸນາໃສ່ຊື່ທີມຂອງເຈົ້າ" });
    const CREATER_ID = await authID(req.headers["token"]);
    const image = await UploadImage(image_url);
    const con = getConnection();
    const uid = uuidv4();
    const values = [
      [uid, team_name, image, CREATER_ID, comment_day, description],
    ];
    con.query(ADDTEAM, [values], (err, result) => {
      if (err) throw err;
      if (result.affectedRows == 0) {
        return res.json({ msg: "ບໍ່ສາມາດສ້າງຫ້ອງໄດ້" });
      } else {
        const value = [[CREATER_ID, uid, "ADMIN"]];
        con.query(ADDMEMBER, [value], (err, result) => {
          if (err) throw err;
          return res.status(201).json({ msg: "ສ້າງຫ້ອງສຳເຫຼັດ" });
        });
      }
    });
  } catch (error) {
    return console.log(error);
  }
};

//  see all team of user

export const GetTeamOfUser_Controller = async (req, res) => {
  try {
    const USER_ID = await authID(req.headers["token"]);
    const con = getConnection();
    con.query(GETTEAMOFUSER, [USER_ID], (err, result) => {
      if (err) throw err;
      if (result === undefined || result <= 0) {
        return res.json({ msg: "ບໍ່ມີທີມ" });
      } else {
        // return res.status(201).json(result);
        return res.json({
          type: "success",
          result,
        });
      }
    });
  } catch (error) {
    return console.log(error);
  }
};

//  see detail team

export const GetDetailTeam_Controller = async (req, res) => {
  try {
    const team_id = req.body.team_id;
    if (!team_id) return res.json({ msg: "ກະລຸນາເລືອກຫ້ອງຂອງເຈົ້າ" });
    const con = getConnection();
    con.query(GETALLMEMBEROFTEAM, [team_id], (err, resultData) => {
      if (err) throw err;
      return res.json({
        type: "success",
        team_id: team_id,
        team_name: resultData[0].team_name,
        image_url: resultData[0].image_url,
        comment_day: resultData[0].comment_day,
        description: resultData[0].description,
        List: resultData,
      });
    });
  } catch (error) {
    return console.log(error);
  }
};
