import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const sampleData = {
  'regulatory-updates': [
    { title: 'EU MDR Class IIb Implantable Transition Deadline Passed', region: 'EUA', severity: 'urgent', productCategory: 'Medical Devices', createdAt: new Date('2026-05-22') },
    { title: 'FDA AI/ML PCCP Guidance - Mandatory for Class II/III Devices', region: 'AMR', severity: 'high', productCategory: 'Devices', createdAt: new Date('2026-05-20') },
    { title: 'ICH E8(R1) Phase I/II Compliance Effective - Japan PMDA', region: 'ROW', severity: 'high', productCategory: 'Pharma', createdAt: new Date('2026-05-19') },
    { title: 'CDSCO Schedule A Cosmetics Prohibition Effective', region: 'EUA', severity: 'medium', productCategory: 'Cosmetics', createdAt: new Date('2026-06-01') },
    { title: 'ECHA REACH SVHC Notification Window Extended', region: 'EUA', severity: 'medium', productCategory: 'Chemicals', createdAt: new Date('2026-05-25') },
  ],
  'deadline-countdown': [
    { title: 'FDA GLP-1 Compounding — Cease Manufacturing', region: 'AMR', severity: 'urgent', productCategory: 'Pharma', createdAt: new Date('2026-05-22') },
    { title: 'CDSCO Schedule A Cosmetics — Reformulation Declarations', region: 'EUA', severity: 'urgent', productCategory: 'Cosmetics', createdAt: new Date('2026-05-25') },
    { title: 'EU MDR EUDAMED — Actor Registration & UDI Database', region: 'EUA', severity: 'urgent', productCategory: 'Devices', createdAt: new Date('2026-05-26') },
    { title: 'EU IVDR — Class C & D IVD Notified Body Certificate', region: 'EUA', severity: 'urgent', productCategory: 'Devices', createdAt: new Date('2026-05-26') },
    { title: 'MoEFCC PFAS Restriction — Consultation Closes', region: 'EUA', severity: 'high', productCategory: 'Chemicals', createdAt: new Date('2026-05-30') },
  ],
  'recalls': [
    { title: 'Metformin HCl ER Tablets - NDMA Exceeds Acceptable Daily Intake', region: 'AMR', severity: 'urgent', productCategory: 'Pharma', createdAt: new Date('2026-05-20') },
    { title: 'IGIV-C Intravenous Immunoglobulin - Glass Fragment Contamination', region: 'AMR', severity: 'urgent', productCategory: 'Biologics', createdAt: new Date('2026-05-18') },
    { title: 'ProFuel Energy Bars - Undeclared Tree Nuts', region: 'AMR', severity: 'urgent', productCategory: 'Food', createdAt: new Date('2026-05-15') },
    { title: 'Amoxicillin + Clavulanate Tablets - Sub-standard Quality', region: 'EUA', severity: 'high', productCategory: 'Pharma', createdAt: new Date('2026-05-17') },
    { title: 'InsuPump i-Pro - Motor Failure Causing Uncontrolled Insulin Delivery', region: 'ROW', severity: 'urgent', productCategory: 'Devices', createdAt: new Date('2026-05-14') },
  ],
  'ma-tracker': [
    { title: 'Syneos Health Acquires Clarivate Regulatory Intelligence - USD 320M', region: 'AMR', severity: 'medium', productCategory: 'Services', createdAt: new Date('2026-05-22') },
    { title: 'ICON plc Acquires Accellacare Regulatory Division - USD 280M', region: 'AMR', severity: 'medium', productCategory: 'Services', createdAt: new Date('2026-05-20') },
    { title: 'Global M&A Activity in Regulatory Tech Sector', region: 'AMR', severity: 'low', productCategory: 'Services', createdAt: new Date('2026-05-18') },
  ],
  'competitors': [
    { title: 'Veeva Systems Launches Vault RIM AI with Generative AI Assistant', region: 'AMR', severity: 'medium', productCategory: 'Software', createdAt: new Date('2026-05-22') },
    { title: 'Navitas Life Sciences Introduces NavRegAI Regulatory Intelligence Engine', region: 'AMR', severity: 'medium', productCategory: 'Software', createdAt: new Date('2026-05-20') },
    { title: 'PharmaLex Opens AI-Enabled Regulatory Excellence Centre in Hyderabad', region: 'ROW', severity: 'medium', productCategory: 'Services', createdAt: new Date('2026-05-19') },
    { title: 'Extedo Releases IDMP Suite v5.0 with Automated Validation', region: 'EUA', severity: 'low', productCategory: 'Software', createdAt: new Date('2026-05-18') },
  ],
  'rfi-rfp': [
    { title: 'Astellas Pharma - Global eCTD Authoring Gateway RFP', region: 'AMR', severity: 'high', productCategory: 'Services', createdAt: new Date('2026-05-22') },
    { title: 'Bayer AG - Cloud-native RIMS Platform (100+ Markets)', region: 'EUA', severity: 'high', productCategory: 'Software', createdAt: new Date('2026-05-20') },
    { title: 'Takeda Pharmaceutical - Enterprise RIMS Upgrade RFP', region: 'ROW', severity: 'high', productCategory: 'Software', createdAt: new Date('2026-05-18') },
    { title: 'Sanofi SA - AI-Powered Labelling & Artwork Management', region: 'AMR', severity: 'high', productCategory: 'Software', createdAt: new Date('2026-05-17') },
  ],
  'regulatory-services': [
    { title: 'Parexel - Exclusive FSP for Takeda Oncology Portfolio', region: 'ROW', severity: 'medium', productCategory: 'Services', createdAt: new Date('2026-05-20') },
    { title: 'RCA - FDA Warning Letter Remediation for Generic Manufacturers', region: 'AMR', severity: 'high', productCategory: 'Services', createdAt: new Date('2026-05-18') },
    { title: 'Halloran Consulting - EU MDR/IVDR Practice Launch', region: 'EUA', severity: 'medium', productCategory: 'Services', createdAt: new Date('2026-05-15') },
    { title: 'Maetrics - AI-Powered Technical File Review for MDR Devices', region: 'EUA', severity: 'medium', productCategory: 'Software', createdAt: new Date('2026-05-12') },
  ],
  'reg-tools': [
    { title: 'Master Control - Enterprise QMS & Submissions (1,200-seat Deployment)', region: 'AMR', severity: 'medium', productCategory: 'Software', createdAt: new Date('2026-05-22') },
    { title: 'Compliance Quest - MedDevice Module Release', region: 'AMR', severity: 'medium', productCategory: 'Software', createdAt: new Date('2026-05-20') },
    { title: 'OpenText Documentum - Extended ECM for Life Sciences', region: 'EUA', severity: 'low', productCategory: 'Software', createdAt: new Date('2026-05-18') },
    { title: 'Generis Technologies - CARA 8.0 with ISO IDMP Compliance', region: 'EUA', severity: 'low', productCategory: 'Software', createdAt: new Date('2026-05-15') },
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
