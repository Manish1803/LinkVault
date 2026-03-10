import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Context
import { AuthProvider } from "./contexts/AuthContext";
import { AppProvider } from "./contexts/AppContext";

// Pages
import LandingPage from "./pages/LandingPage";
import Auth from "./pages/Auth";
import AppLayout from "./pages/AppLayout";
import Dashboard from "./pages/Dashboard";
import Links from "./pages/Links";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import PageNotFound from "./pages/PageNotFound";

function App() {
	return (
		<>
			<BrowserRouter>
				<AuthProvider>
					<AppProvider>
						<ToastContainer
							position="bottom-left"
							autoClose={1000}
							hideProgressBar={true}
							rtl={false}
						/>
						<Routes>
							<Route path="/" element={<LandingPage />} />
							<Route path="/auth" element={<Auth />} />
							<Route path="/app" element={<AppLayout />}>
								<Route index element={<Navigate replace to="dashboard" />} />
								<Route path="dashboard" element={<Dashboard />} />
								<Route path="links" element={<Links />} />
								<Route path="analytics" element={<Analytics />} />
								<Route path="settings" element={<Settings />} />
							</Route>
							<Route path="*" element={<PageNotFound />} />
						</Routes>
					</AppProvider>
				</AuthProvider>
			</BrowserRouter>
		</>
	);
}

export default App;
