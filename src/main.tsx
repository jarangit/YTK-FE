import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClientProvider } from '@tanstack/react-query'
import { Provider } from 'react-redux'
import { GoogleOAuthProvider } from '@react-oauth/google'
import './shared/i18n'
import './index.css'
import App from './App.tsx'
import { queryClient } from './shared/api/queryClient.ts'
import { store } from './shared/store/store.ts'

const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID ?? ''

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        {googleClientId ? (
          <GoogleOAuthProvider clientId={googleClientId}>
            <App />
          </GoogleOAuthProvider>
        ) : (
          <App />
        )}
      </QueryClientProvider>
    </Provider>
  </StrictMode>,
)
