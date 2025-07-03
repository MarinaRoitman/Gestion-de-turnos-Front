import axios from 'axios';
import { hostname } from '../utils/constants.js';

export async function getNotificacionesVisibles(pacienteId) {
  try {
    const url = `${hostname}/notificaciones/visibles/${pacienteId}`;
    const response = await axios.get(url, {
      auth: {
        username: 'usuario',
        password: '1234',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error al obtener notificaciones visibles:', error);
    throw error;
  }
}

export async function crearNotificacion(texto, idTurno, idPaciente) {
  try {
    const url = `${hostname}/notificaciones`;
    const payload = {
      texto,
      idTurno,
      idPaciente
    };

    const response = await axios.post(url, payload, {
      headers: {
        'Content-Type': 'application/json',
      },
      auth: {
        username: 'usuario',
        password: '1234',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error al crear la notificación:', error);
    throw error;
  }
}

export async function eliminarNotificacion(id) {
  try {
    const url = `${hostname}/notificaciones/eliminar/${id}`;
    const payload = { id };

    const response = await axios.put(url, payload, {
      headers: {
        'Content-Type': 'application/json',
      },
      auth: {
        username: 'usuario',
        password: '1234',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error al eliminar la notificación:', error);
    throw error;
  }
}
