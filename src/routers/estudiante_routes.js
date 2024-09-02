import { Router } from 'express';
import { getEstudiantes, createEstudiante, updateEstudiante, deleteEstudiante } from '../controllers/estudiante_controller.js';

const router = Router();

// Obtener todos los estudiantes
router.get('/', getEstudiantes);

// Crear un nuevo estudiante
router.post('/', createEstudiante);

// Actualizar un estudiante existente por ID
router.put('/:id', updateEstudiante);

// Eliminar un estudiante por ID
router.delete('/:id', deleteEstudiante);

export default router;

