import express from 'express';
import RegulatoryData from '../models/RegulatoryData.js';
import User from '../models/User.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Get regulatory data - restricted access
router.get('/category/:category', protect, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    const { category } = req.params;

    // List of restricted categories
    const restrictedCategories = ['competitors', 'rfi_rfp', 'regulatory_services', 'reg_tools'];

    // Check if user is trying to access restricted data
    if (restrictedCategories.includes(category) && !user.isPaid) {
      return res.status(403).json({
        success: false,
        message: 'This content is only available for paid users. Please upgrade your account.',
        requiresUpgrade: true,
      });
    }

    // Map category names to match frontend expectations
    const categoryMap = {
      'regulatory-updates': 'regulatory_updates',
      'ma-tracker': 'ma_tracker',
      'deadline-countdown': 'deadline_countdown',
      'recalls': 'recalls',
      'competitors': 'competitors',
      'rfi-rfp': 'rfi_rfp',
      'regulatory-services': 'regulatory_services',
      'reg-tools': 'reg_tools',
    };

    const mappedCategory = categoryMap[category] || category;

    const data = await RegulatoryData.find({ category: mappedCategory }).limit(50);

    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Get all data by multiple categories
router.post('/get-data', protect, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    const { categories, filters } = req.body;

    const restrictedCategories = ['competitors', 'rfi_rfp', 'regulatory_services', 'reg_tools'];
    const allowedCategories = categories.filter(cat => {
      if (restrictedCategories.includes(cat) && !user.isPaid) {
        return false;
      }
      return true;
    });

    let query = { category: { $in: allowedCategories } };

    if (filters) {
      if (filters.region) query.region = filters.region;
      if (filters.country) query.country = filters.country;
      if (filters.severity) query.severity = filters.severity;
      if (filters.productCategory) query.productCategory = filters.productCategory;
    }

    const data = await RegulatoryData.find(query).limit(100);

    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Admin endpoint - Get all data
router.get('/admin/all', protect, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Admin access required' });
    }

    const data = await RegulatoryData.find();
    res.json({ success: true, data, count: data.length });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
