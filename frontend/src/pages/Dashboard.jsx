import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import API from '../services/api';
import './Dashboard.css';
import logo from '../assets/solace logo.png';

const IconDashboard = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="4" width="6" height="6" rx="1.3" />
    <rect x="14" y="4" width="6" height="6" rx="1.3" />
    <rect x="4" y="14" width="6" height="6" rx="1.3" />
    <rect x="14" y="14" width="6" height="6" rx="1.3" />
  </svg>
);

const IconUser = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5Z" />
    <path d="M4 20c0-3.314 3.582-6 8-6s8 2.686 8 6" />
  </svg>
);

const IconUserAdd = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 13c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5Z" />
    <path d="M8 21c0-3.314 3.582-6 8-6" />
    <path d="M6 9v6" />
    <path d="M3 12h6" />
  </svg>
);

const IconBuilding = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 21V5.8a1 1 0 0 1 .6-.92l5.8-2.53a1 1 0 0 1 .8 0l6.2 2.7a1 1 0 0 1 .6.92V21" />
    <path d="M3 21h18" />
    <path d="M9 10h1.5" />
    <path d="M13.5 10H15" />
    <path d="M9 14h1.5" />
    <path d="M13.5 14H15" />
    <path d="M12 21v-4" />
  </svg>
);

const IconChecklist = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 5h11" />
    <path d="M9 12h11" />
    <path d="M9 19h11" />
    <path d="M4 5h.01" />
    <path d="M4 12h.01" />
    <path d="M4 19h.01" />
  </svg>
);

const IconReport = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2h9l5 5v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Z" />
    <path d="M14 2v5h5" />
    <path d="M9 13h6" />
    <path d="M9 17h6" />
    <path d="M9 9h2" />
  </svg>
);

const IconCalendar = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="17" rx="2" />
    <path d="M8 3v3" />
    <path d="M16 3v3" />
    <path d="M3 10h18" />
    <path d="M8 14h2" />
    <path d="M14 14h2" />
  </svg>
);

const IconSettings = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06A1.65 1.65 0 0 0 15 19.4a1.65 1.65 0 0 0-1.5 1.6V21a2 2 0 1 1-4 0v-.1A1.65 1.65 0 0 0 8 19.4a1.65 1.65 0 0 0-1.82-.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-1.6-1.5H3a2 2 0 1 1 0-4h.1A1.65 1.65 0 0 0 4.6 8a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.6a1.65 1.65 0 0 0 1.5-1.6V3a2 2 0 1 1 4 0v.1A1.65 1.65 0 0 0 16 4.6a1.65 1.65 0 0 0 1.82.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.6 1.5H21a2 2 0 1 1 0 4h-.1A1.65 1.65 0 0 0 19.4 15Z" />
  </svg>
);

const IconSearch = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="7" />
    <path d="m16.5 16.5 3 3" />
  </svg>
);

const IconBell = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);

const IconTrendUp = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 17l6-6 4 4 7-7" />
    <path d="M14 5h7v7" />
  </svg>
);

const IconClipboard = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
    <path d="M9 12h6" />
    <path d="M9 16h4" />
  </svg>
);

const emptyAgent = { name: '', email: '', phone: '', status: 'Active', location: '' };

const toneColor = {
  green: '#2ecc71',
  blue: '#4277ff',
  amber: '#f4b400',
  red: '#e74c3c',
};

const statusClass = (status) => {
  const key = (status || '').toLowerCase();
  if (key.includes('pending')) return 'status-pending';
  if (key.includes('assign')) return 'status-assigned';
  if (key.includes('active')) return 'status-active';
  if (key.includes('complete')) return 'status-completed';
  if (key.includes('cancel')) return 'status-cancelled';
  if (key.includes('inactive') || key.includes('closed')) return 'status-closed';
  return 'status-active';
};

