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

export async function cancelarTurno(turnoId) {
  const url = `${hostname}/turno/cancelar/${turnoId}`;

  try {
    const response = await axios.put(url, null, {
      headers: {
        'Content-Type': 'application/json',
      },
      auth: {
        username: 'usuario',
        password: '1234',
      }
    });

    return response.data;
  } catch (error) {
    console.error('Error al cancelar el turno:', error);
    throw error;
  }
}

export async function reservarTurno(idTurno, idPaciente) {
  const url = `${hostname}/turno/reservar`;

  const payload = {
    idTurno: idTurno,
    idPaciente: idPaciente
  };

  try {
    const response = await axios.put(url, payload, {
      headers: {
        'Content-Type': 'application/json',
      },
      auth: {
        username: 'usuario',
        password: '1234',
      }
    });

    return response.data;
  } catch (error) {
    console.error('Error al reservar el turno:', error);
    throw error;
  }
}

export async function getTurnosFuturosPorPaciente(pacienteId) {
  try {
    const endpoint = `${hostname}/turno/paciente/${pacienteId}`;
    const response = await axios.get(endpoint, {
      auth: {
        username: 'usuario',
        password: '1234',
      },
    });

    const turnos = response.data;

    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0); // Ignora la hora

    const turnosFuturos = turnos.filter(turno => {
      const fechaTurno = new Date(turno.fecha);
      return fechaTurno > hoy;
    });

    return turnosFuturos;
  } catch (error) {
    console.error('Error al obtener los turnos del paciente:', error);
    throw error;
  }
}