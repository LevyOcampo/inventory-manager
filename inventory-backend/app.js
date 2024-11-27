const express = require('express');
const app = express();
const connection = require('./db');
const cors = require('cors');

app.use(cors());
app.use(express.json()); 

// Logging middleware for debugging
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Root endpoint
app.get('/', (req, res) => {
  res.send('Inventory Management API is running');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// ----------- PCs Endpoints -----------

// Add a PC with validation
app.post('/pcs', (req, res) => {
  const { serial_number, model_number, processor, memory, hard_drive, status = 'unassigned' } = req.body;

  if (!serial_number || !model_number || !processor || !memory || !hard_drive) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const sql = `INSERT INTO pcs (serial_number, model_number, processor, memory, hard_drive, status) 
               VALUES (?, ?, ?, ?, ?, ?)`;

  connection.query(sql, [serial_number, model_number, processor, memory, hard_drive, status], (err, result) => {
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

// Get a PC by ID with error handling
app.get('/pcs/:id', (req, res) => {
  const { id } = req.params;

  // Query for PC details
  const pcQuery = 'SELECT * FROM pcs WHERE id = ?';

  // Query for employee assigned to the PC
  const employeeQuery = 'SELECT * FROM employees WHERE id = (SELECT assigned_to FROM pcs WHERE id = ?)';

  // Query for Monitor assigned to the employee
  const monitorQuery = 'SELECT * FROM monitors WHERE assigned_to = ?';

  connection.query(pcQuery, [id], (err, pcResult) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    if (pcResult.length === 0) {
      res.status(404).json({ error: 'PC not found' });
      return;
    }

    const pc = pcResult[0];

    connection.query(employeeQuery, [id], (err, employeeResult) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }

      const employee = employeeResult[0] || null;

      if (!employee) {
        // If no employee is assigned, return only the PC details
        res.status(200).json({ pc, employee: null, monitor: null });
        return;
      }

      // Fetch the Monitor assigned to the employee
      connection.query(monitorQuery, [employee.id], (err, monitorResult) => {
        if (err) {
          res.status(500).json({ error: err.message });
          return;
        }

        const monitor = monitorResult[0] || null;

        // Combine results and send response
        res.status(200).json({
          pc,
          employee,
          monitor,
        });
      });
    });
  });
});




// Assign PC to an employee with validation
app.put('/pcs/:pcId/assign', (req, res) => {
  const pcId = req.params.pcId;
  const { employeeId } = req.body;

  const validateEmployee = 'SELECT * FROM employees WHERE id = ?';
  connection.query(validateEmployee, [employeeId], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ error: 'Employee not found' });
      return;
    }

    const sql = `UPDATE pcs SET assigned_to = ? WHERE id = ?`;
    connection.query(sql, [employeeId, pcId], (err, result) => {
      if (err) {
        res.status(500).json({ error: 'Failed to assign PC' });
        return;
      }
      res.json({ message: 'PC assigned to employee' });
    });
  });
});

// ----------- Employees Endpoints -----------

// Add a new employee
app.post('/employees', (req, res) => {
  const { name, position, division, section } = req.body;

  if (!name || !position || !division || !section) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const sql = `INSERT INTO employees (name, position, division, section) VALUES (?, ?, ?, ?)`;

  connection.query(sql, [name, position, division, section], (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Failed to add employee' });
      return;
    }
    res.status(201).json({ message: 'Employee added', employeeId: result.insertId });
  });
});

// Get all employees
app.get('/employees', (req, res) => {
  const sql = `SELECT * FROM employees`;
  connection.query(sql, (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Failed to retrieve employees' });
      return;
    }
    res.json(results);
  });
});

