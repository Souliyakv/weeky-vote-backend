import express from "express";
import { JoinTeam_Controller } from "../controller/memberofteam_controller.js";
import { GetPosition_Controller } from "../controller/position_controller.js";
import { AddTeam_Controller, GetDetailTeam_Controller, GetTeamOfUser_Controller } from "../controller/teams_controller.js";
import { Login_Controller, Register_Controller } from "../controller/user_controller.js";
import { CheckAuth } from "../middleware/auth.js";

const router = express.Router();
 const user = '/user';

 router.post(user+'/register',Register_Controller);
 router.post(user+'/login',Login_Controller);

 const position = '/position';
 router.get(position+'/getposition',GetPosition_Controller);

 const teams = '/teams';
 router.post(teams+'/addteam',CheckAuth,AddTeam_Controller);
 router.post(teams+'/jointeam',CheckAuth,JoinTeam_Controller);
 router.get(teams+'/GetTeamOfUser',CheckAuth,GetTeamOfUser_Controller);
 router.get(teams+'/GetDetailTeam',CheckAuth,GetDetailTeam_Controller);

export default router;