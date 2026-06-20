import express from 'express';
import User from '../models/User.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Middleware to check if user is admin
const adminOnly = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    if (user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Admin access required' });
    }
    next();
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get all users
router.get('/users', protect, adminOnly, async (req, res) => {
  try {
    const users = await User.find().select('-password -resetPasswordToken');
    const stats = {
      totalUsers: users.length,
      pendingUsers: users.filter(u => u.status === 'pending').length,
      approvedUsers: users.filter(u => u.status === 'approved').length,
      rejectedUsers: users.filter(u => u.status === 'rejected').length,
      paidUsers: users.filter(u => u.isPaid).length,
    };

    res.json({ success: true, users, stats });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Get user by ID
router.get('/users/:id', protect, adminOnly, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password -resetPasswordToken');
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Approve user for paid version
router.put('/users/:id/approve', protect, adminOnly, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        status: 'approved',
        isPaid: true,
        paidTill: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
        approvedAt: new Date(),
        approvedBy: req.userId,
      },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({
      success: true,
      message: 'User approved for paid version',
      user,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Reject user
router.put('/users/:id/reject', protect, adminOnly, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        status: 'rejected',
      },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({
      success: true,
      message: 'User rejected',
      user,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Get dashboard stats
router.get('/stats', protect, adminOnly, async (req, res) => {
  try {
    const users = await User.find();
    const stats = {
      totalUsers: users.length,
      pendingUsers: users.filter(u => u.status === 'pending').length,
      approvedUsers: users.filter(u => u.status === 'approved').length,
      paidUsers: users.filter(u => u.isPaid).length,
      totalRevenue: users.reduce((sum, u) => {
        return sum + (u.paymentHistory?.reduce((psum, p) => psum + p.amount, 0) || 0);
      }, 0),
    };

    res.json({ success: true, stats });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
