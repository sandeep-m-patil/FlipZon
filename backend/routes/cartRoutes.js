import express from "express";

import {
    addToCart,
    removeFromCart,
    getCart,
    updateCart

} from '../controllers/cartController.js';
import {protect} from '../middleware/authMiddleware.js'

const router = express.Router();

router.post('/add',protect,addToCart);
router.post('/remove',protect,removeFromCart);
router.get('/',protect,getCart);
router.put('/update',protect,updateCart);

export default router;