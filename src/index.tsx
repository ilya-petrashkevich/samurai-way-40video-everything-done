import React from 'react';
import './index.css';
import {store} from "./components/redux/state";
import ReactDOM from 'react-dom';
import App from './App';


const rerenderEntireTree = (/*state: StateType*/) => {
    ReactDOM.render(
        <App
            // state={state}
            store={store}
            // addPost={addPost}
            // updateNewPostText={updateNewPostText}
        />,
        document.getElementById('root')
    );
}
store.subscribe(rerenderEntireTree);
rerenderEntireTree();
