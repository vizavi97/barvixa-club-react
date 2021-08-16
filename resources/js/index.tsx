import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

//styles
import './assets/styles/style.scss'
import {ChakraProvider} from '@chakra-ui/react';
import chakraTheme from "./config/ChakraConfig";

//store
import {compose, applyMiddleware, createStore} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from "redux-devtools-extension";
import {Provider} from "react-redux";
import {rootReducer} from "./store/reducers/root.reducer";

//MetaMask
import {MetaMaskProvider} from 'metamask-react'

const store = createStore(rootReducer, compose(
    applyMiddleware(thunk),
    //composeWithDevTools()
));


const wrapper =  <ChakraProvider theme={chakraTheme}>
    <MetaMaskProvider>
            <Provider store={store}>
                <App/>
            </Provider>
    </MetaMaskProvider>

</ChakraProvider>;

ReactDOM.render(wrapper,
    document.getElementById('root')
);