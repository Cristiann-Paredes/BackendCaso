// IMPORTAR LA VARIABLE APP
import app from './server.js';

// IMPORTAR LA FUNCIÓN CONNECTION
import connection from './database.js';

// USO DE LA FUNCIÓN CONNECTION
connection();

// INICIAR EL SERVIDOR EN EL PUERTO 3000
app.listen(app.get('port'), () => {
    console.log(`Server ok on http://localhost:${app.get('port')}`);
});
