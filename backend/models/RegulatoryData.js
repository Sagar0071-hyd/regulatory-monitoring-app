import mongoose from 'mongoose';

const regulatoryDataSchema = new mongoose.Schema({
  category: {
    type: String,
    enum: ['regulatory_updates', 'ma_tracker', 'deadline_countdown', 'recalls', 'competitors', 'rfi_rfp', 'regulatory_services', 'reg_tools'],
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: String,
  severity: {
    type: String,
    enum: ['urgent', 'high', 'medium', 'low'],
    default: 'medium',
  },
  region: {
    type: String,
    enum: ['AMR', 'EUA', 'ROW'],
    default: 'ROW',
  },
  country: String,
  productCategory: String,
  source: String,
  deadline: Date,
  url: String,
  contact: {
    name: String,
    email: String,
    phone: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('RegulatoryData', regulatoryDataSchema);
