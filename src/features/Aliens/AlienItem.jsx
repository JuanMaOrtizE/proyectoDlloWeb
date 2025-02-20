import { useState } from "react";
import { Link } from "react-router-dom";

function AlienItem({ alien }) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Maneja el clic en la tarjeta
  function handleCardClick() {
    // Alterna entre expandido y no expandido
    setIsExpanded((prev) => !prev);
  }

  // Evita colapsar la tarjeta si el usuario hace clic en los enlaces internos
  function handleInternalClick(e) {
    e.stopPropagation();
  }

  return (
    <div
      className="relative cursor-pointer rounded border p-2 shadow hover:shadow-md"
      onClick={handleCardClick}
    >
      {/* Imagen */}
      <div className="flex h-40 w-full items-center justify-center overflow-hidden bg-gray-200">
        <img
          src={alien.imagen}
          alt={alien.nombre}
          className="max-h-full max-w-full object-cover"
        />
      </div>

      {/* Nombre del alien */}
      <h2 className="mt-2 text-lg font-bold">{alien.nombre}</h2>

      {/* Panel expandido */}
      {isExpanded && (
        <div className="mt-2 bg-white p-2 shadow-inner">
          <p className="text-sm text-gray-700">
            {alien.descripcion.substring(0, 60)}...
          </p>

          {/* Habilidades (si las tiene) */}
          <div className="mt-2 flex flex-wrap gap-1">
            {alien.habilidades?.map((habilidad, idx) => (
              <span
                key={idx}
                className="rounded bg-green-100 px-2 py-1 text-xs text-green-700"
              >
                {habilidad}
              </span>
            ))}
          </div>

          <div className="mt-2 flex items-center justify-between">
            {/* Link a detalles */}
            <Link
              to={`/alienDetails/${alien.id}`}
              className="text-blue-500 hover:text-blue-700"
              onClick={handleInternalClick}
            >
              Ver más
            </Link>

            {/* Ícono de favorito (ejemplo) */}
            <button
              onClick={(e) => {
                handleInternalClick(e);
                // Lógica para marcar como favorito
                alert(`Marcaste a ${alien.nombre} como favorito`);
              }}
              className="text-red-500 hover:text-red-600"
            >
              ♥
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AlienItem;
