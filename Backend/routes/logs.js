const express = require("express");
const router = express.Router();
const db = require("../db/connection");

// GET all logs
router.get("/", (req, res) => {
  const logs = db.prepare(`
    SELECT m.*, d.serial_number, d.model_name
    FROM MAINTENANCE_LOG m
    JOIN DEVICE d ON m.device_id = d.device_id
  `).all();
  res.json(logs);
});

// GET logs for a specific device
router.get("/device/:device_id", (req, res) => {
  const logs = db.prepare(`
    SELECT * FROM MAINTENANCE_LOG WHERE device_id = ?
  `).all(req.params.device_id);
  res.json(logs);
});

// POST create log
router.post("/", (req, res) => {
  const { service_date, description, device_id } = req.body;
  if (!service_date || !device_id) {
    return res.status(400).json({ error: "service_date and device_id are required" });
  }
  const result = db.prepare(`
    INSERT INTO MAINTENANCE_LOG (service_date, description, device_id) VALUES (?, ?, ?)
  `).run(service_date, description || null, device_id);
  res.status(201).json({ log_id: result.lastInsertRowid, service_date, description, device_id });
});

// PUT update log
router.put("/:id", (req, res) => {
  const { service_date, description, device_id } = req.body;
  const result = db.prepare(`
    UPDATE MAINTENANCE_LOG SET service_date = ?, description = ?, device_id = ? WHERE log_id = ?
  `).run(service_date, description || null, device_id, req.params.id);
  if (result.changes === 0) return res.status(404).json({ error: "Log not found" });
  res.json({ log_id: Number(req.params.id), service_date, description, device_id });
});

// DELETE log
router.delete("/:id", (req, res) => {
  const result = db.prepare("DELETE FROM MAINTENANCE_LOG WHERE log_id = ?").run(req.params.id);
  if (result.changes === 0) return res.status(404).json({ error: "Log not found" });
  res.json({ message: "Log deleted" });
});

module.exports = router;