function ButtonTransform({ onTransform }) {
  return (
    <button
      className="mt-2 rounded bg-green-500 px-4 py-2 hover:bg-green-600"
      onClick={onTransform}
    >
      Transformar
    </button>
  );
}

export default ButtonTransform;
