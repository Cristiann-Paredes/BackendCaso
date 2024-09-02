import { Schema, model } from 'mongoose';

const MateriaSchema = new Schema({
    id: { type: Number, required: true },
    nombre: { type: String, required: true, maxlength: 20 },
    codigo: { type: String, required: true, maxlength: 20 },
    descripcion: { type: String, required: true, maxlength: 20 },
    creditos: { type: String, required: true, maxlength: 10 }
});

export default model('Materia', MateriaSchema);
