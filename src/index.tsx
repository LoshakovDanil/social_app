import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'
import ReactDOM from 'react-dom/client'

import { App } from './App'
import store from './redux-toolkit/store-redux'

import './styles/index.scss'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <HashRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </HashRouter>,
)
