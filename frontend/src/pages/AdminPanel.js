import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './AdminPanel.css';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('users');
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (activeTab === 'users') {
      fetchUsers();
    } else if (activeTab === 'stats') {
      fetchStats();
    }
  }, [activeTab]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/admin/users', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(response.data.users);
    } catch (err) {
      toast.error('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/admin/stats', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStats(response.data.stats);
    } catch (err) {
      toast.error('Failed to fetch stats');
    } finally {
      setLoading(false);
    }
  };

  const approveUser = async (userId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`/api/admin/users/${userId}/approve`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('User approved for paid version');
      fetchUsers();
    } catch (err) {
      toast.error('Failed to approve user');
    }
  };

  const rejectUser = async (userId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`/api/admin/users/${userId}/reject`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('User rejected');
      fetchUsers();
    } catch (err) {
      toast.error('Failed to reject user');
    }
  };

  return (
    <div className="admin-panel">
      <div className="container main-content">
        <h1>🔐 Admin Panel</h1>

        <div className="admin-tabs">
          <button
            className={`admin-tab ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => setActiveTab('users')}
          >
            👥 Users Management
          </button>
          <button
            className={`admin-tab ${activeTab === 'stats' ? 'active' : ''}`}
            onClick={() => setActiveTab('stats')}
          >
            📊 Dashboard Stats
          </button>
          <button
            className={`admin-tab ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            ⚙️ Settings
          </button>
        </div>

        <div className="admin-content">
          {activeTab === 'users' && (
            <div className="users-section">
              <h2>User Management</h2>
              {loading ? (
                <p>Loading users...</p>
              ) : (
                <div className="users-table">
                  <table>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Status</th>
                        <th>Role</th>
                        <th>Paid</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map(user => (
                        <tr key={user._id}>
                          <td>{user.name}</td>
                          <td>{user.email}</td>
                          <td>
                            <span className={`status ${user.status}`}>
                              {user.status?.toUpperCase()}
                            </span>
                          </td>
                          <td>{user.role}</td>
                          <td>{user.isPaid ? '✓ Yes' : '✗ No'}</td>
                          <td className="actions">
                            {user.status === 'pending' && (
                              <>
                                <button
                                  className="btn-sm btn-success"
                                  onClick={() => approveUser(user._id)}
                                >
                                  Approve
                                </button>
                                <button
                                  className="btn-sm btn-danger"
                                  onClick={() => rejectUser(user._id)}
                                >
                                  Reject
                                </button>
                              </>
                            )}
                            {user.status === 'approved' && (
                              <span className="approved-badge">Approved</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {activeTab === 'stats' && (
            <div className="stats-section">
              <h2>Dashboard Statistics</h2>
              {loading ? (
                <p>Loading statistics...</p>
              ) : stats ? (
                <div className="stats-grid">
                  <div className="stat-card">
                    <h3>Total Users</h3>
                    <p className="stat-number">{stats.totalUsers}</p>
                  </div>
                  <div className="stat-card">
                    <h3>Pending Approvals</h3>
                    <p className="stat-number">{stats.pendingUsers}</p>
                  </div>
                  <div className="stat-card">
                    <h3>Approved Users</h3>
                    <p className="stat-number">{stats.approvedUsers}</p>
                  </div>
                  <div className="stat-card">
                    <h3>Paid Users</h3>
                    <p className="stat-number">{stats.paidUsers}</p>
                  </div>
                  <div className="stat-card">
                    <h3>Total Revenue</h3>
                    <p className="stat-number">₹{stats.totalRevenue}</p>
                  </div>
                </div>
              ) : null}
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="settings-section">
              <h2>Admin Settings</h2>
              <div className="settings-group">
                <h3>GitHub Integration</h3>
                <p>Link your GitHub repository to enable real-time data updates.</p>
                <div className="form-group">
                  <label htmlFor="github">GitHub Repository URL</label>
                  <input
                    id="github"
                    type="url"
                    placeholder="https://github.com/username/repo"
                  />
                </div>
                <button className="btn btn-primary">Connect GitHub</button>
              </div>

              <div className="settings-group">
                <h3>Payment Settings</h3>
                <p>Configure payment methods for user upgrades.</p>
                <div className="payment-methods">
                  <div className="method">
                    <input type="checkbox" id="upi" defaultChecked />
                    <label htmlFor="upi">UPI Payments</label>
                  </div>
                  <div className="method">
                    <input type="checkbox" id="credit" defaultChecked />
                    <label htmlFor="credit">Credit Cards</label>
                  </div>
                  <div className="method">
                    <input type="checkbox" id="debit" defaultChecked />
                    <label htmlFor="debit">Debit Cards</label>
                  </div>
                </div>
                <button className="btn btn-primary">Save Payment Settings</button>
              </div>

              <div className="settings-group">
                <h3>Razorpay Keys</h3>
                <p>Update your Razorpay payment gateway credentials.</p>
                <div className="form-group">
                  <label htmlFor="key">Razorpay Key ID</label>
                  <input id="key" type="password" placeholder="••••••••••" />
                </div>
                <div className="form-group">
                  <label htmlFor="secret">Razorpay Secret</label>
                  <input id="secret" type="password" placeholder="••••••••••" />
                </div>
                <button className="btn btn-primary">Update Keys</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
