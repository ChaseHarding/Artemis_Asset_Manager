const express = require("express");
//mini app that only handles routes
const router = express.Router();
const db = require("../db/connection");

//GET all devices
router.get("/", (req, res) => {
    const devices = db.prepare("SELECT * FROM DEVICE").all();
    res.json(devices)
});

// GET single device by id 
router.get("/:id", (req, res) => {
    const device = db.prepare("SELECT * FROM DEVICE WHERE device.id = ?").get(req.params.id);
    if (!device) return res.status(404).json({error: "Device not found" });
    res.json(device);
});

// POST create a new device 
router.post("/", (req, res) => {
    console.log("POST body:", req.body);
    console.log("serial_number:", JSON.stringify(req.body.serial_number));
    console.log("model_name:", JSON.stringify(req.body.model_name));
    const { serial_number , model_name } = req.body;
    if (!serial_number || !model_name) {
        console.log("type:", typeof req.body.serial_number);
        console.log("truthy:", !!req.body.serial_number);
        return res.status(400).json({ error: "serial number and model name are required "});
    }
    const result = db.prepare("INSERT INTO DEVICE (serial_number , model_name) VALUES (?, ?)").run(serial_number, model_name);
    res.status(201).json({ device_id: result.lastInsertRowid, serial_number, model_name });
});

// PUT update device
router.put("/:id", (req, res) => {
  const { serial_number, model_name } = req.body;
  const result = db.prepare("UPDATE DEVICE SET serial_number = ?, model_name = ? WHERE device_id = ?").run(serial_number, model_name, req.params.id);
  if (result.changes === 0) return res.status(404).json({ error: "Device not found" });
  res.json({ device_id: Number(req.params.id), serial_number, model_name });
});

// DELETE device (cascades to interfaces and logs)
router.delete("/:id", (req, res) => {
  const result = db.prepare("DELETE FROM DEVICE WHERE device_id = ?").run(req.params.id);
  if (result.changes === 0) return res.status(404).json({ error: "Device not found" });
  res.json({ message: "Device deleted" });
});

module.exports = router;