const sampleActivities = [
  { id: 'INSP - 10245', property: 'Greenview apartments', agent: 'Bluenest realty', inspector: 'John Mathews', status: 'Pending', updatedAt: '2 mins ago' },
  { id: 'INSP - 10244', property: 'Palm residency - Villa', agent: 'Urbankey estates', inspector: 'Sarah Collins', status: 'Assigned', updatedAt: '1 hour ago' },
  { id: 'INSP - 10243', property: 'Lakeview towers', agent: 'Bluenest realty', inspector: 'Mark Robinson', status: 'Active', updatedAt: 'Today, 11.30 AM' },
  { id: 'INSP - 10242', property: 'Maple street house', agent: 'Primelet agents', inspector: 'Emma Watson', status: 'Completed', updatedAt: '2 days ago', actionLabel: 'View Report' },
  { id: 'INSP - 10243', property: 'Sunrise commercial complex', agent: 'Urbankey estates', inspector: 'David Lee', status: 'Closed', updatedAt: '3 days ago' },
  { id: 'INSP - 10242', property: 'Oakwood cottage', agent: 'Primelet agents', inspector: 'Emma Watson', status: 'Cancelled', updatedAt: '5 days ago' },
];

const navItems = [
  { key: 'dashboard', label: 'Dashboard', Icon: IconDashboard },
  { key: 'agents', label: 'Agents', Icon: IconUser },
  { key: 'inspectors', label: 'Inspectors', Icon: IconUserAdd },
  { key: 'properties', label: 'Properties', Icon: IconBuilding },
  { key: 'inspections', label: 'Inspections', Icon: IconChecklist },
  { key: 'reports', label: 'Reports', Icon: IconReport },
  { key: 'audit', label: 'Audit Logs', Icon: IconCalendar },
  { key: 'settings', label: 'Settings', Icon: IconSettings },
];

const quickActions = [
  { key: 'create-inspection', label: 'Create Inspection', hint: 'Coming soon' },
  { key: 'add-property', label: 'Add Property', hint: 'Coming soon' },
  { key: 'add-agent', label: 'Add Agent' },
  { key: 'add-inspector', label: 'Add Inspector', hint: 'Coming soon' },
];

