const express = require('express');
const { CreateOrder, ConfirmPayment, GetMyOrders, GetVendorOrders, GetVendorCustomers } = require('../Controller/OrderController');
const { authMiddleware } = require('../Midleware/AuthMilderware');
const { vendorAuthMiddleware } = require('../Midleware/VendorAuthMiddleware');

const router = express.Router();

router.post('/', authMiddleware, CreateOrder);
router.post('/payment/confirm', authMiddleware, ConfirmPayment);
router.get('/my', authMiddleware, GetMyOrders);
router.get('/vendor', vendorAuthMiddleware, GetVendorOrders);
router.get('/vendor/customers', vendorAuthMiddleware, GetVendorCustomers);

module.exports = router;
