import React from 'react';
import './app.scss';
import '../description/description';
import Description from '../description/description';
import { Provider } from 'react-redux';
import { configStore } from '../../../shared/configureStore';
import {postAccessToken, authorizeWithGithub } from "../../../main/git/gitAuthorization";
import ReadOnlyDict = NodeJS.ReadOnlyDict;
import {clone, createBranch, getUserRepositories} from "../../../main/git/gitOperations";

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
                <button onClick={()=>clone("/home/aleksander/Desktop/asd", "https://github.com/aleksanderbrylski/twitterbot")}> Clone </button>
                <button onClick={()=>createBranch("/home/aleksander/Desktop/asd", "redaktor")}> Clone </button>
                <Description />
            </Provider>
        );
    }
}


export default App;
