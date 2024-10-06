import { Route, Routes } from "react-router-dom";
import Login from "./_auth/forms/login";
import Home from "./_root/pages/home";
import AuthLayout from "./_auth/authLayout";
import Registration from "./_auth/forms/registration";
import RootLayout from "./_root/rootLayout";

function App() {
  return (
    <main className="flex h-screen">
      <Routes>
        {/* Public routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
        </Route>

        {/* Private routes */}
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </main>
  );
}

export default App;
