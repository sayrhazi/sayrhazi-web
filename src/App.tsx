import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Accueil from "./pages/Accueil";
import Demarrage from "./pages/Demarrage";
import Versions from "./pages/Versions";
import Agents from "./pages/Agents";

const TITRES: Record<string, string> = {
  "/": "Sayrhazi — Chaque étape laisse une trace",
  "/demarrage": "Démarrage — Sayrhazi en 3 commandes",
  "/versions": "Versions — Sayrhazi",
  "/agents": "Agents — Sayrhazi",
};

function cheminSansBase(pathname: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  if (base !== "" && pathname.startsWith(base)) {
    const reste = pathname.slice(base.length);
    return reste === "" ? "/" : reste;
  }
  return pathname;
}

function RouteWrapper() {
  const location = useLocation();

  useEffect(() => {
    document.title = TITRES[cheminSansBase(location.pathname)] ?? TITRES["/"];
    document.getElementById("contenu")?.focus({ preventScroll: true });
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <Routes>
      <Route path="/" element={<Accueil />} />
      <Route path="/demarrage" element={<Demarrage />} />
      <Route path="/versions" element={<Versions />} />
      <Route path="/agents" element={<Agents />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <div className="flex min-h-screen flex-col bg-encre text-white">
        <Navbar />
        <main id="contenu" tabIndex={-1} className="flex-1 scroll-mt-20 outline-none max-w-full overflow-x-hidden">
          <RouteWrapper />
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}