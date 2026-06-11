const Database = require("better-sqlite3");
const path = require("path");

const db = new Database(path.join(__dirname, "artemis.db"));

db.pragma("foreign_keys = ON");

db.exec(`
  CREATE TABLE IF NOT EXISTS DEVICE (
    device_id INTEGER PRIMARY KEY AUTOINCREMENT,
    serial_number TEXT NOT NULL,
    model_name TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS INTERFACE (
    interface_id INTEGER PRIMARY KEY AUTOINCREMENT,
    ip_address TEXT,
    mac_address TEXT NOT NULL,
    device_id INTEGER NOT NULL,
    FOREIGN KEY (device_id) REFERENCES DEVICE(device_id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS MAINTENANCE_LOG (
    log_id INTEGER PRIMARY KEY AUTOINCREMENT,
    service_date TEXT NOT NULL,
    description TEXT,
    device_id INTEGER NOT NULL,
    FOREIGN KEY (device_id) REFERENCES DEVICE(device_id) ON DELETE CASCADE
  );
`);
try {
  const count = db.prepare("SELECT COUNT(*) as count FROM DEVICE").get();
  if (count && count.count === 0) {
    console.log("🌱 Seeding database with initial Artemis Asset data...");
    db.exec(`
      INSERT INTO DEVICE (serial_number, model_name) VALUES ('DESKTOP-01', 'Dell Tower');
      INSERT INTO DEVICE (serial_number, model_name) VALUES ('LAPTOP-OFFICE', 'HP Laptop');
      INSERT INTO DEVICE (serial_number, model_name) VALUES ('HR-LPT-03', 'Lenovo');
      INSERT INTO DEVICE (serial_number, model_name) VALUES ('SWITCH-RM1', 'Cisco Switch');
      INSERT INTO DEVICE (serial_number, model_name) VALUES ('TEMP-TABLET', 'iPad');

      INSERT INTO INTERFACE (ip_address, mac_address, device_id) VALUES ('192.168.1.5', 'AA:BB:CC:DD:EE:01', 1);
      INSERT INTO INTERFACE (ip_address, mac_address, device_id) VALUES (NULL, 'AA:BB:CC:DD:EE:02', 2);
      INSERT INTO INTERFACE (ip_address, mac_address, device_id) VALUES ('192.168.1.10', 'AA:BB:CC:DD:EE:03', 3);
      INSERT INTO INTERFACE (ip_address, mac_address, device_id) VALUES (NULL, 'AA:BB:CC:DD:EE:04', 4);
      INSERT INTO INTERFACE (ip_address, mac_address, device_id) VALUES ('192.168.1.15', 'AA:BB:CC:DD:EE:05', 5);

      INSERT INTO MAINTENANCE_LOG (service_date, description, device_id) VALUES ('2026-05-01', 'Fixed it', 1);
      INSERT INTO MAINTENANCE_LOG (service_date, description, device_id) VALUES ('2026-05-02', 'Screen was cracked', 3);
      INSERT INTO MAINTENANCE_LOG (service_date, description, device_id) VALUES ('2026-05-03', 'Update', 4);
      INSERT INTO MAINTENANCE_LOG (service_date, description, device_id) VALUES ('2026-05-04', 'New battery', 2);
      INSERT INTO MAINTENANCE_LOG (service_date, description, device_id) VALUES ('2026-05-05', 'Cleaned fans', 5);
    `);
  }
} catch (error) {
  console.error("⚠️ Database seeding skipped or encountered an error:", error.message);
}

module.exports = db;