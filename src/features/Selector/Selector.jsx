import { useState } from "react";
import { useAliens } from "../../contexts/AliensContext";
import TransformationTimer from "../Transformation/TransformationTimer";
import ButtonTransform from "../../UI/ButtonTransform";
import ButtonStopTransform from "../../UI/ButtonStopTransform";

function Selector({ aliens }) {
  const [selectedAlien, setSelectedAlien] = useState(null);
  const { transformedAlien, transformAlien, resetTransformation } = useAliens();

  const handleSelectChange = (event) => {
    const alienId = event.target.value;
    const alienFound = aliens.find((alien) => alien.id === alienId) || null;
    setSelectedAlien(alienFound);
  };

  // const handleTransform = () => {
  //   if (selectedAlien) {
  //     transformAlien(selectedAlien);
  //   }
  // };

  return (
    <div className="my-10 rounded bg-gray-800 p-4 text-white">
      <div className="flex space-x-4">
        {/* Columna izquierda: selector y botón */}
        <div className="w-1/2">
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

          {selectedAlien && <ButtonTransform selectedAlien={selectedAlien} />}
        </div>

        {/* Columna derecha: imagen seleccionada o transformada */}
        <div className="flex w-1/2 flex-col items-center justify-center">
          {/* Imagen cuando un alien está seleccionado (modo gris) */}
          {selectedAlien && !transformedAlien && (
            <div className="text-center">
              <img
                src={selectedAlien.imagen}
                alt={selectedAlien.nombre}
                className="mx-auto h-32 w-32 rounded object-contain grayscale filter transition-all duration-500"
              />
              <p className="mt-2 text-gray-400">
                Alien seleccionado: {selectedAlien.nombre}
              </p>
            </div>
          )}

          {/* Imagen cuando el alien está transformado */}
          {transformedAlien && (
            <div className="text-center">
              <img
                src={transformedAlien.imagen}
                alt={transformedAlien.nombre}
                className="mx-auto h-32 w-32 rounded border-4 border-green-500 object-contain transition-all duration-500"
              />
              <p className="mt-2 text-green-400">
                Alien <strong>{transformedAlien.nombre}</strong> está
                transformado
              </p>
              <TransformationTimer />
              <ButtonStopTransform />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Selector;
