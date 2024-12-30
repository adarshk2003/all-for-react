const express = require('express');
const productController = require('../controller/productController');
const router = express.Router();
const accessControl = require("../utils/access_control").accessControl;

function setAccessControl(...accessTypes) {
    return (req, res, next) => {
        accessControl(accessTypes, req, res, next);
    };
}

router.post('/add', setAccessControl("3"), productController.addProduct);
router.get('/getproduct',productController.getProduct);
router.get('/products/others', setAccessControl("3"), productController.OtherProducts);
router.get('/products/seller/:sellerId', setAccessControl("3"), productController.getMyProducts);


module.exports = router;
