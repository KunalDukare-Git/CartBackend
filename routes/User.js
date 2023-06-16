import express from 'express';
import { userSignup,userLogin,addItems} from '../controller/User';
const router = express.Router();

router.post("/userSignup", userSignup);
router.post("/userLogin",userLogin);
// router.post("/addItems",addItems);

export default router;