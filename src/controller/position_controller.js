import { getConnection } from "../config/database.js";
import { GETPOSITION } from "../model/position.js";

// get all position data.  

export const GetPosition_Controller = (req, res) => {
  const con = getConnection();
  try {
    con.query(GETPOSITION, (err, result) => {
      if (err) throw err;
      return res.json({
        type: "success",
        result,
      });
    });
  } catch (error) {
    return console.log(error);
  }
};
