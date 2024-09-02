import connection from '../database.js'; 

export const getEstudiantes = async (_req, res) => {
    try {
        const db = await connection();
        const [rows] = await db.query('SELECT * FROM Estudiante');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createEstudiante = async (req, res) => {
    const { nombre, apellido, cedula, fecha_nacimiento, ciudad, direccion, telefono, email } = req.body;
    try {
        const db = await connection();
        const [result] = await db.query(
            'INSERT INTO Estudiante (nombre, apellido, cedula, fecha_nacimiento, ciudad, direccion, telefono, email) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', 
            [nombre, apellido, cedula, fecha_nacimiento, ciudad, direccion, telefono, email]
        );
        res.status(201).json({ id: result.insertId, nombre, apellido, cedula, fecha_nacimiento, ciudad, direccion, telefono, email });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateEstudiante = async (req, res) => {
    const { id } = req.params;
    const { nombre, apellido, cedula, fecha_nacimiento, ciudad, direccion, telefono, email } = req.body;
    try {
        const db = await connection();
        const [result] = await db.query(
            'UPDATE Estudiante SET nombre = ?, apellido = ?, cedula = ?, fecha_nacimiento = ?, ciudad = ?, direccion = ?, telefono = ?, email = ? WHERE id = ?',
            [nombre, apellido, cedula, fecha_nacimiento, ciudad, direccion, telefono, email, id]
        );
        if (result.affectedRows > 0) {
            res.json({ id, nombre, apellido, cedula, fecha_nacimiento, ciudad, direccion, telefono, email });
        } else {
            res.status(404).json({ message: "Estudiante no encontrado" });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteEstudiante = async (req, res) => {
    const { id } = req.params;
    try {
        const db = await connection();
        const [result] = await db.query('DELETE FROM Estudiante WHERE id = ?', [id]);
        if (result.affectedRows > 0) {
            res.json({ message: "Estudiante eliminado correctamente" });
        } else {
            res.status(404).json({ message: "Estudiante no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
