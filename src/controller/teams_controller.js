import { authID, CheckAuth } from "../middleware/auth.js";
import UploadImage from "../middleware/cloudinary.js";
import { getConnection } from "../middleware/database.js";
import { ADDTEAM } from "../model/team.js";
import {v4 as uuidv4} from "uuid";
import { ADDMEMBER } from "../model/memberofteam.js";

// create team ສ້າງທີມ
export const AddTeam_Controller = async(req,res)=>{
    try {
        const {team_name,image_url,comment_day,description} = req.body;
        if(!team_name) return res.json({msg:"ກະລຸນາໃສ່ຊື່ທີມຂອງເຈົ້າ"});
        const CREATER_ID = await authID(req.headers["token"]);
        const image = await UploadImage(image_url);
        const con = getConnection();
        const uid = uuidv4();
        const values = [[uid,team_name,image,CREATER_ID,comment_day,description]];
        con.query(ADDTEAM,[values],(err,result)=>{
            if(err) throw err;
            if(result.affectedRows ==0){
                return res.json({msg:"ບໍ່ສາມາດສ້າງຫ້ອງໄດ້"})
            }else{
               
                const value = [[CREATER_ID,uid,'ADMIN']];
                con.query(ADDMEMBER,[value],(err,result)=>{
                    if(err) throw err;
                     return res.status(201).json({msg:"ສ້າງຫ້ອງສຳເຫຼັດ"});
                });
            }
        });
    } catch (error) {
        return console.log(error);
    }
}
