    const express = require('express');
    const bodyParser = require('body-parser');
    const swaggerUi = require('swagger-ui-express');
    const swaggerDocument = require('./swagger_output.json'); 
    const { v4: uuidv4 } = require('uuid');
    
    const app = express();
    const port = 3000;
    
    let phoneBook = [
        { id: uuidv4(), name: "John", phone: "1234567890" },
        { id: uuidv4(), name: "Jane", phone: "0987654321" }
    ];
    
    app.use(bodyParser.json());
    
    app.get('/TS', (req, res) => {
        res.json(phoneBook);
    });
    
    app.post('/TS', (req, res) => {
        const newPhone = { id: uuidv4(), ...req.body };
        phoneBook.push(newPhone);
        res.status(201).json({ message: "Phone added successfully" });
    });
    
    app.put('/TS', (req, res) => {
        const updateData = req.body;
        const index = phoneBook.findIndex(entry => entry.id === updateData.id);
        if (index !== -1) {
            phoneBook[index].phone = updateData.phone;
            phoneBook[index].name = updateData.name; 
            res.status(200).json({ message: "Phone updated successfully" });
        } else {
            res.status(404).json({ message: "Phone not found" });
        }
    });
    
    app.delete('/TS', (req, res) => {
        const deleteData = req.body;
        const index = phoneBook.findIndex(entry => entry.id === deleteData.id);
        if (index !== -1) {
            phoneBook.splice(index, 1);
            res.status(200).json({ message: "Phone deleted successfully" });
        } else {
            res.status(404).json({ message: "Phone not found" });
        }
    });
    
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    
    app.listen(port, () => {
        console.log(`Server is running at http://localhost:3000/api-docs`);
    });
    