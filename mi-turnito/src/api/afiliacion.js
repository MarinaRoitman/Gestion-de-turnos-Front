import axios from 'axios';
import { hostname } from '../utils/constants.js';

export async function updateAfiliacion(afiliacionId, nroAfiliado, fechaAlta, fechaFin, idObraSocial, idPlan) {
  try {
    const data = {
      id: afiliacionId,
      nroAfiliado,
      fechaAlta,
      fechaFin,
      idObraSocial,
      idPlan
    };

    const endpoint = `${hostname}/afiliacion/${afiliacionId}`;
    const response = await axios.put(endpoint, data, {
      headers: {
        'Content-Type': 'application/json'
      },
      auth: {
        username: 'usuario',
        password: '1234'
      }
    });

    return response.data;
  } catch (error) {
    console.error('Error al actualizar la afiliación:', error);
    throw error;
  }
}
