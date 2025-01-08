// External dependencies
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, SnackbarProvider, Spinner } from "@deriv-com/quill-ui";

// Internal imports
import { useAuth } from "./hooks/useAuth.jsx";
import AuthProvider from "./providers/AuthProvider";
import Login from "./components/Login";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import PWAInstallBanner from "./components/PWAInstallBanner";

/**
 * Root component that sets up the application providers
 * Includes theme, snackbar notifications, and authentication context
 */
function App() {
    return (
        <ThemeProvider theme="light" persistent>
            <SnackbarProvider>
                <AuthProvider>
                    <AppContent />
                </AuthProvider>
            </SnackbarProvider>
        </ThemeProvider>
    );
}

/**
 * Main application content component
 * Handles routing and layout structure
 * Shows loading spinner while establishing connection
 */
function AppContent() {
    const { isConnected } = useAuth();

    // Display loading spinner while connection is being established
    if (!isConnected) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Spinner size="lg" />
            </div>
        );
    }

    // Main application layout with routing
    return (
        <Router>
            <div className="bg-gray-50">
                <Header />
                <PWAInstallBanner />
                <Routes>
                    {/* Default and fallback route - Login page */}
                    <Route path="/" element={<Login />} />
                    {/* Protected dashboard route - requires authentication */}
                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        }
                    />
                    {/* Catch-all route redirects to login */}
                    <Route path="/*" element={<Login />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
