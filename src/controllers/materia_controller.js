import Materia from '../models/materia_model.js';


import connection from '../database.js';

export const getMaterias = async (req, res) => {
    try {
        const db = await connection();
        const [rows] = await db.query('SELECT * FROM Materia');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createMateria = async (req, res) => {
    const { nombre, codigo, descripcion, creditos } = req.body;
    try {
        const db = await connection();
        const [result] = await db.query(
            'INSERT INTO Materia (nombre, codigo, descripcion, creditos) VALUES (?, ?, ?, ?)', 
            [nombre, codigo, descripcion, creditos]
        );
        res.status(201).json({ id: result.insertId, nombre, codigo, descripcion, creditos });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateMateria = async (req, res) => {
    const { id } = req.params;
    const { nombre, codigo, descripcion, creditos } = req.body;
    try {
        const db = await connection();
        const [result] = await db.query(
            'UPDATE Materia SET nombre = ?, codigo = ?, descripcion = ?, creditos = ? WHERE id = ?', 
            [nombre, codigo, descripcion, creditos, id]
        );
        if (result.affectedRows > 0) {
            res.json({ id, nombre, codigo, descripcion, creditos });
        } else {
            res.status(404).json({ message: "Materia no encontrada" });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteMateria = async (req, res) => {
    const { id } = req.params;
    try {
        const db = await connection();
        const [result] = await db.query('DELETE FROM Materia WHERE id = ?', [id]);
        if (result.affectedRows > 0) {
            res.json({ message: "Materia eliminada correctamente" });
        } else {
            res.status(404).json({ message: "Materia no encontrada" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};