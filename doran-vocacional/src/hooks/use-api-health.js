import { useEffect, useState } from "react";
import { getApiHealth } from "@/lib/api-client";

const INITIAL = { status: "checking", label: "Verificando API", details: null };

export function useApiHealth() {
  const [health, setHealth] = useState(INITIAL);

  useEffect(() => {
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 7000);

    getApiHealth(controller.signal)
      .then((data) => {
        setHealth({
          status: data.aiConfigured ? "ready" : "limited",
          label: data.aiConfigured ? "API e IA operacionais" : "Resultado local disponível",
          details: data,
        });
      })
      .catch((error) => {
        if (error.name === "AbortError") {
          setHealth({ status: "offline", label: "API sem resposta", details: { message: "Tempo limite excedido" } });
          return;
        }
        setHealth({ status: "offline", label: "API indisponível", details: error.details || { message: error.message } });
      })
      .finally(() => window.clearTimeout(timeout));

    return () => {
      window.clearTimeout(timeout);
      controller.abort();
    };
  }, []);

  return health;
}
