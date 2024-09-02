import { Router } from 'express';
import { getMaterias, createMateria, updateMateria, deleteMateria } from '../controllers/materia_controller.js';

const router = Router();

// Obtener todas las materias
router.get('/', getMaterias);

// Crear una nueva materia
router.post('/', createMateria);

// Actualizar una materia existente por ID
router.put('/:id', updateMateria);

// Eliminar una materia por ID
router.delete('/:id', deleteMateria);

export default router;
