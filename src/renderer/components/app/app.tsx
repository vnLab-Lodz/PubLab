import React from 'react';
import './app.scss';
import '../description/description';
import Description from '../description/description';
import { Provider } from 'react-redux';
import { configStore } from '../../../shared/configureStore';
import {postAccessToken, authorizeWithGithub, createNewRepository, getUserRepositories} from "../../../main/git";
import ReadOnlyDict = NodeJS.ReadOnlyDict;
import {clone} from "../../../main/git/gitOperations";

const store = configStore('renderer');
store.subscribe(() => console.log('action received in renderer'));

type AppProps = {
    params? : object
}

class App extends React.Component <AppProps>{

    async componentDidMount(): Promise<void> {
        let search = window.location.search;
        let codeString = search.substr(1, 4);
        if(codeString == "code"){
            let accessToken = await postAccessToken(search);
            console.log(accessToken);
        }
    }

    render(){
        return (
            <Provider store={store}>
                <h1 className='hello'>Hello World!</h1>
                <button onClick={()=>authorizeWithGithub()}> Odpal git</button>
                <button onClick={()=>getUserRepositories('as')}> tworz repo</button>
                <button onClick={()=>clone("C:/vnlab-tool", "https://github.com/jedrekszor/vnlab-test")}> Clone </button>
                <Description />
            </Provider>
        );
    }
}


export default App;
