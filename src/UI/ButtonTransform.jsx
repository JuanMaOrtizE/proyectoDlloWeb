function ButtonTransform({ selectedAlien }) {
  const handleTransform = () => {
    alert(`Transformándose en ${selectedAlien?.nombre}`);
    // Aquí irá la lógica para transformar al alien usando API Context más adelante
  };
  return (
    <button
      className="mt-2 rounded bg-green-500 px-4 py-2 hover:bg-green-600"
      onClick={handleTransform}
    >
      Transformar
    </button>
  );
}

export default ButtonTransform;
