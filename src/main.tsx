import { AppRouter } from '@/routes/index.tsx'
import "@fontsource/inter"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Toaster } from 'sonner'
import './index.css'

import "@fontsource/inter/400.css"
import "@fontsource/inter/500.css"
import "@fontsource/inter/700.css"

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Toaster position='top-right' />
      <AppRouter />
    </QueryClientProvider>
  </React.StrictMode>,
)