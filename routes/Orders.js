import express from 'express';
const router = express.Router();
import { getOrders,updateOrder} from '../controller/Order';

router.get("/getOrders", getOrders);
router.post("/updateOrder", updateOrder);

export default router;