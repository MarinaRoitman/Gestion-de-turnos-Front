import {hostname} from "../utils/constants.js";
import axios from 'axios';

export async function getProfesionales() {
  try {
    const endpoint = `${hostname}/profesional`;
    const response = await axios.get(endpoint, {
    auth: {
      username: 'usuario',
      password: '1234'
    }
  });
    return response.data;
  } catch (error) {
    console.error('Hubo un error llamando a profesionales:', error);
    throw error;
  }
}

export async function getProfesionalPorId(id) {
  try {
    const endpoint = `${hostname}/profesional/${id}`;
    const response = await axios.get(endpoint, {
      auth: {
        username: 'usuario',
        password: '1234'
      }
    });
    return response.data;
  } catch (error) {
    console.error(`Error al obtener profesional con id ${id}:`, error);
    throw error;
  }
}

export async function getProfesionalPorEmail(email) {
  try {
    const endpoint = `${hostname}/profesional/mail/${encodeURIComponent(email)}`;
    const response = await axios.get(endpoint, {
      auth: {
        username: 'usuario',
        password: '1234'
      }
    });
    return response.data;
  } catch (error) {
    console.error(`Error al obtener profesional con email ${email}:`, error);
    throw error;
  }
}

export async function getProfesionalesPorNombre(nombre) {
  try {
    const endpoint = `${hostname}/profesional/nombre/${encodeURIComponent(nombre)}`;
    const response = await axios.get(endpoint, {
      auth: {
        username: 'usuario',
        password: '1234'
      }
    });
    return response.data;
  } catch (error) {
    console.error(`Error al obtener profesionales con nombre ${nombre}:`, error);
    throw error;
  }
}

export async function getProfesionalesPorEspecialidad(idEspecialidad) {
  try {
    const endpoint = `${hostname}/profesional/especialidad/${idEspecialidad}`;
    const response = await axios.get(endpoint, {
      auth: {
        username: 'usuario',
        password: '1234'
      }
    });
    return response.data;
  } catch (error) {
    console.error(`Error al obtener profesionales con especialidad ID ${idEspecialidad}:`, error);
    throw error;
  }
}

export async function creteProfesional(nombre, apellido, mail, matricula) {
  try {
    const data = {
      nombre,
      apellido,
      mail,
      matricula
    };

    const response = await axios.post(`${hostname}/profesional`, data, {
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
    console.error('Error al crear profesional:', error);
    throw error;
  }
}

export async function modifyProfesional(id, nombre, apellido, mail, matricula) {
  try {
    const data = {
      id,
      nombre,
      apellido,
      mail,
      matricula
    };

    const response = await axios.put(`${hostname}/profesional/${id}`, data, {
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
    console.error(`Error al modificar profesional con ID ${id}:`, error);
    throw error;
  }
}