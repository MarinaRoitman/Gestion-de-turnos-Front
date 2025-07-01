import axios from 'axios';
import { hostname } from "../utils/constants.js";

export async function getTurnosPorProfesional(profesionalId) {
  try {
    const endpoint = `${hostname}/turno/profesional/${profesionalId}`;
    const response = await axios.get(endpoint, {
      auth: {
        username: 'usuario',
        password: '1234',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error al obtener los turnos:', error);
    throw error;
  }
}

export async function reservarTurno(turno, idPaciente) {
  const url = `${hostname}/turno/${turno.id}`;

  const payload = {
    id: turno.id,
    fecha: turno.fecha,
    hora: turno.hora,
    idPaciente: idPaciente,
    idProfesional: turno.profesional.id,
    idEstado: 3, // 3 = Reservado
    idImagenes: [],
    notas: turno.notas || ""
  };

  try {
    const response = await axios.put(url, payload, {
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
    console.error('Error al reservar el turno:', error);
    throw error;
  }
}