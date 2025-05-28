import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import store from './store/store.ts'
import { Provider } from 'react-redux'
import { ErrorBoundary } from 'react-error-boundary'
import FallBack from './errorBoundary/FallBack.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <ErrorBoundary FallbackComponent={FallBack} onReset={() =>null}>
      <Provider store={store}>
        <App />
      </Provider>
    </ErrorBoundary>
  </BrowserRouter>
)

