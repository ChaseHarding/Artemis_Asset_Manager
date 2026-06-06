const express = require("express");
const router = express.Router();
const db = require("../db/connection");

// GET all interfaces
router.get("/", (req, res) => {
  const interfaces = db.prepare(`
    SELECT i.*, d.serial_number, d.model_name 
    FROM INTERFACE i
    JOIN DEVICE d ON i.device_id = d.device_id
  `).all();
  res.json(interfaces);
});

// GET interfaces for a specific device
router.get("/device/:device_id", (req, res) => {
  const interfaces = db.prepare(`
    SELECT * FROM INTERFACE WHERE device_id = ?
  `).all(req.params.device_id);
  res.json(interfaces);
});

// POST create interface
router.post("/", (req, res) => {
  const { ip_address, mac_address, device_id } = req.body;
  if (!mac_address || !device_id) {
    return res.status(400).json({ error: "mac_address and device_id are required" });
  }
  const result = db.prepare(`
    INSERT INTO INTERFACE (ip_address, mac_address, device_id) VALUES (?, ?, ?)
  `).run(ip_address || null, mac_address, device_id);
  res.status(201).json({ interface_id: result.lastInsertRowid, ip_address, mac_address, device_id });
});

// PUT update interface
router.put("/:id", (req, res) => {
  const { ip_address, mac_address, device_id } = req.body;
  const result = db.prepare(`
    UPDATE INTERFACE SET ip_address = ?, mac_address = ?, device_id = ? WHERE interface_id = ?
  `).run(ip_address || null, mac_address, device_id, req.params.id);
  if (result.changes === 0) return res.status(404).json({ error: "Interface not found" });
  res.json({ interface_id: Number(req.params.id), ip_address, mac_address, device_id });
});

// DELETE interface
router.delete("/:id", (req, res) => {
  const result = db.prepare("DELETE FROM INTERFACE WHERE interface_id = ?").run(req.params.id);
  if (result.changes === 0) return res.status(404).json({ error: "Interface not found" });
  res.json({ message: "Interface deleted" });
});

module.exports = router;