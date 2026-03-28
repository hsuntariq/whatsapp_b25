import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { AppProvider } from './context/AppContext.jsx'
import { Provider } from 'react-redux'
import { store } from './app/store.js'
createRoot( document.getElementById( 'root' ) ).render(
  <Provider store={store}>

    <AppProvider>
      <App />
    </AppProvider>
  </Provider>
)
