import Matricula from '../models/matricula_model.js';

import connection from '../database.js'; // Ajusta la ruta si es necesario

export const getMatriculas = async (_req, res) => {
    try {
        const db = await connection();
        const [rows] = await db.query('SELECT * FROM Matricula');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createMatricula = async (req, res) => {
    const { codigo, descripcion, id_estudiante, id_materia } = req.body;
    try {
        const db = await connection();
        const [result] = await db.query(
            'INSERT INTO Matricula (codigo, descripcion, id_estudiante, id_materia) VALUES (?, ?, ?, ?)', 
            [codigo, descripcion, id_estudiante, id_materia]
        );
        res.status(201).json({ id: result.insertId, codigo, descripcion, id_estudiante, id_materia });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateMatricula = async (req, res) => {
    const { id } = req.params;
    const { codigo, descripcion, id_estudiante, id_materia } = req.body;
    try {
        const db = await connection();
        const [result] = await db.query(
            'UPDATE Matricula SET codigo = ?, descripcion = ?, id_estudiante = ?, id_materia = ? WHERE id = ?',
            [codigo, descripcion, id_estudiante, id_materia, id]
        );
        if (result.affectedRows > 0) {
            res.json({ id, codigo, descripcion, id_estudiante, id_materia });
        } else {
            res.status(404).json({ message: "Matrícula no encontrada" });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteMatricula = async (req, res) => {
    const { id } = req.params;
    try {
        const db = await connection();
        const [result] = await db.query('DELETE FROM Matricula WHERE id = ?', [id]);
        if (result.affectedRows > 0) {
            res.json({ message: "Matrícula eliminada correctamente" });
        } else {
            res.status(404).json({ message: "Matrícula no encontrada" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
