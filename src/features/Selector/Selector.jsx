import { useEffect, useState } from "react";
import ButtonTransform from "../../UI/ButtonTransform";

function Selector({ aliens }) {
  // Estado local para manejar el alien seleccionado (reemplazar por estado global más adelante)
  const [selectedAlien, setSelectedAlien] = useState(null);

  // Lista estática de aliens (reemplazar por datos de la API más adelante)
  // const aliens = [
  //   { id: 1, name: "Four Arms" },
  //   { id: 2, name: "Heatblast" },
  //   { id: 3, name: "Diamondhead" },
  // ];

  const handleSelectChange = (event) => {
    const alienId = event.target.value;
    const alien = aliens.find((alien) => alien.id === alienId);
    setSelectedAlien(alien);
    console.log("Alien seleccionado:", alien);
  };

  // useEffect(() => {
  //   console.log("Valor de selectedAlien:", selectedAlien);
  // }, [selectedAlien]);

  return (
    <div className="my-10 rounded bg-gray-800 p-4 text-white">
      <h2 className="mb-2 text-xl">Selector de Aliens</h2>

      <div className="mb-4">
        <label htmlFor="alien-select" className="mb-2 block">
          Elige un alien:
        </label>
        <select
          id="alien-select"
          className="rounded bg-gray-700 p-2"
          onChange={handleSelectChange}
        >
          <option value="">Selecciona un alien</option>
          {aliens.map((alien) => (
            <option key={alien.id} value={alien.id}>
              {alien.nombre}
            </option>
          ))}
        </select>
      </div>

      {selectedAlien && (
        <div>
          <p>Alien seleccionado: {selectedAlien.name}</p>
          <ButtonTransform selectedAlien={selectedAlien} />
        </div>
      )}

      {/* TODO: Reemplazar el estado local con API Context para manejar el alien seleccionado */}
    </div>
  );
}

export default Selector;
