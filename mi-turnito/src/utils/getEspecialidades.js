export const getEspecialidadesUnicas = (medicos) => {
const todas = medicos.map((m) => m.especialidad);
  return [...new Set(todas)]; // elimina duplicados
};
