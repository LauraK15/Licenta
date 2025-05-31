import { Routes, Route } from "react-router-dom";
import { AuthProvider } from './helper/authContext'; 
import AuthBody from "./components/Auth/authbody";
import MainLayout from './components/Layout/MainLayout';
import PrivateRoute from "./helper/PrivateRoute";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Routes>
          <Route path="/auth" element={<AuthBody />} />
          <Route path="/*" element={<PrivateRoute><MainLayout /></PrivateRoute>} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
