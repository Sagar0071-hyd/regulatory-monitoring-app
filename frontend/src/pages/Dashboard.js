import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const sampleData = {
  'regulatory-updates': [
    { region: 'AMR', country: 'USA', regulation: 'FDA GLP-1 Compounding — Cease manufacturing', category: 'Pharma', deadline: '2026-05-22', daysLeft: 2, actionRequired: 'Halt production', source: 'FDA' },
    { region: 'EUA', country: 'India', regulation: 'CDSCO Schedule A Cosmetics — Reformulation declarations', category: 'Cosmetics', deadline: '2026-05-25', daysLeft: 5, actionRequired: 'Submit reformulation', source: 'CDSCO' },
    { region: 'EUA', country: 'EU', regulation: 'EU MDR EUDAMED — Actor Registration & UDI Database', category: 'Devices', deadline: '2026-05-26', daysLeft: 6, actionRequired: 'Register actors', source: 'EMA' },
    { region: 'EUA', country: 'India', regulation: 'MoEFCC PFAS Restriction — Consultation closes', category: 'Chemicals', deadline: '2026-05-30', daysLeft: 10, actionRequired: 'Comment on proposal', source: 'MoEFCC' },
    { region: 'AMR', country: 'USA', regulation: 'EPA Formaldehyde (Home Care) — Comment period closes', category: 'Household', deadline: '2026-05-30', daysLeft: 10, actionRequired: 'Submit comment', source: 'EPA' },
  ],
  'deadline-countdown': [
    { region: 'AMR', country: 'USA', regulation: 'FDA GLP-1 Compounding', category: 'Pharma', deadline: '2026-05-22', daysLeft: 2, severity: 'urgent' },
    { region: 'EUA', country: 'India', regulation: 'CDSCO Schedule A Cosmetics Prohibition', category: 'Cosmetics', deadline: '2026-06-01', daysLeft: 12, severity: 'urgent' },
    { region: 'EUA', country: 'EU', regulation: 'EU MDR EUDAMED — Actor Registration', category: 'Devices', deadline: '2026-05-26', daysLeft: 6, severity: 'urgent' },
    { region: 'EUA', country: 'EU', regulation: 'EU IVDR — Class C & D IVD Notified Body', category: 'Devices', deadline: '2026-05-26', daysLeft: 6, severity: 'urgent' },
    { region: 'EUA', country: 'India', regulation: 'MoEFCC PFAS Restriction', category: 'Chemicals', deadline: '2026-05-30', daysLeft: 10, severity: 'high' },
  ],
  'recalls': [
    { region: 'AMR', country: 'USA', product: 'Metformin HCl ER Tablets', company: 'Sun Pharma', category: 'Pharma', severity: 'Class I', reason: 'NDMA exceeds acceptable daily intake', date: '2026-05-20', source: 'FDA' },
    { region: 'AMR', country: 'USA', product: 'IGIV-C Intravenous Immunoglobulin', company: 'BioAtla LLC', category: 'Biologics', severity: 'Class I', reason: 'Glass fragment contamination', date: '2026-05-18', source: 'FDA' },
    { region: 'AMR', country: 'USA', product: 'ProFuel Energy Bars', company: 'NutraBiotics Inc.', category: 'Food', severity: 'Class I', reason: 'Undeclared tree nuts', date: '2026-05-15', source: 'FDA' },
    { region: 'EUA', country: 'India', product: 'Amoxicillin + Clavulanate Tablets', company: 'Cipla Limited', category: 'Pharma', severity: 'Class I', reason: 'Sub-standard quality; active content below 85%', date: '2026-05-17', source: 'CDSCO' },
    { region: 'ROW', country: 'China', product: 'InsuPump i-Pro Insulin Infusion Pump', company: 'MicroTech Medical', category: 'Devices', severity: 'Class I', reason: 'Motor failure causing uncontrolled insulin delivery', date: '2026-05-14', source: 'NMPA' },
  ],
  'ma-tracker': [
    { acquirer: 'Syneos Health', target: 'Clarivate Regulatory Intelligence', sector: 'Regulatory Tech', value: 'USD 320M', date: '2026-05-22', driver: 'Cortellis database integration' },
    { acquirer: 'ICON plc', target: 'Accellacare Regulatory Division', sector: 'Regulatory Consulting', value: 'USD 280M', date: '2026-05-20', driver: 'Regulatory advisory expansion' },
  ],
  'competitors': [
    { company: 'Veeva Systems', type: 'Solution Launch', service: 'Vault RIM AI with generative AI assistant', markets: 'Global', date: '2026-05-22' },
    { company: 'Navitas Life Sciences', type: 'Solution Launch', service: 'NavRegAI regulatory intelligence engine', markets: 'Global', date: '2026-05-20' },
    { company: 'PharmaLex (Cencora)', type: 'Center Launch', service: 'AI-Enabled Regulatory Excellence Centre', markets: 'APAC', date: '2026-05-19' },
    { company: 'Extedo', type: 'Product Release', service: 'IDMP Suite v5.0 with automated validation', markets: 'EU', date: '2026-05-18' },
  ],
  'rfi-rfp': [
    { company: 'Astellas Pharma', type: 'Innovator', service: 'Global eCTD authoring & submissions gateway', markets: 'USA, EU, Japan, China, Canada', status: 'Confirmed', timeline: '2026–2027' },
    { company: 'Bayer AG', type: 'Innovator', service: 'Cloud-native RIMS platform (100+ markets)', markets: 'Global', status: 'Confirmed', timeline: '2026–H1 2027' },
    { company: 'Takeda Pharmaceutical', type: 'Innovator', service: 'Enterprise RIMS upgrade post-Shire integration', markets: 'Global', status: 'Confirmed', timeline: '2026–2027' },
    { company: 'Sanofi SA', type: 'Innovator', service: 'AI-powered labelling & artwork management', markets: 'Global', status: 'Confirmed', timeline: '2026–H1 2027' },
  ],
  'regulatory-services': [
    { provider: 'Parexel International', type: 'FSP', service: 'Exclusive regulatory FSP for Takeda oncology portfolio', scope: '200+ licences' },
    { provider: 'Regulatory Compliance Associates (RCA)', type: 'Consulting', service: 'FDA Warning Letter remediation for generic manufacturers', scope: 'USD 18M combined' },
    { provider: 'Halloran Consulting Group', type: 'Practice Launch', service: 'EU MDR/IVDR practice with 12 specialists', scope: 'EU27' },
    { provider: 'Maetrics', type: 'Technology', service: 'AI-Powered Technical File Review for MDR Class IIb/III devices', scope: '40% faster' },
  ],
  'reg-tools': [
    { vendor: 'Master Control', tool: 'Enterprise QMS & submissions', features: '1,200-seat Hikma Pharmaceuticals deployment', launchDate: '2026-05-22' },
    { vendor: 'Compliance Quest', tool: 'MedDevice module', features: 'FDA 21 CFR Part 820 + eSTAR integration', launchDate: '2026-05-20' },
    { vendor: 'OpenText (Documentum)', tool: 'Extended ECM for Life Sciences', features: 'Sanofi global enterprise deployment (40 countries)', launchDate: '2026-05-18' },
    { vendor: 'Generis Technologies', tool: 'CARA 8.0', features: 'ISO IDMP-compliant product data model', launchDate: '2026-05-15' },
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
    { id: 'ma-tracker', label: 'M&A Tracker', icon: '📈', restricted: true },
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
                    {activeTab === 'regulatory-updates' && (
                      <>
                        <th>Region</th>
                        <th>Country</th>
                        <th>Regulation/Event</th>
                        <th>Category</th>
                        <th>Deadline</th>
                        <th>Days Left</th>
                        <th>Action Required</th>
                        <th>Source</th>
                      </>
                    )}
                    {activeTab === 'deadline-countdown' && (
                      <>
                        <th>Region</th>
                        <th>Country</th>
                        <th>Regulation/Event</th>
                        <th>Category</th>
                        <th>Deadline</th>
                        <th>Days Left</th>
                        <th>Severity</th>
                      </>
                    )}
                    {activeTab === 'recalls' && (
                      <>
                        <th>Region</th>
                        <th>Country</th>
                        <th>Product</th>
                        <th>Company</th>
                        <th>Category</th>
                        <th>Severity</th>
                        <th>Reason</th>
                        <th>Date</th>
                        <th>Source</th>
                      </>
                    )}
                    {activeTab === 'ma-tracker' && (
                      <>
                        <th>Acquirer</th>
                        <th>Target</th>
                        <th>Sector</th>
                        <th>Value</th>
                        <th>Date</th>
                        <th>Strategic Driver</th>
                      </>
                    )}
                    {activeTab === 'competitors' && (
                      <>
                        <th>Company</th>
                        <th>Type</th>
                        <th>Service/Tool</th>
                        <th>Markets</th>
                        <th>Date</th>
                      </>
                    )}
                    {activeTab === 'rfi-rfp' && (
                      <>
                        <th>Company</th>
                        <th>Type</th>
                        <th>Service Required</th>
                        <th>Markets</th>
                        <th>Status</th>
                        <th>Timeline</th>
                      </>
                    )}
                    {activeTab === 'regulatory-services' && (
                      <>
                        <th>Provider</th>
                        <th>Type</th>
                        <th>Service</th>
                        <th>Scope</th>
                      </>
                    )}
                    {activeTab === 'reg-tools' && (
                      <>
                        <th>Vendor</th>
                        <th>Tool</th>
                        <th>Features</th>
                        <th>Launch Date</th>
                      </>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, idx) => (
                    <tr key={idx}>
                      {activeTab === 'regulatory-updates' && (
                        <>
                          <td>{item.region}</td>
                          <td>{item.country}</td>
                          <td className="title">{item.regulation}</td>
                          <td>{item.category}</td>
                          <td>{item.deadline}</td>
                          <td>{item.daysLeft}d</td>
                          <td>{item.actionRequired}</td>
                          <td>{item.source}</td>
                        </>
                      )}
                      {activeTab === 'deadline-countdown' && (
                        <>
                          <td>{item.region}</td>
                          <td>{item.country}</td>
                          <td className="title">{item.regulation}</td>
                          <td>{item.category}</td>
                          <td>{item.deadline}</td>
                          <td>{item.daysLeft}d</td>
                          <td><span className={`badge severity-${item.severity}`}>{item.severity?.toUpperCase()}</span></td>
                        </>
                      )}
                      {activeTab === 'recalls' && (
                        <>
                          <td>{item.region}</td>
                          <td>{item.country}</td>
                          <td className="title">{item.product}</td>
                          <td>{item.company}</td>
                          <td>{item.category}</td>
                          <td><span className={`badge recall-${item.severity}`}>{item.severity}</span></td>
                          <td>{item.reason}</td>
                          <td>{item.date}</td>
                          <td>{item.source}</td>
                        </>
                      )}
                      {activeTab === 'ma-tracker' && (
                        <>
                          <td className="title">{item.acquirer}</td>
                          <td>{item.target}</td>
                          <td>{item.sector}</td>
                          <td><strong>{item.value}</strong></td>
                          <td>{item.date}</td>
                          <td>{item.driver}</td>
                        </>
                      )}
                      {activeTab === 'competitors' && (
                        <>
                          <td className="title">{item.company}</td>
                          <td>{item.type}</td>
                          <td>{item.service}</td>
                          <td>{item.markets}</td>
                          <td>{item.date}</td>
                        </>
                      )}
                      {activeTab === 'rfi-rfp' && (
                        <>
                          <td className="title">{item.company}</td>
                          <td>{item.type}</td>
                          <td>{item.service}</td>
                          <td>{item.markets}</td>
                          <td><span className={`badge status-${item.status}`}>{item.status}</span></td>
                          <td>{item.timeline}</td>
                        </>
                      )}
                      {activeTab === 'regulatory-services' && (
                        <>
                          <td className="title">{item.provider}</td>
                          <td>{item.type}</td>
                          <td>{item.service}</td>
                          <td>{item.scope}</td>
                        </>
                      )}
                      {activeTab === 'reg-tools' && (
                        <>
                          <td className="title">{item.vendor}</td>
                          <td>{item.tool}</td>
                          <td>{item.features}</td>
                          <td>{item.launchDate}</td>
                        </>
                      )}
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
