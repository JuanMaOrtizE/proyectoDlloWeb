import AlienItem from "./AlienItem";

function Alien({ aliens }) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {aliens.map((alien) => (
        <AlienItem key={alien.id} alien={alien} />
      ))}
    </div>
  );
}

export default Alien;
