import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const sampleData = {
  'regulatory-updates': [
    { title: 'FDA Approves New Drug Classification', region: 'AMR', severity: 'high', productCategory: 'Pharma', createdAt: new Date() },
    { title: 'EU Medical Device Directive Update', region: 'EUA', severity: 'medium', productCategory: 'Medical Devices', createdAt: new Date() },
    { title: 'APAC Safety Standards Review', region: 'ROW', severity: 'low', productCategory: 'Food', createdAt: new Date() },
  ],
  'deadline-countdown': [
    { title: 'ISO 13485 Compliance Deadline', region: 'EUA', severity: 'urgent', productCategory: 'Medical Devices', createdAt: new Date() },
    { title: 'Chemical Substance Registration Due', region: 'AMR', severity: 'high', productCategory: 'Chemicals', createdAt: new Date() },
  ],
  'recalls': [
    { title: 'Product Recall - Food Safety', region: 'AMR', severity: 'urgent', productCategory: 'Food', createdAt: new Date() },
    { title: 'Household Product Safety Alert', region: 'EUA', severity: 'high', productCategory: 'Household', createdAt: new Date() },
  ],
  'ma-tracker': [
    { title: 'Company Acquisition Announced', region: 'AMR', severity: 'medium', productCategory: 'Pharma', createdAt: new Date() },
    { title: 'Merger Regulatory Review', region: 'EUA', severity: 'low', productCategory: 'Chemicals', createdAt: new Date() },
  ],
  'competitors': [
    { title: 'Competitor Product Launch', region: 'AMR', severity: 'medium', productCategory: 'Pharma', createdAt: new Date() },
    { title: 'Market Share Analysis', region: 'EUA', severity: 'low', productCategory: 'Food', createdAt: new Date() },
  ],
  'rfi-rfp': [
    { title: 'RFP for Supply Chain Solutions', region: 'AMR', severity: 'high', productCategory: 'Services', createdAt: new Date() },
    { title: 'Request for Information', region: 'EUA', severity: 'medium', productCategory: 'Services', createdAt: new Date() },
  ],
  'regulatory-services': [
    { title: 'Compliance Consulting Services', region: 'AMR', severity: 'medium', productCategory: 'Services', createdAt: new Date() },
    { title: 'Legal Advisory Services', region: 'EUA', severity: 'low', productCategory: 'Services', createdAt: new Date() },
  ],
  'reg-tools': [
    { title: 'Compliance Management Software', region: 'AMR', severity: 'medium', productCategory: 'Software', createdAt: new Date() },
    { title: 'Data Analytics Platform', region: 'EUA', severity: 'low', productCategory: 'Software', createdAt: new Date() },
  ],
};

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('regulatory-updates');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [requiresUpgrade, setRequiresUpgrade] = useState(false);
  const navigate = useNavigate();

  const tabs = [
    { id: 'regulatory-updates', label: 'Regulatory Updates', icon: '📋' },
    { id: 'deadline-countdown', label: 'Deadline Countdown', icon: '⏱️' },
    { id: 'recalls', label: 'Recalls', icon: '⚠️' },
    { id: 'ma-tracker', label: 'M&A Tracker', icon: '📈' },
    { id: 'competitors', label: 'Competitors', icon: '🎯', restricted: true },
    { id: 'rfi-rfp', label: 'RFI/RFP', icon: '📄', restricted: true },
    { id: 'regulatory-services', label: 'Regulatory Services', icon: '🔧', restricted: true },
    { id: 'reg-tools', label: 'Reg. Tools', icon: '⚙️', restricted: true },
  ];

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await axios.get('/api/auth/me', {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(response.data.user);
        }
      } catch (err) {
        console.error('Failed to fetch user:', err);
      }
    };

    fetchUser();
  }, []);

  const fetchTabData = useCallback(async (tabId) => {
    setLoading(true);
    setRequiresUpgrade(false);

    try {
      const token = localStorage.getItem('token');
      if (token) {
        const response = await axios.get(`/api/data/category/${tabId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setData(response.data.data || []);
      } else {
        setData(sampleData[tabId] || []);
      }
    } catch (err) {
      if (err.response?.status === 403) {
        setRequiresUpgrade(true);
        setData([]);
      } else {
        setData(sampleData[tabId] || []);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTabData(activeTab);
  }, [activeTab, fetchTabData]);

  const currentTab = tabs.find(t => t.id === activeTab);
  const isRestricted = currentTab?.restricted;
  const canAccess = !isRestricted || (user && user.isPaid);

  return (
    <div className="dashboard">
      <div className="container main-content">
        <div className="dashboard-header">
          <h1>🌐 Regulatory Monitoring Dashboard</h1>
          {user && (
            <div className="user-info">
              <span>{user.name}</span>
              {user.isPaid ? (
                <span className="badge badge-paid">✓ Paid User</span>
              ) : (
                <span className="badge badge-free">Free User</span>
              )}
            </div>
          )}
        </div>

        <div className="tabs-container">
          <div className="tabs">
            {tabs.map(tab => (
              <button
                key={tab.id}
                className={`tab ${activeTab === tab.id ? 'active' : ''} ${tab.restricted && !canAccess ? 'locked' : ''}`}
                onClick={() => setActiveTab(tab.id)}
                title={tab.restricted && !canAccess ? 'Upgrade to access' : ''}
              >
                <span className="tab-icon">{tab.icon}</span>
                {tab.restricted && !canAccess && <span className="lock-icon">🔒</span>}
                <span className="tab-label">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="content-area">
          {requiresUpgrade && (
            <div className="upgrade-banner">
              <h3>🔒 Upgrade to Unlock Premium Content</h3>
              <p>This section is only available for paid users. Upgrade your account to access exclusive regulatory tools, competitor analysis, and more.</p>
              <button
                className="btn btn-primary"
                onClick={() => navigate('/upgrade')}
              >
                Upgrade Now
              </button>
            </div>
          )}

          {loading && !requiresUpgrade && (
            <div className="loading-state">
              <p>Loading data...</p>
            </div>
          )}

          {!loading && !requiresUpgrade && data.length === 0 && (
            <div className="empty-state">
              <p>No data available for this category yet.</p>
            </div>
          )}

          {!loading && !requiresUpgrade && data.length > 0 && (
            <div className="data-table">
              <table>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Region</th>
                    <th>Severity</th>
                    <th>Category</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, idx) => (
                    <tr key={idx}>
                      <td className="title">{item.title}</td>
                      <td>{item.region || 'N/A'}</td>
                      <td>
                        <span className={`severity ${item.severity}`}>
                          {item.severity?.toUpperCase()}
                        </span>
                      </td>
                      <td>{item.productCategory || 'N/A'}</td>
                      <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
