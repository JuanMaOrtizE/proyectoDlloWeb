import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAliens } from "../../contexts/AliensContext";
import ButtonTransform from "../../UI/ButtonTransform";
import ButtonStopTransform from "../../UI/ButtonStopTransform";
import TransformationTimer from "../Transformation/TransformationTimer";

function AlienDetails() {
  const { id } = useParams();
  const { getAlien, currentAlien, transformedAlien } = useAliens();
  console.log(transformedAlien);
  // console.log(id);
  useEffect(() => {
    // console.log("object");
    getAlien(id);
  }, [id, getAlien]);
  //   if (!currentAlien) {
  //     return <p className="text-center text-white">Cargando...</p>;
  //   }

  const { nombre, descripcion, habilidades, imagen } = currentAlien;
  // console.log(currentAlien);

  return (
    <div className="mx-auto max-w-4xl rounded-lg bg-gray-800 p-6 text-white shadow-md">
      {/* Contenedor principal */}
      <div className="flex">
        {/* Imagen del alien */}
        <div className="flex w-1/3 items-center justify-center">
          <img
            src={imagen}
            alt={nombre}
            className="h-auto w-full rounded-lg shadow-lg"
          />
        </div>

        {/* Información del alien */}
        <div className="w-2/3 pl-6">
          <h1 className="mb-2 text-3xl font-bold">{nombre}</h1>
          <p className="text-sm text-gray-300">{descripcion}</p>

          {/* Habilidades */}
          <div className="mt-4">
            <h2 className="text-lg font-semibold">Habilidades</h2>
            <ul className="list-inside list-disc text-gray-400">
              {habilidades?.map((habilidad, index) => (
                <li key={index}>{habilidad}</li>
              ))}
            </ul>
          </div>

          {/* Botón de Transformación y Favoritos */}
          <div className="mt-6 flex items-center">
            <ButtonTransform selectedAlien={currentAlien} />
            <ButtonStopTransform />
            <TransformationTimer />
            <button className="ml-4 rounded-lg border border-gray-500 bg-transparent px-4 py-2 text-white hover:bg-gray-700">
              ❤️
            </button>
            <p>{` Alien actual: ${transformedAlien?.nombre}`}</p>
          </div>
        </div>
      </div>

      {/* Footer (Opcional) */}
      <div className="mt-8 flex flex-col items-center rounded-lg bg-gray-700 p-4">
        <button className="rounded-lg bg-gray-600 px-4 py-2 text-white hover:bg-gray-500">
          Info
        </button>
      </div>
    </div>
  );
}

export default AlienDetails;
