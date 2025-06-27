import { getProfesionales, getProfesionalPorId, getProfesionalPorEmail, getProfesionalesPorNombre
  , getProfesionalesPorEspecialidad, creteProfesional, modifyProfesional } from './src/api/profesional.js';

(async () => {
  try {
    const data = await getProfesionales();
    console.log('Profesionales recibidos:', JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error al obtener profesionales:', error);
  }
})();

/*
const profesional = await creteProfesional(
  "Laura",
  "Gómez",
  "laura.gomez@correo.com",
  "MAT-123456"
);
console.log("Profesional creado:", profesional);


const actualizado = await modifyProfesional(
  4,
  "Laura",
  "G.",
  "laura.gomez@correo.com",
  "MAT-123456"
);
console.log("Profesional actualizado:", actualizado);
*/