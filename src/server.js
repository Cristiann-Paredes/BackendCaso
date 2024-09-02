// Requerir los módulos
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

// Importar las rutas para cada módulo del sistema
import routerEstudiantes from './routers/estudiante_routes.js';
import routerMaterias from './routers/materia_routes.js';
import routerMatriculas from './routers/matricula_routes.js';
import routerUsuarios from './routers/usuario_routes.js';


// Inicializaciones
const app = express();
dotenv.config();

// Configuraciones
app.set('port', process.env.PORT || 3000);
app.use(cors());

// Middlewares
app.use(express.json());

// Rutas
app.use('/api/estudiantes', routerEstudiantes);
app.use('/api/materias', routerMaterias);
app.use('/api/matriculas', routerMatriculas);
app.use('/api/usuarios', routerUsuarios);

// Manejo de una ruta que no sea encontrada
app.use((req, res) => res.status(404).send("Endpoint no encontrado - 404"));

// Exportar la instancia de express por medio de app
export default app;
