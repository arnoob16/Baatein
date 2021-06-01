import { Route, Switch } from 'react-router-dom';
import { Login, SignUp, Chat } from 'components';
export const App = () => {
    return (
        <Switch>
            <Chat exact path="/" componenet={Chat} />
            <Route path="/signup" component={SignUp}></Route>
            <Route path="/login" component={Login}></Route>
        </Switch>
    );
};
