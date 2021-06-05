import { Route, Switch, useHistory } from 'react-router-dom';
import { Login, SignUp, Chat } from 'components';
import { useAuth, useResolved } from 'hooks';
import { useEffect } from 'react';
import { ChatProvider } from 'context/ChatContext';

export const App = () => {
    const history = useHistory();
    const { authUser } = useAuth();
    const authResolved = useResolved(authUser);

    useEffect(() => {
        if (authResolved) {
            history.push(!!authUser ? '/' : '/login');
        }
    }, [history, authResolved, authUser]);

    return authResolved ? (
        <ChatProvider authUser={authUser}>
            <div className="app">
                <Switch>
                    <Chat path="/" exact componenet={Chat} />
                    <Route path="/signup" component={SignUp}></Route>
                    <Route path="/login" component={Login}></Route>
                </Switch>
            </div>
        </ChatProvider>
    ) : (
        <>Loading...</>
    );
};
