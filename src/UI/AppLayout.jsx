import { Outlet } from "react-router-dom";
import Header from "./Header";

function AppLayout() {
  return (
    <div>
      <Header /> {/* Header solo en /app y /favorites */}
      <main className="mx-auto max-w-3xl bg-red-100">
        <Outlet /> {/* Aquí se renderiza AppContent o Favorites */}
      </main>
    </div>
  );
}

export default AppLayout;
