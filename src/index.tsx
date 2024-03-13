import { Provider } from 'react-redux'
import ReactDOM from 'react-dom/client'

import { App } from './App'
import { store } from './redux/store-redux'

import './styles/index.scss'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <Provider store={store}>
    <App />
  </Provider>,
)
