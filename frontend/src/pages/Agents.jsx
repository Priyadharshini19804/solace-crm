import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';
import './Dashboard.css';
import logo from '../assets/solace logo.png';

const EyeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EditIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
  </svg>
);

const TrashIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 6h18" />
    <path d="M8 6V4h8v2" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
    <path d="M10 11v6" />
    <path d="M14 11v6" />
  </svg>
);

const emptyAgent = { name: '', email: '', phone: '', status: 'Active', location: '' };

const navItems = [
  { key: 'dashboard', label: 'Dashboard', icon: '🏠' },
  { key: 'agents', label: 'Agents', icon: '👥' },
  { key: 'inspectors', label: 'Inspectors', icon: '🧑‍💼' },
  { key: 'properties', label: 'Properties', icon: '🏢' },
  { key: 'inspections', label: 'Inspections', icon: '📋' },
  { key: 'reports', label: 'Reports', icon: '🧾' },
  { key: 'audit', label: 'Audit Logs', icon: '🗂️' },
  { key: 'settings', label: 'Settings', icon: '⚙️' },
];

const statusClass = (status) => {
  const key = (status || '').toLowerCase();
  if (key.includes('inactive')) return 'status-pending';
  if (key.includes('suspend')) return 'status-cancelled';
  if (key.includes('active')) return 'status-completed';
  return 'status-active';
};

const statusOptions = ['All', 'Pending', 'Assigned', 'Active', 'Completed', 'Closed', 'Cancelled'];

