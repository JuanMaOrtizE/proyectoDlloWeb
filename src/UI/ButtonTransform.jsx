import { useAliens } from "../contexts/AliensContext";

function ButtonTransform({ selectedAlien }) {
  const { transformAlien } = useAliens();
  const handleTransform = () => {
    if (selectedAlien) {
      transformAlien(selectedAlien);
    }
  };
  return (
    <button
      className="rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700"
      onClick={handleTransform}
    >
      Transformar
    </button>
  );
}

export default ButtonTransform;
