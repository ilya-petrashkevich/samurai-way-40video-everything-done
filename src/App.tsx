import React from 'react';
import './App.css';
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Profile from "./components/Profile/Profile";
import Dialogs from "./components/Dialogs/Dialogs";
import {BrowserRouter, Route} from "react-router-dom";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import {store, StoreType} from "./components/redux/state";

type AppPropsType = {
    store: StoreType
    // state: StateType
    // addPost: (postMessage?: string) => void
    // updateNewPostText: (newText: string) => void
}

function App(props: AppPropsType) {
    const state = props.store.getState();
    return (
        <BrowserRouter>
            <div className="app-wrapper">
                <Header/>
                <Navbar/>
                <div className="app-wrapper-content">

                    <Route render={() => <Profile
                        profilePage={state.profilePage /*.posts*/}
                        dispatch={props.store.dispatch.bind(props.store)}
                        // addPost={props.store.addPost.bind(props.store)}
                        // updateNewPostText={props.store.updateNewPostText.bind(props.store)}
                    />} /* exact */ path="/profile"/>

                    <Route render={() =>
                        <Dialogs
                            dialogs={state.dialogsPage.dialogs}
                            messages={state.dialogsPage.messages}
                            newMessageBody={state.dialogsPage.newMessageBody}
                            dispatch={props.store.dispatch.bind(props.store)}
                        />}
                           path="/dialogs"/>

                    <Route render={() => <News/>} /* exact */ path="/news"/>
                    <Route render={() => <Music/>} /* exact */ path="/music"/>
                    <Route render={() => <Settings/>} /* exact */ path="/settings"/>

                </div>
            </div>
        </BrowserRouter>)
}

// применять можно роут или с component со ссылкой на функцию component={Profile} (компонент) или render со ссылкой на компонент render={() => <Profile/>} стрелочная функция внутри {} обязательно
// {<Route component={Profile} /* exact */ path = "/profile" / > }
//     {<Route component={Dialogs} /* exact */ path="/dialogs"/>}
//         {<Route component={News} /* exact */ path="/news"/>}
//             {<Route component={Music} /* exact */ path="/music"/>}
//                 {<Route component={Settings} /* exact */ path="/settings"/>}

export default App;
