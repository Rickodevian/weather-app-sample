import { Provider } from 'react-redux';
import { createStore } from 'redux';

import rootReducer from '../redux';
import Home from './Home';

const store = createStore(rootReducer);

// TO DO: setup jest
// TO DO: CORS for dev
const App = () => (
    <Provider store={store}>
        <Home />
    </Provider>
);
  
export default App;
