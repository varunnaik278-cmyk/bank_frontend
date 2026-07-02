import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { AdminProvider } from './context/AdminContext.jsx'
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <AdminProvider>
        <App />
        <Toaster
          position="top-right"
          reverseOrder={false}
          toastOptions={{
            duration: 3000,

            style: {
              background: "#ffffff",
              color: "#0f172a",
              border: "1px solid #e2e8f0",
              borderRadius: "14px",
              padding: "14px 16px",
              boxShadow:
                "0 10px 25px rgba(0,0,0,0.08)",
              fontWeight: "500",
            },

            success: {
              iconTheme: {
                primary: "#2563eb",
                secondary: "#ffffff",
              },
            },

            error: {
              iconTheme: {
                primary: "red",
                secondary: "#ffffff",
              },
            },
          }}
        />
      </AdminProvider>
    </AuthProvider>
  </StrictMode>,
)
