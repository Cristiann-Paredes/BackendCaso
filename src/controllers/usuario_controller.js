
// Importa las librerías necesarias
import connection from '../database.js'; // Ajusta la ruta si es necesario
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Login de usuario
export const loginUsuario = async (req, res) => {
    const { email, password } = req.body;

    try {
        const db = await connection();

        // Verifica si el usuario existe
        const [usuario] = await db.query('SELECT * FROM Usuario WHERE email = ?', [email]);
        if (usuario.length === 0) {
            return res.status(401).json({ message: "Usuario o contraseña incorrectos." });
        }

        const user = usuario[0];

        // Compara la contraseña proporcionada con la almacenada en la base de datos
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: "Usuario o contraseña incorrectos." });
        }

        // Si la contraseña es correcta, genera un token JWT
        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET || 'your_jwt_secret_key', // Asegúrate de usar una clave secreta segura
            { expiresIn: '1h' } // Configura la duración del token
        );

        // Devuelve el token al cliente
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};












export const getUsuarios = async (_req, res) => {
    try {
        const db = await connection();
        const [rows] = await db.query('SELECT * FROM Usuario');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Crear un nuevo usuario
export const createUsuario = async (req, res) => {
    const { email, password, nombre, apellido } = req.body;

    try {
        const db = await connection();

        // Verificar si el usuario ya existe
        const [usuarioExistente] = await db.query('SELECT * FROM Usuario WHERE email = ?', [email]);
        if (usuarioExistente.length > 0) {
            return res.status(400).json({ message: "El usuario ya existe" });
        }

        // Hashear la contraseña
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Insertar el nuevo usuario en la base de datos
        const [result] = await db.query('INSERT INTO Usuario (nombre, apellido, email, password) VALUES (?, ?, ?, ?)', [nombre, apellido, email, hashedPassword]);

        // Devolver el usuario creado (sin la contraseña)
        res.status(201).json({
            id: result.insertId,
            nombre,
            apellido,
            email
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateUsuario = async (req, res) => {
    const { id } = req.params;
    const { nombre, apellido, email, password } = req.body;
    try {
        const db = await connection();
        const [result] = await db.query(
            'UPDATE Usuario SET nombre = ?, apellido = ?, email = ?, password = ? WHERE id = ?',
            [nombre, apellido, email, password, id]
        );
        if (result.affectedRows > 0) {
            res.json({ id, nombre, apellido, email, password });
        } else {
            res.status(404).json({ message: "Usuario no encontrado" });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteUsuario = async (req, res) => {
    const { id } = req.params;
    try {
        const db = await connection();
        const [result] = await db.query('DELETE FROM Usuario WHERE id = ?', [id]);
        if (result.affectedRows > 0) {
            res.json({ message: "Usuario eliminado correctamente" });
        } else {
            res.status(404).json({ message: "Usuario no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
