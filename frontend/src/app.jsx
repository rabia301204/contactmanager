import { Routes, Route } from "react-router-dom";
import { ContactProvider } from "./context/contactcontext";
import { ToastProvider } from "./context/toastcontext";
import { ThemeProvider } from "./context/themecontext";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import AddEditPage from "./pages/AddEditPage";

function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <ContactProvider>
          <Navbar />
          <div className="container">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/add" element={<AddEditPage />} />
              <Route path="/edit/:id" element={<AddEditPage />} />
            </Routes>
          </div>
        </ContactProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;