import AppRoutes from "./routes/AppRoutes";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <> 
      <Toaster position="top-right" />
       <Navbar />
      <AppRoutes />
      <Footer/>
    </>
  );
}

export default App;
