import express from 'express';
import Razorpay from 'razorpay';
import User from '../models/User.js';
import { protect } from '../middleware/auth.js';
import crypto from 'crypto';

const router = express.Router();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create payment order
router.post('/create-order', protect, async (req, res) => {
  try {
    const { amount, planDuration } = req.body; // amount in rupees

    const options = {
      amount: amount * 100, // Razorpay expects amount in paise
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
      payment_capture: 1,
    };

    const order = await razorpay.orders.create(options);

    res.json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Verify payment and update user
router.post('/verify-payment', protect, async (req, res) => {
  try {
    const { razorpayOrderId, razorpayPaymentId, razorpaySignature, planDuration } = req.body;

    const body = razorpayOrderId + '|' + razorpayPaymentId;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest('hex');

    if (expectedSignature !== razorpaySignature) {
      return res.status(400).json({ success: false, message: 'Invalid signature' });
    }

    const user = await User.findById(req.userId);

    // Add payment to history
    const amount = Math.floor((planDuration * 99) / 30); // Assuming 99 per 30 days
    user.paymentHistory.push({
      transactionId: razorpayPaymentId,
      amount,
      paymentMethod: 'razorpay',
      status: 'completed',
    });

    // Update paid status
    user.isPaid = true;
    user.paidTill = new Date(Date.now() + planDuration * 24 * 60 * 60 * 1000);
    user.status = 'approved';
    await user.save();

    res.json({
      success: true,
      message: 'Payment verified and account upgraded',
      user,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
