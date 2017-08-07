import  React from "react";
import Login from './containers/login'
import Main from './containers/main'
import { BrowserRouter,HashRouter ,Route ,Redirect} from 'react-router-dom'
class App extends React.Component {
    constructor(props){
        super(props)
    }
    render() {
        return (
            <div >
                <Route exact path="/" component={Login} />
                <Route  path="/dashboard" component={Main} />
            </div>
        );
    }
}

export default App;
