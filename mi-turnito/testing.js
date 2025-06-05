import { getProfesionales } from './src/api/profesional.js';

(async () => {
  try {
    const data = await getProfesionales();
    console.log('Profesionales recibidos:', JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error al obtener profesionales:', error);
  }
})();