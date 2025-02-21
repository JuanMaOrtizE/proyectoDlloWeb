import { Outlet, useNavigation } from "react-router-dom";
import Header from "./Header";
import Loader from "./Loader";

function AppLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  return (
    <div className="">
      {isLoading && <Loader />}
      <Header /> {/* Header solo en /app y /favorites */}
      <main className="mx-auto max-w-3xl bg-red-100">
        <Outlet /> {/* Aquí se renderiza AppContent o Favorites */}
      </main>
    </div>
  );
}

export default AppLayout;
