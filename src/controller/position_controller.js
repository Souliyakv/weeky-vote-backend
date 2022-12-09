import { getConnection } from "../middleware/database.js";
import { GETPOSITION } from "../model/position.js";


// get all pposition ດືງຂໍ້ມູນຕຳແໜ່ງທັງໝົດ

export const GetPosition_Controller = (req,res)=>{
    const con = getConnection();
    try {
        con.query(GETPOSITION,(err,result)=>{
            if(err) throw err;
            return res.status(201).json(result);
        })
    } catch (error) {
       return console.log(error); 
    }
}