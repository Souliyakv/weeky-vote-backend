import { authID } from "../middleware/auth.js";
import { getConnection } from "../middleware/database.js";
import { CHECKMEMBEROFTEAM } from "../model/memberofteam.js";
import { CHECKVOTE, VOTE } from "../model/vote.js";


//  give point and feetback to user

export const Vote_Controller = async (req, res) => {
  try {
    const { team_id, user_id, point, Comment } = req.body;
    if (!team_id) return res.json({ msg: "ກະລຸນາເລືອກທີມຂອງເຈົ້າ" });
    if (!user_id) return res.json({ msg: "ກະລຸນາເລືອກຄົນທີ່ເຈົ້າຕ້ອງການໂຫວດ" });
    if (!point) return res.json({ msg: "ກະລຸນາເລືອກຄະແນນທີ່ຕ້ອງການໂຫວດ" });
    if(parseInt(point) > 10) return res.json({msg:"ຄະແນນຕ້ອງຕ່ຳກວ່າ 10 ຄະແນນ"});

    const USER_ID = await authID(req.headers["token"]);
    if(USER_ID == user_id) return res.json({msg:"ບໍ່ສາມາດໂຫວດໃຫ້ໂຕເອງໄດ້"})

    const con = getConnection();
    const month = parseInt(new Date().getMonth() + 1);

    //  set date to database for check point and feetback

    const voteDay =
      new Date().getFullYear() + "/" + month + "/" + new Date().getDate();
  
    con.query(CHECKMEMBEROFTEAM, [user_id, team_id], (err, result) => {
      if (err) throw err;
      if (result === undefined || result.length <= 0) {
        return res.json({ msg: "ບໍ່ສາມາດໃຫ້ຄະແນນໄດ້" });
      } else {
        con.query(
          CHECKVOTE,
          [team_id, USER_ID, user_id, voteDay],
          (err, result) => {
            if (err) throw err;
            if (result === undefined || result.length > 0) {
              return res.json({ msg: "ທ່ານໄດ້ໃຫ້ຄະແນນຄົນນີ້ໄປແລ້ວ" });
            } else {
            const values = [[team_id,user_id,USER_ID,point,Comment,voteDay]];
            con.query(VOTE,[values],(error,resData)=>{
                if(error) throw error;
                if(resData.affectedRows == 0){
                    return res.json({msg:"ບໍ່ສາມາດໂຫວດໄດ້"})
                }else{
                    return res.status(201).json({msg:"ໂຫວດສຳເຫຼັດ"})
                }
            });
            }
          }
        );
      }
    });
  } catch (error) {
    return console.log(error);
  }
};

//  see all point and feetback of user

export const GetVoteOfUser_Controller = async(req,res)=>{
    try {
        const USER_ID = await authID(req.headers["token"]);
    } catch (error) {
        return console.log(error);
    }
}
