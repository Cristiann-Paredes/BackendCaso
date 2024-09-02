import { Schema, model } from 'mongoose';

const UsuarioSchema = new Schema({
    id: { type: Number, required: true },
    nombre: { type: String, required: true, maxlength: 30 },
    apellido: { type: String, required: true, maxlength: 20 },
    email: { type: String, required: true, unique: true, maxlength: 30 },
    password: { type: String, required: true, maxlength: 205 }
});

export default model('Usuario', UsuarioSchema);
