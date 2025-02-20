const API_URL = "http://localhost:9000";

export async function getAliens() {
  const res = await fetch(`${API_URL}/aliensData`);

  if (!res.ok) throw new Error("Failed to fetch aliens");

  // Ajusta para extraer la propiedad correcta:
  const aliensData = await res.json();

  return aliensData; // aquí devolvemos el array de aliens
}
