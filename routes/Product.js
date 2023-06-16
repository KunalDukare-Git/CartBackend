import express from 'express';
import { addProduct,getProducts,updateProduct,deleteMultiple,deleteProduct } from '../controller/Product';
import { upload } from '../middleware/UploadImg';

const router = express.Router();

router.post("/addProduct",upload.single('image'), addProduct);
router.post("/deleteProduct", deleteProduct);
router.get("/getProducts",getProducts);
router.post("/updateProduct",upload.single('image'),updateProduct);
router.post("/deleteMultiple",deleteMultiple);

export default router;