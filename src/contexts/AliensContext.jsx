import {
  createContext,
  useCallback,
  useContext,
  useReducer,
  useEffect,
} from "react";

const BASE_URL = "http://localhost:9000";
const AliensContext = createContext();

const initialState = {
  aliens: [],
  currentAlien: {},
  transformedAlien: null,
  remainingTime: 0, //  Nuevo estado para el temporizador
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "alien/loaded":
      return { ...state, currentAlien: action.payload };

    case "alien/transformed":
      return {
        ...state,
        transformedAlien: action.payload,
        remainingTime: action.payload.tiempoTransformacion, // Usa el tiempo específico del alien
      };

    case "alien/resetTransformation":
      return { ...state, transformedAlien: null, remainingTime: 0 };

    case "timer/update":
      return { ...state, remainingTime: action.payload };

    default:
      throw new Error("Unknown action type");
  }
}

function AliensProvider({ children }) {
  const [
    { aliens, currentAlien, error, transformedAlien, remainingTime },
    dispatch,
  ] = useReducer(reducer, initialState);

  const getAlien = useCallback(
    async function getAlien(id) {
      console.log("id desde getAlien", id);
      if (Number(id) === currentAlien.id) return;

      try {
        const res = await fetch(`${BASE_URL}/aliensData/${id}`);
        const data = await res.json();
        dispatch({ type: "alien/loaded", payload: data });
      } catch {
        dispatch({
          type: "rejected",
          payload: "There was an error loading the alien...",
        });
      }
    },
    [currentAlien.id],
  );

  const transformAlien = async (alien) => {
    try {
      // 1️⃣ Primero, verificamos si ya hay una transformación activa
      const resCheck = await fetch("http://localhost:9000/transformaciones");
      const dataCheck = await resCheck.json();

      if (dataCheck.length > 0) {
        console.warn(
          "⚠ Ya hay una transformación activa. No puedes iniciar otra.",
        );
        return; // ⛔ Evita que se cree otra transformación
      }

      // 2️⃣ Generar un tiempo de transformación aleatorio (30 a 90 segundos)
      const tiempoTransformacion = Math.floor(Math.random() * 60) + 30;

      const nuevaTransformacion = {
        alien_id: alien.id,
        tiempoTransformacion,
        estado: true, // Indica que la transformación está activa
      };

      // 3️⃣ Enviamos la transformación a JSON Server
      const res = await fetch("http://localhost:9000/transformaciones", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevaTransformacion),
      });

      if (!res.ok) throw new Error("Error al transformar");

      const data = await res.json(); // JSON Server devuelve el objeto creado con un ID único

      dispatch({
        type: "alien/transformed",
        payload: { ...alien, tiempoTransformacion, transformacionId: data.id },
      });
    } catch (error) {
      console.error("Error al transformar el alien:", error);
    }
  };

  // const resetTransformation = () => {
  //   dispatch({ type: "alien/resetTransformation" });
  // };

  useEffect(() => {
    const fetchTransformacionActiva = async () => {
      try {
        const res = await fetch("http://localhost:9000/transformaciones");
        const data = await res.json();

        if (data.length > 0) {
          const transformacion = data[0]; // Tomar la primera transformación activa
          const alienRes = await fetch(
            `http://localhost:9000/aliensData/${transformacion.alien_id}`,
          );
          const alienData = await alienRes.json();

          dispatch({
            type: "alien/transformed",
            payload: {
              ...alienData,
              tiempoTransformacion: transformacion.tiempoTransformacion,
            },
          });
        }
      } catch (error) {
        console.error("Error al obtener la transformación activa");
      }
    };

    fetchTransformacionActiva();
  }, []);

  const resetTransformation = async () => {
    try {
      // Obtener la transformación activa
      const res = await fetch("http://localhost:9000/transformaciones");
      const data = await res.json();

      if (data.length === 0) {
        console.warn("⚠ No hay transformación activa para eliminar.");
        return;
      }

      const transformacionId = data[0].id; // Tomamos el ID de la primera transformación activa

      // Eliminar la transformación correcta
      const deleteRes = await fetch(
        `http://localhost:9000/transformaciones/${transformacionId}`,
        {
          method: "DELETE",
        },
      );

      if (!deleteRes.ok) throw new Error("Error al detener la transformación");

      dispatch({ type: "alien/resetTransformation" });
    } catch (error) {
      console.error("Error al detener la transformación:", error);
    }
  };

  useEffect(() => {
    if (transformedAlien && remainingTime > 0) {
      const timer = setInterval(() => {
        dispatch({ type: "timer/update", payload: remainingTime - 1 });
      }, 1000);

      return () => clearInterval(timer);
    }

    if (remainingTime === 0 && transformedAlien) {
      resetTransformation(); // Si el tiempo llega a 0, se detiene automáticamente
    }
  }, [remainingTime, transformedAlien]);

  return (
    <AliensContext.Provider
      value={{
        currentAlien,
        getAlien,
        transformedAlien,
        remainingTime,
        transformAlien,
        resetTransformation,
      }}
    >
      {children}
    </AliensContext.Provider>
  );
}

function useAliens() {
  const context = useContext(AliensContext);
  if (!context) {
    throw new Error("useAliens must be used within an AliensProvider");
  }
  return context;
}

export { AliensProvider, useAliens };
