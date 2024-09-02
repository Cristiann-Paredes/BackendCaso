// routes/usuario_routes.js
import { Router } from 'express';
import { getUsuarios, createUsuario, updateUsuario, deleteUsuario, loginUsuario } from '../controllers/usuario_controller.js';

const router = Router();

// Ruta para el login del usuario
router.post('/login', loginUsuario);

// Obtener todos los usuarios
router.get('/', getUsuarios);

// Crear un nuevo usuario
router.post('/', createUsuario);

// Actualizar un usuario existente por ID
router.put('/:id', updateUsuario);

// Eliminar un usuario por ID
router.delete('/:id', deleteUsuario);

export default router;
