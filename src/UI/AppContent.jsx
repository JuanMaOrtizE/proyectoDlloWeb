import Selector from "../features/Selector/Selector";
import Alien from "../features/Aliens/Alien";
import { useLoaderData } from "react-router-dom";
import { getAliens } from "../services/apiAliens";

function AppContent() {
  const aliens = useLoaderData();
  return (
    <div>
      <Selector aliens={aliens} /> {/* Selector de alien */}
      <Alien aliens={aliens} /> {/* Lista de aliens */}
    </div>
  );
 }

export async function loader() {
  const aliens = await getAliens();
  return aliens;
}
export default AppContent;
