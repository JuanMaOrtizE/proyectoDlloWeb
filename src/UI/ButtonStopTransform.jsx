import { useAliens } from "../contexts/AliensContext";

function ButtonStopTransform() {
  const { resetTransformation } = useAliens();
  return (
    <button
      onClick={resetTransformation}
      className="mt-2 rounded bg-red-500 px-3 py-1 font-bold text-white hover:bg-red-700"
    >
      Parar transformación
    </button>
  );
}

export default ButtonStopTransform;
