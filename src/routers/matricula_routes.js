import { Router } from 'express';
import { getMatriculas, createMatricula, updateMatricula, deleteMatricula } from '../controllers/matricula_controller.js';

const router = Router();

// Obtener todas las matriculas
router.get('/', getMatriculas);

// Crear una nueva matricula
router.post('/', createMatricula);

// Actualizar una matricula existente por ID
router.put('/:id', updateMatricula);

// Eliminar una matricula por ID
router.delete('/:id', deleteMatricula);

export default router;
