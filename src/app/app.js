import  React from "react";
import Login from './containers/login'
import { BrowserRouter,Route ,Redirect} from 'react-router-dom'
class App extends React.Component {
    constructor(props){
        super(props)
    }
    render() {
        return (
            <div >
                <Route exact path="/" component={Login} />
            </div>
        );
    }
}

export default App;
