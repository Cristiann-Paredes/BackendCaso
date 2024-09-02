import { Schema, model } from 'mongoose';

const MatriculaSchema = new Schema({
    id: { type: Number, required: true },
    codigo: { type: Number, required: true },
    descripcion: { type: String, required: true, maxlength: 20 },
    id_estudiante: { type: Number, required: true },
    id_materia: { type: Number, required: true }
});

export default model('Matricula', MatriculaSchema);
