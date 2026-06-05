import { useState } from "react";

const initialDevices = [
  { device_id: 1, serial_number: "DESKTOP-01", model_name: "Dell Tower" },
  { device_id: 2, serial_number: "LAPTOP-OFFICE", model_name: "HP Laptop" },
  { device_id: 3, serial_number: "HR-LPT-03", model_name: "Lenovo" },
  { device_id: 4, serial_number: "SWITCH-RM1", model_name: "Cisco Switch" },
  { device_id: 5, serial_number: "TEMP-TABLET", model_name: "iPad" },
];

const initialInterfaces = [
  { interface_id: 101, ip_address: "192.168.1.5", mac_address: "AA:BB:CC:DD:EE:01", device_id: 1 },
  { interface_id: 102, ip_address: null, mac_address: "AA:BB:CC:DD:EE:02", device_id: 2 },
  { interface_id: 103, ip_address: "192.168.1.10", mac_address: "AA:BB:CC:DD:EE:03", device_id: 3 },
  { interface_id: 104, ip_address: null, mac_address: "AA:BB:CC:DD:EE:04", device_id: 4 },
  { interface_id: 105, ip_address: "192.168.1.15", mac_address: "AA:BB:CC:DD:EE:05", device_id: 5 },
];

const initialLogs = [
  { log_id: 501, service_date: "2026-05-01", description: "Fixed it", device_id: 1 },
  { log_id: 502, service_date: "2026-05-02", description: "Screen was cracked", device_id: 3 },
  { log_id: 503, service_date: "2026-05-03", description: "Update", device_id: 4 },
  { log_id: 504, service_date: "2026-05-04", description: "New battery", device_id: 2 },
  { log_id: 505, service_date: "2026-05-05", description: "Cleaned fans", device_id: 5 },
];

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=IBM+Plex+Sans:wght@300;400;500;600&display=swap');

  :root {
    --bg: #0a0e13;
    --surface: #111820;
    --surface2: #162030;
    --border: #1e2d3d;
    --accent: #00d4ff;
    --accent2: #00ff9d;
    --accent3: #ff6b35;
    --text: #c8d8e8;
    --text-dim: #5a7a96;
    --text-bright: #e8f4ff;
    --danger: #ff4444;
    --warning: #ffaa00;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body { background: var(--bg); color: var(--text); font-family: 'IBM Plex Sans', sans-serif; }

  .app {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background: var(--bg);
    background-image:
      radial-gradient(ellipse at 10% 0%, rgba(0,212,255,0.06) 0%, transparent 50%),
      radial-gradient(ellipse at 90% 100%, rgba(0,255,157,0.04) 0%, transparent 50%);
  }

  .topbar {
    border-bottom: 1px solid var(--border);
    padding: 0 32px;
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: rgba(10,14,19,0.9);
    backdrop-filter: blur(12px);
    position: sticky;
    top: 0;
    z-index: 100;
  }

  .logo {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.15em;
    color: var(--accent);
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .logo-icon {
    width: 24px; height: 24px;
    border: 1.5px solid var(--accent);
    display: flex; align-items: center; justify-content: center;
    font-size: 11px;
  }

  .topbar-right {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 11px;
    color: var(--text-dim);
    display: flex;
    align-items: center;
    gap: 20px;
  }

  .status-dot {
    width: 6px; height: 6px;
    border-radius: 50%;
    background: var(--accent2);
    box-shadow: 0 0 8px var(--accent2);
    display: inline-block;
    margin-right: 6px;
    animation: pulse 2s ease-in-out infinite;
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.4; }
  }

  .layout {
    display: flex;
    flex: 1;
  }

  .sidebar {
    width: 220px;
    border-right: 1px solid var(--border);
    padding: 24px 0;
    display: flex;
    flex-direction: column;
    gap: 2px;
    flex-shrink: 0;
  }

  .sidebar-section {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.12em;
    color: var(--text-dim);
    padding: 0 20px 8px;
    margin-top: 16px;
  }

  .nav-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 20px;
    cursor: pointer;
    font-size: 13px;
    color: var(--text-dim);
    border-left: 2px solid transparent;
    transition: all 0.15s ease;
    background: none;
    border-right: none;
    border-top: none;
    border-bottom: none;
    width: 100%;
    text-align: left;
  }

  .nav-item:hover { color: var(--text); background: rgba(255,255,255,0.03); }
  .nav-item.active {
    color: var(--accent);
    border-left-color: var(--accent);
    background: rgba(0,212,255,0.06);
  }

  .nav-icon { width: 16px; text-align: center; font-size: 14px; }

  .badge {
    margin-left: auto;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 10px;
    background: var(--surface2);
    color: var(--text-dim);
    padding: 2px 7px;
    border-radius: 10px;
  }

  .nav-item.active .badge { background: rgba(0,212,255,0.15); color: var(--accent); }

  .main {
    flex: 1;
    padding: 32px;
    overflow-y: auto;
  }

  .page-header {
    margin-bottom: 28px;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
  }

  .page-title {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 20px;
    font-weight: 600;
    color: var(--text-bright);
    letter-spacing: 0.02em;
  }

  .page-subtitle {
    font-size: 12px;
    color: var(--text-dim);
    margin-top: 4px;
    font-family: 'IBM Plex Mono', monospace;
  }

  .stats-row {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
    margin-bottom: 28px;
  }

  .stat-card {
    background: var(--surface);
    border: 1px solid var(--border);
    padding: 20px;
    position: relative;
    overflow: hidden;
  }

  .stat-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
  }
  .stat-card.cyan::before { background: var(--accent); }
  .stat-card.green::before { background: var(--accent2); }
  .stat-card.orange::before { background: var(--accent3); }

  .stat-label {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.1em;
    color: var(--text-dim);
    margin-bottom: 10px;
  }

  .stat-value {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 32px;
    font-weight: 600;
    color: var(--text-bright);
    line-height: 1;
  }

  .stat-card.cyan .stat-value { color: var(--accent); }
  .stat-card.green .stat-value { color: var(--accent2); }
  .stat-card.orange .stat-value { color: var(--accent3); }

  .panel {
    background: var(--surface);
    border: 1px solid var(--border);
  }

  .panel-header {
    padding: 16px 20px;
    border-bottom: 1px solid var(--border);
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .panel-title {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 11px;
    letter-spacing: 0.1em;
    color: var(--text-dim);
    font-weight: 500;
  }

  .toolbar {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .search-box {
    background: var(--surface2);
    border: 1px solid var(--border);
    padding: 7px 12px;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 12px;
    color: var(--text);
    width: 220px;
    outline: none;
    transition: border-color 0.15s;
  }
  .search-box:focus { border-color: var(--accent); }
  .search-box::placeholder { color: var(--text-dim); }

  .btn {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 11px;
    letter-spacing: 0.05em;
    padding: 8px 16px;
    cursor: pointer;
    border: none;
    transition: all 0.15s;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .btn-primary {
    background: var(--accent);
    color: #000;
    font-weight: 600;
  }
  .btn-primary:hover { background: #33ddff; }

  .btn-ghost {
    background: transparent;
    border: 1px solid var(--border);
    color: var(--text-dim);
  }
  .btn-ghost:hover { border-color: var(--accent); color: var(--accent); }

  .btn-danger {
    background: transparent;
    border: 1px solid transparent;
    color: var(--danger);
    padding: 5px 10px;
    font-size: 11px;
  }
  .btn-danger:hover { border-color: var(--danger); background: rgba(255,68,68,0.08); }

  .btn-edit {
    background: transparent;
    border: 1px solid transparent;
    color: var(--text-dim);
    padding: 5px 10px;
    font-size: 11px;
  }
  .btn-edit:hover { border-color: var(--border); color: var(--text); }

  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 13px;
  }

  thead tr {
    border-bottom: 1px solid var(--border);
  }

  th {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.1em;
    color: var(--text-dim);
    text-align: left;
    padding: 12px 20px;
    font-weight: 500;
  }

  td {
    padding: 13px 20px;
    border-bottom: 1px solid rgba(30,45,61,0.5);
    color: var(--text);
    font-size: 13px;
  }

  tr:last-child td { border-bottom: none; }

  tbody tr {
    transition: background 0.1s;
  }
  tbody tr:hover { background: rgba(255,255,255,0.025); }

  .mono { font-family: 'IBM Plex Mono', monospace; font-size: 12px; }

  .chip {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 10px;
    padding: 3px 8px;
    border-radius: 2px;
    letter-spacing: 0.05em;
  }

  .chip-active { background: rgba(0,255,157,0.12); color: var(--accent2); border: 1px solid rgba(0,255,157,0.2); }
  .chip-warning { background: rgba(255,170,0,0.12); color: var(--warning); border: 1px solid rgba(255,170,0,0.2); }
  .chip-id { background: var(--surface2); color: var(--text-dim); border: 1px solid var(--border); }

  .modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.7);
    backdrop-filter: blur(4px);
    z-index: 200;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .modal {
    background: var(--surface);
    border: 1px solid var(--border);
    border-top: 2px solid var(--accent);
    width: 480px;
    max-width: 95vw;
  }

  .modal-header {
    padding: 20px 24px;
    border-bottom: 1px solid var(--border);
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .modal-title {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 12px;
    letter-spacing: 0.1em;
    color: var(--accent);
  }

  .modal-body { padding: 24px; display: flex; flex-direction: column; gap: 16px; }

  .field { display: flex; flex-direction: column; gap: 6px; }

  .field label {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.1em;
    color: var(--text-dim);
  }

  .field input, .field select, .field textarea {
    background: var(--surface2);
    border: 1px solid var(--border);
    padding: 9px 12px;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 12px;
    color: var(--text);
    outline: none;
    transition: border-color 0.15s;
    resize: vertical;
  }
  .field input:focus, .field select:focus, .field textarea:focus { border-color: var(--accent); }
  .field select option { background: var(--surface2); }

  .modal-footer {
    padding: 16px 24px;
    border-top: 1px solid var(--border);
    display: flex;
    justify-content: flex-end;
    gap: 10px;
  }

  .device-detail-header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 24px;
  }

  .back-btn {
    background: none;
    border: none;
    color: var(--text-dim);
    cursor: pointer;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 12px;
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 0;
    transition: color 0.15s;
  }
  .back-btn:hover { color: var(--accent); }

  .section-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin-top: 20px;
  }

  .empty-state {
    padding: 48px;
    text-align: center;
    color: var(--text-dim);
    font-family: 'IBM Plex Mono', monospace;
    font-size: 12px;
  }

  .confirm-modal .modal-body {
    padding: 24px;
    color: var(--text);
    font-size: 13px;
    line-height: 1.6;
  }

  .row-id {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 11px;
    color: var(--text-dim);
  }
`;

function Modal({ title, onClose, children, footer }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <span className="modal-title">{title}</span>
          <button className="btn btn-ghost" style={{ padding: '4px 10px' }} onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">{children}</div>
        {footer && <div className="modal-footer">{footer}</div>}
      </div>
    </div>
  );
}

export default function App() {
  const [view, setView] = useState("devices");
  const [devices, setDevices] = useState(initialDevices);
  const [interfaces, setInterfaces] = useState(initialInterfaces);
  const [logs, setLogs] = useState(initialLogs);
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({});
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [nextId, setNextId] = useState({ device: 6, iface: 106, log: 506 });

  const closeModal = () => { setModal(null); setForm({}); };

  // ---- Device CRUD ----
  const openAddDevice = () => { setForm({ serial_number: "", model_name: "" }); setModal("add-device"); };
  const openEditDevice = (d) => { setForm({ ...d }); setModal("edit-device"); };
  const openDeleteDevice = (d) => { setForm({ ...d }); setModal("delete-device"); };

  const saveDevice = () => {
    if (!form.serial_number || !form.model_name) return;
    if (modal === "add-device") {
      setDevices(prev => [...prev, { device_id: nextId.device, ...form }]);
      setNextId(p => ({ ...p, device: p.device + 1 }));
    } else {
      setDevices(prev => prev.map(d => d.device_id === form.device_id ? form : d));
    }
    closeModal();
  };

  const deleteDevice = () => {
    setDevices(prev => prev.filter(d => d.device_id !== form.device_id));
    setInterfaces(prev => prev.filter(i => i.device_id !== form.device_id));
    setLogs(prev => prev.filter(l => l.device_id !== form.device_id));
    if (selectedDevice?.device_id === form.device_id) setSelectedDevice(null);
    closeModal();
  };

  // ---- Interface CRUD ----
  const openAddInterface = (device_id = null) => { setForm({ ip_address: "", mac_address: "", device_id: device_id || "" }); setModal("add-interface"); };
  const openEditInterface = (i) => { setForm({ ...i }); setModal("edit-interface"); };
  const openDeleteInterface = (i) => { setForm({ ...i }); setModal("delete-interface"); };

  const saveInterface = () => {
    if (!form.mac_address || !form.device_id) return;
    if (modal === "add-interface") {
      setInterfaces(prev => [...prev, { interface_id: nextId.iface, ...form, device_id: Number(form.device_id) }]);
      setNextId(p => ({ ...p, iface: p.iface + 1 }));
    } else {
      setInterfaces(prev => prev.map(i => i.interface_id === form.interface_id ? { ...form, device_id: Number(form.device_id) } : i));
    }
    closeModal();
  };

  const deleteInterface = () => {
    setInterfaces(prev => prev.filter(i => i.interface_id !== form.interface_id));
    closeModal();
  };

  // ---- Log CRUD ----
  const openAddLog = (device_id = null) => { setForm({ service_date: "", description: "", device_id: device_id || "" }); setModal("add-log"); };
  const openEditLog = (l) => { setForm({ ...l }); setModal("edit-log"); };
  const openDeleteLog = (l) => { setForm({ ...l }); setModal("delete-log"); };

  const saveLog = () => {
    if (!form.service_date || !form.device_id) return;
    if (modal === "add-log") {
      setLogs(prev => [...prev, { log_id: nextId.log, ...form, device_id: Number(form.device_id) }]);
      setNextId(p => ({ ...p, log: p.log + 1 }));
    } else {
      setLogs(prev => prev.map(l => l.log_id === form.log_id ? { ...form, device_id: Number(form.device_id) } : l));
    }
    closeModal();
  };

  const deleteLog = () => {
    setLogs(prev => prev.filter(l => l.log_id !== form.log_id));
    closeModal();
  };

  const f = (val) => form[val] ?? "";
  const setF = (key, val) => setForm(p => ({ ...p, [key]: val }));

  const filteredDevices = devices.filter(d =>
    d.serial_number.toLowerCase().includes(search.toLowerCase()) ||
    d.model_name.toLowerCase().includes(search.toLowerCase())
  );

  const filteredInterfaces = interfaces.filter(i => {
    const device = devices.find(d => d.device_id === i.device_id);
    return (
      (i.ip_address || "").includes(search) ||
      i.mac_address.toLowerCase().includes(search.toLowerCase()) ||
      (device?.model_name || "").toLowerCase().includes(search.toLowerCase())
    );
  });

  const filteredLogs = logs.filter(l => {
    const device = devices.find(d => d.device_id === l.device_id);
    return (
      (l.description || "").toLowerCase().includes(search.toLowerCase()) ||
      (device?.serial_number || "").toLowerCase().includes(search.toLowerCase())
    );
  });

  // Device detail view
  const deviceInterfaces = selectedDevice ? interfaces.filter(i => i.device_id === selectedDevice.device_id) : [];
  const deviceLogs = selectedDevice ? logs.filter(l => l.device_id === selectedDevice.device_id) : [];

  return (
    <>
      <style>{styles}</style>
      <div className="app">
        {/* Topbar */}
        <div className="topbar">
          <div className="logo">
            <div className="logo-icon">A</div>
            ARTEMIS ASSET MANAGER
          </div>
          <div className="topbar-right">
            <span><span className="status-dot" />SYSTEM ONLINE</span>
            <span>{devices.length} DEVICES TRACKED</span>
          </div>
        </div>

        <div className="layout">
          {/* Sidebar */}
          <div className="sidebar">
            <div className="sidebar-section">INVENTORY</div>
            {[
              { id: "devices", icon: "🖥", label: "Devices", count: devices.length },
              { id: "interfaces", icon: "🔌", label: "Interfaces", count: interfaces.length },
              { id: "logs", icon: "📋", label: "Maint. Logs", count: logs.length },
            ].map(item => (
              <button
                key={item.id}
                className={`nav-item ${view === item.id && !selectedDevice ? "active" : ""}`}
                onClick={() => { setView(item.id); setSelectedDevice(null); setSearch(""); }}
              >
                <span className="nav-icon">{item.icon}</span>
                {item.label}
                <span className="badge">{item.count}</span>
              </button>
            ))}

            <div className="sidebar-section">SYSTEM</div>
            <button className="nav-item" onClick={() => { setView("devices"); setSelectedDevice(null); setSearch(""); }}>
              <span className="nav-icon">◈</span>
              Overview
            </button>
          </div>

          {/* Main */}
          <div className="main">
            {/* Overview Stats (always visible) */}
            {!selectedDevice && (
              <div className="stats-row">
                <div className="stat-card cyan">
                  <div className="stat-label">TOTAL DEVICES</div>
                  <div className="stat-value">{devices.length}</div>
                </div>
                <div className="stat-card green">
                  <div className="stat-label">CONFIGURED INTERFACES</div>
                  <div className="stat-value">{interfaces.filter(i => i.ip_address).length}/{interfaces.length}</div>
                </div>
                <div className="stat-card orange">
                  <div className="stat-label">MAINTENANCE LOGS</div>
                  <div className="stat-value">{logs.length}</div>
                </div>
              </div>
            )}

            {/* Device Detail */}
            {selectedDevice && (
              <div>
                <div className="device-detail-header">
                  <button className="back-btn" onClick={() => setSelectedDevice(null)}>← BACK</button>
                  <span style={{ color: 'var(--text-dim)', fontFamily: 'monospace', fontSize: 12 }}>/</span>
                  <span style={{ fontFamily: 'IBM Plex Mono', fontSize: 13, color: 'var(--accent)' }}>{selectedDevice.serial_number}</span>
                </div>
                <div className="panel" style={{ marginBottom: 20 }}>
                  <div className="panel-header">
                    <span className="panel-title">DEVICE RECORD</span>
                    <div className="toolbar">
                      <button className="btn btn-ghost" onClick={() => openEditDevice(selectedDevice)}>✎ EDIT</button>
                      <button className="btn btn-danger" onClick={() => openDeleteDevice(selectedDevice)}>✕ DELETE</button>
                    </div>
                  </div>
                  <table>
                    <tbody>
                      <tr><td style={{ color: 'var(--text-dim)', fontFamily: 'IBM Plex Mono', fontSize: 11, width: 160 }}>DEVICE ID</td><td className="mono">{selectedDevice.device_id}</td></tr>
                      <tr><td style={{ color: 'var(--text-dim)', fontFamily: 'IBM Plex Mono', fontSize: 11 }}>SERIAL NUMBER</td><td className="mono">{selectedDevice.serial_number}</td></tr>
                      <tr><td style={{ color: 'var(--text-dim)', fontFamily: 'IBM Plex Mono', fontSize: 11 }}>MODEL</td><td>{selectedDevice.model_name}</td></tr>
                    </tbody>
                  </table>
                </div>
                <div className="section-grid">
                  <div className="panel">
                    <div className="panel-header">
                      <span className="panel-title">INTERFACES ({deviceInterfaces.length})</span>
                      <button className="btn btn-primary" style={{ padding: '5px 12px', fontSize: 10 }} onClick={() => openAddInterface(selectedDevice.device_id)}>+ ADD</button>
                    </div>
                    {deviceInterfaces.length === 0 ? <div className="empty-state">NO INTERFACES</div> : (
                      <table>
                        <thead><tr><th>MAC ADDRESS</th><th>IP ADDRESS</th><th></th></tr></thead>
                        <tbody>
                          {deviceInterfaces.map(i => (
                            <tr key={i.interface_id}>
                              <td className="mono">{i.mac_address}</td>
                              <td>{i.ip_address ? <span className="chip chip-active">{i.ip_address}</span> : <span className="chip chip-warning">UNASSIGNED</span>}</td>
                              <td style={{ display: 'flex', gap: 4 }}>
                                <button className="btn btn-edit" onClick={() => openEditInterface(i)}>✎</button>
                                <button className="btn btn-danger" onClick={() => openDeleteInterface(i)}>✕</button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                  <div className="panel">
                    <div className="panel-header">
                      <span className="panel-title">MAINTENANCE ({deviceLogs.length})</span>
                      <button className="btn btn-primary" style={{ padding: '5px 12px', fontSize: 10 }} onClick={() => openAddLog(selectedDevice.device_id)}>+ ADD</button>
                    </div>
                    {deviceLogs.length === 0 ? <div className="empty-state">NO LOGS</div> : (
                      <table>
                        <thead><tr><th>DATE</th><th>DESCRIPTION</th><th></th></tr></thead>
                        <tbody>
                          {deviceLogs.map(l => (
                            <tr key={l.log_id}>
                              <td className="mono" style={{ whiteSpace: 'nowrap' }}>{l.service_date}</td>
                              <td style={{ fontSize: 12 }}>{l.description}</td>
                              <td style={{ display: 'flex', gap: 4 }}>
                                <button className="btn btn-edit" onClick={() => openEditLog(l)}>✎</button>
                                <button className="btn btn-danger" onClick={() => openDeleteLog(l)}>✕</button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Devices Table */}
            {view === "devices" && !selectedDevice && (
              <div className="panel">
                <div className="panel-header">
                  <span className="panel-title">DEVICES</span>
                  <div className="toolbar">
                    <input className="search-box" placeholder="Search devices..." value={search} onChange={e => setSearch(e.target.value)} />
                    <button className="btn btn-primary" onClick={openAddDevice}>+ ADD DEVICE</button>
                  </div>
                </div>
                {filteredDevices.length === 0 ? <div className="empty-state">NO DEVICES FOUND</div> : (
                  <table>
                    <thead><tr><th>ID</th><th>SERIAL NUMBER</th><th>MODEL</th><th>INTERFACES</th><th>LOGS</th><th></th></tr></thead>
                    <tbody>
                      {filteredDevices.map(d => (
                        <tr key={d.device_id} style={{ cursor: 'pointer' }} onClick={() => setSelectedDevice(d)}>
                          <td><span className="chip chip-id">{d.device_id}</span></td>
                          <td className="mono">{d.serial_number}</td>
                          <td>{d.model_name}</td>
                          <td><span className="chip chip-active">{interfaces.filter(i => i.device_id === d.device_id).length}</span></td>
                          <td><span className="chip chip-warning">{logs.filter(l => l.device_id === d.device_id).length}</span></td>
                          <td onClick={e => e.stopPropagation()} style={{ display: 'flex', gap: 4 }}>
                            <button className="btn btn-edit" onClick={() => openEditDevice(d)}>✎</button>
                            <button className="btn btn-danger" onClick={() => openDeleteDevice(d)}>✕</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            )}

            {/* Interfaces Table */}
            {view === "interfaces" && !selectedDevice && (
              <div className="panel">
                <div className="panel-header">
                  <span className="panel-title">NETWORK INTERFACES</span>
                  <div className="toolbar">
                    <input className="search-box" placeholder="Search interfaces..." value={search} onChange={e => setSearch(e.target.value)} />
                    <button className="btn btn-primary" onClick={() => openAddInterface()}>+ ADD INTERFACE</button>
                  </div>
                </div>
                <table>
                  <thead><tr><th>ID</th><th>MAC ADDRESS</th><th>IP ADDRESS</th><th>DEVICE</th><th></th></tr></thead>
                  <tbody>
                    {filteredInterfaces.map(i => {
                      const device = devices.find(d => d.device_id === i.device_id);
                      return (
                        <tr key={i.interface_id}>
                          <td><span className="chip chip-id">{i.interface_id}</span></td>
                          <td className="mono">{i.mac_address}</td>
                          <td>{i.ip_address ? <span className="chip chip-active">{i.ip_address}</span> : <span className="chip chip-warning">UNASSIGNED</span>}</td>
                          <td style={{ cursor: 'pointer', color: 'var(--accent)' }} onClick={() => { setSelectedDevice(device); setView("devices"); }}>{device?.model_name}</td>
                          <td style={{ display: 'flex', gap: 4 }}>
                            <button className="btn btn-edit" onClick={() => openEditInterface(i)}>✎</button>
                            <button className="btn btn-danger" onClick={() => openDeleteInterface(i)}>✕</button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}

            {/* Logs Table */}
            {view === "logs" && !selectedDevice && (
              <div className="panel">
                <div className="panel-header">
                  <span className="panel-title">MAINTENANCE LOGS</span>
                  <div className="toolbar">
                    <input className="search-box" placeholder="Search logs..." value={search} onChange={e => setSearch(e.target.value)} />
                    <button className="btn btn-primary" onClick={() => openAddLog()}>+ ADD LOG</button>
                  </div>
                </div>
                <table>
                  <thead><tr><th>ID</th><th>DATE</th><th>DEVICE</th><th>DESCRIPTION</th><th></th></tr></thead>
                  <tbody>
                    {filteredLogs.map(l => {
                      const device = devices.find(d => d.device_id === l.device_id);
                      return (
                        <tr key={l.log_id}>
                          <td><span className="chip chip-id">{l.log_id}</span></td>
                          <td className="mono">{l.service_date}</td>
                          <td style={{ cursor: 'pointer', color: 'var(--accent)' }} onClick={() => { setSelectedDevice(device); setView("devices"); }}>{device?.serial_number}</td>
                          <td style={{ fontSize: 12 }}>{l.description}</td>
                          <td style={{ display: 'flex', gap: 4 }}>
                            <button className="btn btn-edit" onClick={() => openEditLog(l)}>✎</button>
                            <button className="btn btn-danger" onClick={() => openDeleteLog(l)}>✕</button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ---- Modals ---- */}

      {/* Add/Edit Device */}
      {(modal === "add-device" || modal === "edit-device") && (
        <Modal
          title={modal === "add-device" ? "ADD NEW DEVICE" : "EDIT DEVICE"}
          onClose={closeModal}
          footer={<><button className="btn btn-ghost" onClick={closeModal}>CANCEL</button><button className="btn btn-primary" onClick={saveDevice}>SAVE</button></>}
        >
          <div className="field"><label>SERIAL NUMBER *</label><input value={f("serial_number")} onChange={e => setF("serial_number", e.target.value)} placeholder="e.g. DESKTOP-01" /></div>
          <div className="field"><label>MODEL NAME *</label><input value={f("model_name")} onChange={e => setF("model_name", e.target.value)} placeholder="e.g. Dell Tower" /></div>
        </Modal>
      )}

      {/* Delete Device */}
      {modal === "delete-device" && (
        <Modal title="CONFIRM DELETE" onClose={closeModal} footer={<><button className="btn btn-ghost" onClick={closeModal}>CANCEL</button><button className="btn btn-primary" style={{ background: 'var(--danger)', color: '#fff' }} onClick={deleteDevice}>DELETE</button></>}>
          <div style={{ fontSize: 13, lineHeight: 1.7, color: 'var(--text)' }}>
            Delete <strong style={{ color: 'var(--accent)', fontFamily: 'IBM Plex Mono' }}>{form.serial_number}</strong>?
            <br /><br />
            <span style={{ color: 'var(--danger)', fontFamily: 'IBM Plex Mono', fontSize: 11 }}>⚠ This will also delete all associated interfaces and maintenance logs.</span>
          </div>
        </Modal>
      )}

      {/* Add/Edit Interface */}
      {(modal === "add-interface" || modal === "edit-interface") && (
        <Modal
          title={modal === "add-interface" ? "ADD INTERFACE" : "EDIT INTERFACE"}
          onClose={closeModal}
          footer={<><button className="btn btn-ghost" onClick={closeModal}>CANCEL</button><button className="btn btn-primary" onClick={saveInterface}>SAVE</button></>}
        >
          <div className="field"><label>DEVICE *</label>
            <select value={f("device_id")} onChange={e => setF("device_id", e.target.value)}>
              <option value="">Select device...</option>
              {devices.map(d => <option key={d.device_id} value={d.device_id}>{d.serial_number} — {d.model_name}</option>)}
            </select>
          </div>
          <div className="field"><label>MAC ADDRESS *</label><input value={f("mac_address")} onChange={e => setF("mac_address", e.target.value)} placeholder="AA:BB:CC:DD:EE:FF" /></div>
          <div className="field"><label>IP ADDRESS (optional)</label><input value={f("ip_address") || ""} onChange={e => setF("ip_address", e.target.value || null)} placeholder="192.168.1.x" /></div>
        </Modal>
      )}

      {/* Delete Interface */}
      {modal === "delete-interface" && (
        <Modal title="CONFIRM DELETE" onClose={closeModal} footer={<><button className="btn btn-ghost" onClick={closeModal}>CANCEL</button><button className="btn btn-primary" style={{ background: 'var(--danger)', color: '#fff' }} onClick={deleteInterface}>DELETE</button></>}>
          <div style={{ fontSize: 13, color: 'var(--text)' }}>Delete interface <strong style={{ color: 'var(--accent)', fontFamily: 'IBM Plex Mono' }}>{form.mac_address}</strong>?</div>
        </Modal>
      )}

      {/* Add/Edit Log */}
      {(modal === "add-log" || modal === "edit-log") && (
        <Modal
          title={modal === "add-log" ? "ADD MAINTENANCE LOG" : "EDIT LOG"}
          onClose={closeModal}
          footer={<><button className="btn btn-ghost" onClick={closeModal}>CANCEL</button><button className="btn btn-primary" onClick={saveLog}>SAVE</button></>}
        >
          <div className="field"><label>DEVICE *</label>
            <select value={f("device_id")} onChange={e => setF("device_id", e.target.value)}>
              <option value="">Select device...</option>
              {devices.map(d => <option key={d.device_id} value={d.device_id}>{d.serial_number} — {d.model_name}</option>)}
            </select>
          </div>
          <div className="field"><label>SERVICE DATE *</label><input type="date" value={f("service_date")} onChange={e => setF("service_date", e.target.value)} /></div>
          <div className="field"><label>DESCRIPTION</label><textarea rows={3} value={f("description")} onChange={e => setF("description", e.target.value)} placeholder="Describe the maintenance performed..." /></div>
        </Modal>
      )}

      {/* Delete Log */}
      {modal === "delete-log" && (
        <Modal title="CONFIRM DELETE" onClose={closeModal} footer={<><button className="btn btn-ghost" onClick={closeModal}>CANCEL</button><button className="btn btn-primary" style={{ background: 'var(--danger)', color: '#fff' }} onClick={deleteLog}>DELETE</button></>}>
          <div style={{ fontSize: 13, color: 'var(--text)' }}>Delete log entry for <strong style={{ color: 'var(--accent)', fontFamily: 'IBM Plex Mono' }}>{form.service_date}</strong>?</div>
        </Modal>
      )}
    </>
  );
}