// Get an employee by ID with error handling
app.get('/employees/:id', (req, res) => {
  const { id } = req.params;

  // Query for employee details
  const employeeQuery = 'SELECT * FROM employees WHERE id = ?';

  // Query for PC assigned to the employee
  const pcQuery = 'SELECT * FROM pcs WHERE assigned_to = ?';

  // Query for Monitor assigned to the employee
  const monitorQuery = 'SELECT * FROM monitors WHERE assigned_to = ?';

  connection.query(employeeQuery, [id], (err, employeeResult) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    if (employeeResult.length === 0) {
      res.status(404).json({ error: 'Employee not found' });
      return;
    }

    const employee = employeeResult[0];

    // Fetch assigned PC
    connection.query(pcQuery, [id], (err, pcResult) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }

      const pc = pcResult[0] || null; // Null if no PC is assigned

      // Fetch assigned Monitor
      connection.query(monitorQuery, [id], (err, monitorResult) => {
        if (err) {
          res.status(500).json({ error: err.message });
          return;
        }

        const monitor = monitorResult[0] || null; // Null if no Monitor is assigned

        // Combine results and send response
        res.status(200).json({
          employee,
          pc,
          monitor,
        });
      });
    });
  });
});


// ----------- Monitors Endpoints -----------

// Add a Monitor
app.post('/monitors', (req, res) => {
  const { acquisition_date, serial_number, model_number, size, status = 'unassigned' } = req.body;

  if (!serial_number || !model_number || !size) {
    return res.status(400).json({ error: 'All fields except status are required' });
  }

  const sql = `INSERT INTO monitors (acquisition_date, serial_number, model_number, size, status) VALUES (?, ?, ?, ?, ?)`;

  connection.query(sql, [acquisition_date, serial_number, model_number, size, status], (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Failed to add monitor' });
      return;
    }
    res.status(201).json({ message: 'Monitor added', monitorId: result.insertId });
  });
});

// Get all monitors
app.get('/monitors', (req, res) => {
  const sql = `SELECT * FROM monitors`;
  connection.query(sql, (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Failed to retrieve monitors' });
      return;
    }
    res.json(results);
  });
});

// Get a Monitor by ID with error handling
app.get('/monitors/:id', (req, res) => {
  const { id } = req.params;

  // Query for monitor details
  const monitorQuery = 'SELECT * FROM monitors WHERE id = ?';

  // Query for employee assigned to the monitor
  const employeeQuery = 'SELECT * FROM employees WHERE id = (SELECT assigned_to FROM monitors WHERE id = ?)';

  // Query for PC assigned to the employee
  const pcQuery = 'SELECT * FROM pcs WHERE assigned_to = ?';

  connection.query(monitorQuery, [id], (err, monitorResult) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    if (monitorResult.length === 0) {
      res.status(404).json({ error: 'Monitor not found' });
      return;
    }

    const monitor = monitorResult[0];

    connection.query(employeeQuery, [id], (err, employeeResult) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }

      const employee = employeeResult[0] || null;

      if (!employee) {
        // If no employee is assigned, return only the monitor details
        res.status(200).json({ monitor, employee: null, pc: null });
        return;
      }

      // Fetch the PC assigned to the employee
      connection.query(pcQuery, [employee.id], (err, pcResult) => {
        if (err) {
          res.status(500).json({ error: err.message });
          return;
        }

        const pc = pcResult[0] || null;

        // Combine results and send response
        res.status(200).json({
          monitor,
          employee,
          pc,
        });
      });
    });
  });
});



// Assign Monitor to an employee with validation
app.put('/monitors/:monitorId/assign', (req, res) => {
  const monitorId = req.params.monitorId;
  const { employeeId } = req.body;

  const validateEmployee = 'SELECT * FROM employees WHERE id = ?';
  connection.query(validateEmployee, [employeeId], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ error: 'Employee not found' });
      return;
    }

    const sql = `UPDATE monitors SET assigned_to = ? WHERE id = ?`;
    connection.query(sql, [employeeId, monitorId], (err, result) => {
      if (err) {
        res.status(500).json({ error: 'Failed to assign monitor' });
        return;
      }
      res.json({ message: 'Monitor assigned to employee' });
    });
  });
});