export default function Agents() {
  const [agents, setAgents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingAgent, setEditingAgent] = useState(null);
  const [form, setForm] = useState(emptyAgent);
  const [deleteId, setDeleteId] = useState(null);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('All');
  const navigate = useNavigate();
  const activeKey = 'agents';
  const user = useMemo(() => JSON.parse(localStorage.getItem('user') || '{}'), []);

  const handleNav = (item) => {
    if (item.key === 'dashboard') return navigate('/dashboard');
    if (item.key === 'agents') return navigate('/agents');
    if (item.key === 'settings') return handleLogout();
    alert(`${item.label} is coming soon`);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const seedAgents = async () => {
    const sample = [
      { name: 'Michael', agent: 'Bluenest realty', property: 'Greenview apartments', status: 'Active', phone: '+44 7911 234567', properties: 18, inspections: 42 },
      { name: 'Olivia haris', agent: 'Urbankey estates', property: 'Palm residency - Villa', status: 'Active', phone: '+44 8911 234567', properties: 2, inspections: 10 },
      { name: 'Daniel', agent: 'Bluenest realty', property: 'Lakeview towers', status: 'Inactive', phone: '+44 7822 456789', properties: 18, inspections: 20 },
      { name: 'Wilson', agent: 'City homes', property: 'Maple street house', status: 'Active', phone: '+44 7822 456879', properties: 10, inspections: 10 },
      { name: 'Sophie', agent: 'City homes', property: 'Sunrise commercial complex', status: 'Suspended', phone: '+44 7700 112233', properties: 12, inspections: 10 },
      { name: 'Turner bruno', agent: 'Primelet agents', property: 'Oakwood cottage', status: 'Active', phone: '+44 7555 998877', properties: 20, inspections: 20 },
      { name: 'Bucky', agent: 'Bluenest realty', property: 'Greenview apartments', status: 'Active', phone: '+44 7911 234567', properties: 18, inspections: 42 },
      { name: 'William Butcher', agent: 'Urbankey estates', property: 'Palm residency - Villa', status: 'Inactive', phone: '+44 8911 234567', properties: 18, inspections: 10 },
      { name: 'John', agent: 'Bluenest realty', property: 'Lakeview towers', status: 'Active', phone: '+44 7822 456789', properties: 18, inspections: 20 },
      { name: 'Carter', agent: 'Primelet agents', property: 'Maple street house', status: 'Suspended', phone: '+44 7822 456879', properties: 18, inspections: 10 },
      { name: 'Willy', agent: 'Urbankey estates', property: 'Sunrise commercial complex', status: 'Inactive', phone: '+44 7700 112233', properties: 18, inspections: 10 },
      { name: 'Mike', agent: 'Primelet agents', property: 'Oakwood cottage', status: 'Active', phone: '+44 7555 998877', properties: 18, inspections: 20 },
    ];
    try {
      await Promise.all(sample.map((row, idx) => API.post('/agents', {
        name: row.name,
        email: `${row.name.toLowerCase().replace(/\s+/g, '')}${idx}@example.com`,
        phone: row.phone,
        status: row.status,
        location: row.property,
        properties: row.properties,
        inspections: row.inspections,
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

  const filtered = agents.filter((a) => {
    const term = search.toLowerCase();
    const matchSearch = !term || [a.name, a.email, a.location].some((v) => (v || '').toLowerCase().includes(term));
    const matchStatus = status === 'All' || (a.status || '').toLowerCase() === status.toLowerCase();
    return matchSearch && matchStatus;
  });

  const tableData = (filtered.length ? filtered : agents).map((agent, idx) => ({
    ...agent,
    company: agent.location || '—',
    properties: agent.properties ?? agent.propertiesCount ?? 0,
    inspections: agent.inspections ?? agent.inspectionsCount ?? 0,
    phone: agent.phone || '+44 7xxx xxxx',
    key: agent.id || idx,
  }));

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

          <div className="nav-list">
            {navItems.map((item) => (
              <button
                type="button"
                key={item.key}
                className={`nav-item ${item.key === activeKey ? 'active' : ''}`}
                onClick={() => handleNav(item)}
              >
                <span className="icon">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
            <button type="button" className="nav-item" onClick={handleLogout}>
              <span className="icon">⏻</span>
              <span>Logout</span>
            </button>
          </div>

          <div className="sidebar-footer">Solace CRM • Agents</div>
        </aside>

        <main className="main-panel">
          <div className="topbar">
            <div className="search-box">
              <span role="img" aria-label="search">🔍</span>
              <input type="text" placeholder="Search agents, inspectors etc" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <div className="topbar-actions">
              <button className="icon-button" type="button" aria-label="Notifications">
                <span role="img" aria-label="bell">🔔</span>
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

          <div className="section table-card">
            <div className="controls-row">
              <div className="search-lite">
                <span role="img" aria-label="search">🔍</span>
                <input
                  type="text"
                  placeholder="Search agents"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div className="filter-group">
                <select className="status-select pill-select" value={status} onChange={(e) => setStatus(e.target.value)}>
                  {statusOptions.map((opt) => <option key={opt}>{opt}</option>)}
                </select>
                <button className="primary-btn dark" type="button" onClick={openAdd}>＋ Add Agents</button>
              </div>
            </div>

            <div className="table-head agents-head">
              <span>Agent Name</span>
              <span>Company Name</span>
              <span>Email</span>
              <span>Phone</span>
              <span>Properties</span>
              <span>Inspections</span>
              <span>Status</span>
              <span>Actions</span>
            </div>

            {tableData.length === 0 && (
              <div className="empty-state">No agents found. Adjust filters or add a new agent.</div>
            )}

            {tableData.map((row) => (
              <div key={row.key} className="table-row agents-row">
                <span>{row.name}</span>
                <span>{row.company}</span>
                <span>{row.email}</span>
                <span>{row.phone}</span>
                <span>{row.properties}</span>
                <span>{row.inspections}</span>
                <span>
                  <span className={`status-pill ${statusClass(row.status)}`}>{row.status || 'Active'}</span>
                </span>
                <span className="actions-inline">
                  <button className="action-icon view" type="button" aria-label="View"><EyeIcon /></button>
                  <button className="action-icon edit" type="button" aria-label="Edit" onClick={() => openEdit(row)}><EditIcon /></button>
                  <button className="action-icon delete" type="button" aria-label="Delete" onClick={() => setDeleteId(row.id)}><TrashIcon /></button>
                </span>
              </div>
            ))}

            <div className="pagination-bar">
              <div className="pagination-meta">1 of {Math.max(tableData.length, 1)} rows selected</div>
              <div className="pagination-controls">
                <button className="ghost-btn" type="button" disabled>‹ Previous</button>
                <div className="page-numbers">
                  <button className="page active" type="button">1</button>
                  <button className="page" type="button">2</button>
                  <button className="page" type="button">3</button>
                </div>
                <button className="ghost-btn" type="button" disabled>Next ›</button>
              </div>
            </div>
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
                  { label: 'Location / Company', field: 'location', type: 'text' },
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
