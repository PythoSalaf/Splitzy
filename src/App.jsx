import { Routes, Route } from "react-router-dom";
import {
  Activity,
  Dashboard,
  DashboardLayout,
  ErrorPage,
  Groups,
  Home,
  Layout,
  Payments,
  Settings,
} from "./pages";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
        </Route>

        <Route path="/groups" element={<DashboardLayout />}>
          <Route index element={<Groups />} />
        </Route>
        <Route path="/payments" element={<DashboardLayout />}>
          <Route index element={<Payments />} />
        </Route>
        <Route path="/activity" element={<DashboardLayout />}>
          <Route index element={<Activity />} />
        </Route>
        <Route path="/settings" element={<DashboardLayout />}>
          <Route index element={<Settings />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;