export default function Dashboard() {
  const [agents, setAgents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingAgent, setEditingAgent] = useState(null);
  const [form, setForm] = useState(emptyAgent);
  const [deleteId, setDeleteId] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const user = useMemo(() => JSON.parse(localStorage.getItem('user') || '{}'), []);
  const activeKey = location.pathname.includes('agents') ? 'agents' : 'dashboard';

  const seedAgents = async () => {
    try {
      await Promise.all(sampleActivities.map((row, idx) => API.post('/agents', {
        name: row.agent,
        email: `${row.agent.toLowerCase().replace(/\s+/g, '')}${idx}@example.com`,
        phone: '+44 7000 000000',
        status: row.status,
        location: row.property,
      })));
      fetchAgents();
    } catch { /* ignore seed errors */ }
  };

  const fetchAgents = async () => {
    try {
      const { data } = await API.get('/agents');
      setAgents(data);
      if (data.length === 0) seedAgents();
    } catch {
      handleLogout();
    }
  };

  useEffect(() => { fetchAgents(); }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleNav = (item) => {
    if (item.key === 'dashboard') return navigate('/dashboard');
    if (item.key === 'agents') return navigate('/agents');
    if (item.key === 'settings') return handleLogout();
    alert(`${item.label} is coming soon`);
  };

  const openAdd = () => {
    setEditingAgent(null);
    setForm(emptyAgent);
    setError('');
    setShowModal(true);
  };

  const openEdit = (agent) => {
    setEditingAgent(agent);
    setForm({ name: agent.name, email: agent.email, phone: agent.phone, status: agent.status, location: agent.location });
    setError('');
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!form.name || !form.email) return setError('Name and email are required');
    try {
      if (editingAgent) {
        await API.put(`/agents/${editingAgent.id}`, form);
      } else {
        await API.post('/agents', form);
      }
      setShowModal(false);
      fetchAgents();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save');
    }
  };

  const handleDelete = async () => {
    try {
      await API.delete(`/agents/${deleteId}`);
      setDeleteId(null);
      fetchAgents();
    } catch {
      alert('Delete failed');
    }
  };

  const statsCards = [
    { label: 'Total Clients', value: 200, progress: 86, tone: 'green', Icon: IconTrendUp },
    { label: 'Total Properties', value: 10, progress: 48, tone: 'green', Icon: IconTrendUp },
    { label: 'Total Inspections', value: 2, progress: 24, tone: 'red', Icon: IconClipboard },
    { label: 'Pending Inspections', value: 2, progress: 40, tone: 'amber', Icon: IconClipboard },
    { label: 'Closed Inspections', value: 10, progress: 72, tone: 'amber', Icon: IconClipboard },
  ];

  const apiRows = agents.slice(0, 6).map((agent, idx) => ({
    id: agent.id ? `AGT-${String(agent.id).padStart(4, '0')}` : `AGT-${idx + 101}`,
    property: agent.location || '—',
    agent: agent.name,
    inspector: agent.email,
    status: agent.status || 'Active',
    updatedAt: 'Just now',
    isFromApi: true,
    origin: agent,
  }));

  const activities = [...sampleActivities, ...apiRows];

  const displayName = user.name || 'Dinesh Karthick';
  const initials = (displayName || 'A').split(' ').map((p) => p[0]).filter(Boolean).join('').slice(0, 2).toUpperCase();

  return (
    <div className="dashboard-shell">
      <div className="dashboard-frame">

        <aside className="sidebar">
          <div className="brand">
            <img src={logo} alt="Solace logo" />
            <div className="brand-name">Alphagnito</div>
          </div>
          <div className="brand-separator" />

          <div className="nav-list">
            {navItems.map((item) => (
              <button
                type="button"
                key={item.key}
                className={`nav-item ${item.key === activeKey ? 'active' : ''}`}
                onClick={() => handleNav(item)}
              >
                <span className="icon"><item.Icon /></span>
                <span>{item.label}</span>
              </button>
            ))}
            <button type="button" className="nav-item" onClick={handleLogout}>
              <span className="icon">⏻</span>
              <span>Logout</span>
            </button>
          </div>

          <div className="sidebar-footer">Solace CRM • Dashboard</div>
        </aside>

        <main className="main-panel">

          <div className="topbar">
            <div className="search-box">
              <IconSearch />
              <input type="text" placeholder="Search agents, inspectors etc" />
            </div>
            <div className="topbar-actions">
              <button className="icon-button" type="button" aria-label="Notifications">
                <IconBell />
                <span className="notif-dot" />
              </button>
              <div className="user-chip">
                <div className="avatar">{initials}</div>
                <div>
                  <div className="user-name">{displayName}</div>
                  <div className="user-role">{user.role || 'Admin'}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="stats-grid">
            {statsCards.map((card) => (
              <div key={card.label} className="stat-card">
                <div className={`stat-icon tint-${card.tone}`}>
                  <card.Icon />
                </div>
                <div className="stat-label">{card.label}</div>
                <div className="stat-value">{card.value}</div>
                <div className="progress-track">
                  <div
                    className={`progress-fill fill-${card.tone}`}
                    style={{ width: `${Math.min(card.progress, 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="section">
            <div className="section-title">Quick actions</div>
            <div className="quick-actions">
              {quickActions.map((action) => (
                <div
                  key={action.key}
                  className="action-card"
                  role="button"
                  tabIndex={0}
                  onClick={action.key === 'add-agent' ? openAdd : () => action.hint && alert(action.hint)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') (action.key === 'add-agent' ? openAdd() : action.hint && alert(action.hint));
                  }}
                >
                  <div className="action-icon">＋</div>
                  <div className="action-label">{action.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="section table-card">
            <div className="section-title">Recent Activity</div>
            <div className="table-head">
              <span>Inspection ID</span>
              <span>Property</span>
              <span>Agent</span>
              <span>Inspector</span>
              <span>Status</span>
              <span>Last Updated</span>
              <span>Action</span>
            </div>

            {activities.length === 0 && (
              <div className="empty-state">
                Nothing to show yet. Add your first agent to populate the dashboard.
              </div>
            )}

            {activities.map((row) => (
              <div key={`${row.id}-${row.inspector}`} className="table-row">
                <span>{row.id}</span>
                <span title={row.property}>{row.property}</span>
                <span>{row.agent}</span>
                <span>{row.inspector}</span>
                <span>
                  <span className={`status-pill ${statusClass(row.status)}`}>{row.status}</span>
                </span>
                <span>{row.updatedAt}</span>
                <span className="action-buttons">
                  {row.isFromApi ? (
                    <>
                      <button className="link-btn" type="button" onClick={() => openEdit(row.origin)}>Edit</button>
                      <button className="link-btn" type="button" onClick={() => setDeleteId(row.origin?.id)}>Delete</button>
                    </>
                  ) : (
                    <span className="action-link">{row.actionLabel || 'View'}</span>
                  )}
                </span>
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* Add / Edit Agent Modal */}
      {showModal && (
        <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.55)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0" style={{ borderRadius: '16px' }}>
              <div className="modal-header border-0 pb-0 px-4 pt-4">
                <h5 className="modal-title fw-bold" style={{ color: '#1a2f4e' }}>
                  {editingAgent ? 'Edit Agent' : 'Add New Agent'}
                </h5>
                <button className="btn-close" onClick={() => setShowModal(false)} />
              </div>
              <div className="modal-body px-4">
                {error && <div className="alert alert-danger py-2 small">{error}</div>}
                {[
                  { label: 'Full Name', field: 'name', type: 'text' },
                  { label: 'Email', field: 'email', type: 'email' },
                  { label: 'Phone', field: 'phone', type: 'tel' },
                  { label: 'Location', field: 'location', type: 'text' },
                ].map(({ label, field, type }) => (
                  <div className="mb-3" key={field}>
                    <label className="form-label fw-semibold small">{label}</label>
                    <input
                      type={type}
                      className="form-control"
                      placeholder={`Enter ${label.toLowerCase()}`}
                      value={form[field]}
                      onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                      style={{ borderRadius: '8px' }}
                    />
                  </div>
                ))}
                <div className="mb-3">
                  <label className="form-label fw-semibold small">Status</label>
                  <select
                    className="form-select"
                    style={{ borderRadius: '8px' }}
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value })}
                  >
                    {['Pending', 'Assigned', 'Active', 'Completed', 'Closed', 'Cancelled'].map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="modal-footer border-0 px-4 pb-4 pt-0">
                <button className="btn btn-light px-4" style={{ borderRadius: '8px' }} onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button
                  className="btn text-white px-4 fw-semibold"
                  style={{ background: '#1a2f4e', borderRadius: '8px', border: 'none' }}
                  onClick={handleSave}
                >
                  {editingAgent ? 'Update Agent' : 'Add Agent'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.55)' }}>
          <div className="modal-dialog modal-dialog-centered modal-sm">
            <div className="modal-content border-0 text-center p-4" style={{ borderRadius: '16px' }}>
              <div style={{ fontSize: '40px' }}>⚠️</div>
              <h6 className="fw-bold mt-2 mb-1">Delete Agent?</h6>
              <p className="text-muted small mb-4">This action cannot be undone.</p>
              <div className="d-flex gap-2 justify-content-center">
                <button className="btn btn-light px-4" onClick={() => setDeleteId(null)}>Cancel</button>
                <button className="btn btn-danger px-4" onClick={handleDelete}>Yes, Delete</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
