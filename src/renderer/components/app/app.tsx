import React from 'react';
import './app.scss';
import '../description/description';
import Description from '../description/description';
import { Provider } from 'react-redux';
import { configStore } from '../../../shared/configureStore';
import {postAccessToken, authorizeWithGithub} from "../../../main/git/gitAuthorization";
import ReadOnlyDict = NodeJS.ReadOnlyDict;
import {clone, publish} from "../../../main/git/gitOperations";
import { createBranch, getUserRepositories} from "../../../main/git/gitOperations";
import {createFoldersInDirectory} from "../../../main/git/gitWebPublication";
require('dotenv').config();

console.log(process.env);
const store = configStore('renderer');
store.subscribe(() => console.log('action received in renderer'));

type AppProps = {
    params? : object
}

class App extends React.Component <AppProps>{

    async componentDidMount(): Promise<void> {
        /** piece of code to get code after authorizing, code is a param of main page after making callback,
        *   then having code it is exchanged for access token

         */
        let search = window.location.search;
        let codeString = search.substr(1, 4);
        if(codeString == "code"){
            let accessToken = await postAccessToken(search);
            //place to save it in a slice
            console.log(accessToken);
        }
    }

    render(){
        return (
            <Provider store={store}>
                <h1 className='hello'>Hello World!</h1>
                <button onClick={()=>authorizeWithGithub()}> Odpal git</button>
                <button onClick={()=>getUserRepositories('as')}> tworz repo</button>
                <button onClick={()=>clone("/home/aleksander/Desktop/asd", "https://github.com/aleksanderbrylski/twitterbot")}> Clone Olek</button>
                <button onClick={()=>createBranch("/home/aleksander/Desktop/asd", "redaktor")}> branch </button>
                <button onClick={()=>clone("C:/vnlab-tool", "https://github.com/jedrekszor/vnlab-test")}> Clone Jędrek</button>
                <button onClick={()=>publish()}> Publish </button>
                <button onClick={()=>createFoldersInDirectory("C:/Users/Admin/Desktop/gunwo")}> Gunwo </button>
                <Description />
            </Provider>
        );
    }
}


export default App;
