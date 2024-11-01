import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from './components/theme-provider.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
	<BrowserRouter>
		<React.StrictMode>
			<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
				<App />
			</ThemeProvider>
		</React.StrictMode>
	</BrowserRouter>,
)
