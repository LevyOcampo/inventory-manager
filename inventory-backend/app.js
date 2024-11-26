const express = require('express');
const app = express();
const connection = require('./db');
const cors = require('cors');

app.use(cors());
app.use(express.json()); 

app.get('/', (req, res) => {
  res.send('Inventory Management API is running');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

  // Add a PC
  app.post('/pcs', (req, res) => {
    const { serial_number, model_number, processor, memory, hard_drive } = req.body;
  
    const sql = `INSERT INTO pcs (serial_number, model_number, processor, memory, hard_drive) 
                 VALUES (?, ?, ?, ?, ?)`;
    
    connection.query(sql, [serial_number, model_number, processor, memory, hard_drive], (err, result) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.status(201).json({ message: 'PC added successfully', pcId: result.insertId });
    });
  });

  //user input validation
  app.post('/pcs', (req, res) => {
    const { serial_number, model_number, processor, memory, hard_drive } = req.body;
  
    if (!serial_number || !model_number || !processor || !memory || !hard_drive) {
      return res.status(400).json({ error: 'All fields are required' });
    }
  
    const sql = `INSERT INTO pcs (serial_number, model_number, processor, memory, hard_drive) 
                 VALUES (?, ?, ?, ?, ?)`;
  
    connection.query(sql, [serial_number, model_number, processor, memory, hard_drive], (err, result) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.status(201).json({ message: 'PC added successfully', pcId: result.insertId });
    });
  });
  
  // Get all PCs
  app.get('/pcs', (req, res) => {
    const sql = 'SELECT * FROM pcs';
    connection.query(sql, (err, results) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.status(200).json(results);
    });
  });

  // Get all unassigned PCs
  app.get('/pcs/unassigned', (req, res) => {
    const sql = 'SELECT * FROM pcs WHERE assigned_to IS NULL';
    connection.query(sql, (err, results) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.status(200).json(results); // This should return the unassigned PCs
    });
  });

  //Get PC by ID
  app.get('/pcs/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM pcs WHERE id = ?';
    connection.query(sql, [id], (err, results) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.status(200).json(results[0]);
    });
  });

  //Update PC
  app.put('/pcs/:id', (req, res) => {
    const { id } = req.params;
    const { serial_number, model_number, processor, memory, hard_drive } = req.body;
  
    const sql = `UPDATE pcs SET serial_number = ?, model_number = ?, processor = ?, memory = ?, hard_drive = ?
                 WHERE id = ?`;
    
    connection.query(sql, [serial_number, model_number, processor, memory, hard_drive, id], (err, results) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.status(200).json({ message: 'PC updated successfully' });
    });
  });

  //Delete PC
  app.delete('/pcs/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM pcs WHERE id = ?';
  
    connection.query(sql, [id], (err, results) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.status(200).json({ message: 'PC deleted successfully' });
    });
  });
  


  // Create a new employee
app.post('/employees', (req, res) => {
    const { name, position, division, section } = req.body;
    const sql = `INSERT INTO employees (name, position, division, section) VALUES (?, ?, ?, ?)`;
  
    connection.query(sql, [name, position, division, section], (err, result) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to add employee' });
      }
      res.status(201).json({ message: 'Employee added', employeeId: result.insertId });
    });
  });
  
  // Get all employees
  app.get('/employees', (req, res) => {
    const sql = `SELECT * FROM employees`;
  
    connection.query(sql, (err, results) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to retrieve employees' });
      }
      res.json(results);
    });
  });
  
  
  // Add a Monitor
  app.post('/monitors', (req, res) => {
    const { acquisition_date, serial_number, model_number, size, status } = req.body;
    const sql = `INSERT INTO monitors (acquisition_date, serial_number, model_number, size, status) VALUES (?, ?, ?, ?, ?)`;
  
    connection.query(sql, [acquisition_date, serial_number, model_number, size, status], (err, result) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to add monitor' });
      }
      res.status(201).json({ message: 'Monitor added', monitorId: result.insertId });
    });
  });
  
  // Get all monitors
  app.get('/monitors', (req, res) => {
    const sql = `SELECT * FROM monitors`;
  
    connection.query(sql, (err, results) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to retrieve monitors' });
      }
      res.json(results);
    });
  });

  // Assign PC to an employee
app.put('/pcs/:pcId/assign', (req, res) => {
    const pcId = req.params.pcId;
    const { employeeId } = req.body;
  
    const sql = `UPDATE pcs SET assigned_to = ? WHERE id = ?`;
    connection.query(sql, [employeeId, pcId], (err, result) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to assign PC' });
      }
      res.json({ message: 'PC assigned to employee' });
    });
  });
  
  // Assign Monitor to an employee
  app.put('/monitors/:monitorId/assign', (req, res) => {
    const monitorId = req.params.monitorId;
    const { employeeId } = req.body;
  
    const sql = `UPDATE monitors SET assigned_to = ? WHERE id = ?`;
    connection.query(sql, [employeeId, monitorId], (err, result) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to assign monitor' });
      }
      res.json({ message: 'Monitor assigned to employee' });
    });
  });