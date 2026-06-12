# Artemis Asset Manager

A full-stack IT hardware inventory and asset tracking system built for enterprise-grade auditing. Artemis provides a single source of truth for managing physical devices, network configurations, and maintenance history.

---

## Overview

In professional IT environments, tracking hardware assets across locations is critical for security, troubleshooting, and lifecycle management. Artemis solves this with a clean dashboard that gives IT teams real-time visibility into every device on the network.

---

## Features

- **Device Management** — Add, edit, and delete hardware assets with serial numbers and model info
- **Network Interfaces** — Track IP and MAC address assignments per device; flags unassigned interfaces
- **Maintenance Logs** — Full service history per device with date and description
- **Cascading Deletes** — Removing a device automatically clears its associated interfaces and logs, enforcing referential integrity
- **Device Detail View** — Click any device to see its full profile, interfaces, and maintenance history in one place
- **Live Stats Bar** — Real-time counts of total devices, configured interfaces, and maintenance logs
- **Search & Filter** — Filter across all three tables instantly

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React, JSX, CSS Variables |
| Backend *(in progress)* | Node.js, Express |
| Database | Oracle Autonomous Database (OCI) |
| Auth *(planned)* | JWT, bcrypt |

---

## Database Schema

Three normalized tables with enforced foreign key constraints:

```
DEVICE        (device_id PK, serial_number, model_name)
INTERFACE     (interface_id PK, ip_address, mac_address, device_id FK)
MAINTENANCE_LOG (log_id PK, service_date, description, device_id FK)
```

**Relationships:**
- `DEVICE` → `INTERFACE` (1:M) — one device can have many network interfaces
- `DEVICE` → `MAINTENANCE_LOG` (1:M) — one device can have many service records

---

## Project Structure

```
Artemis_Asset_Manager/
├── Frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── App.jsx
│   │   └── ArtemisAssetManager.jsx
│   ├── vite.config.js
│   └── package.json
└── Backend/
├── db/
│   └── connection.js
├── routes/
│   ├── devices.js
│   ├── interfaces.js
│   └── logs.js
├── index.js
└── package.json
```

---

## Roadmap

- [x] Relational database design and schema
- [x] React frontend dashboard with full CRUD
- [x] Search, filtering, and live stats
- [x] Node.js / Express REST API
- [x] All CRUD operations persist to Database
- [ ] Connect to Oracle Autonomous Database (OCI)
- [ ] JWT authentication and protected routes
- [ ] Deploy to Oracle Cloud Infrastructure

---

## Author

**Chase Harding**  
Full Stack Developer   
[LinkedIn](https://www.linkedin.com/in/chase-f-harding) · [GitHub](https://github.com/ChaseHarding)
