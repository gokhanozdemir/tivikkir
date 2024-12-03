import "./App.css";
import { Switch, Route } from "react-router-dom";
import PageLayout from "./PageLayout";
import Login from "./Login";
import Signup from "./Signup";
import PrivateRoute from "./components/PrivateRoute";
import { useUserContext } from "./context/UserContext";
function App() {

  const { userInfo } = useUserContext();

  return (
    <div className="bg-indigo-100 dark:bg-indigo-950  min-h-screen ">
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <PrivateRoute path="/private">
          Özel rota
        </PrivateRoute>
        <Route path="/" exact>
          {/* /?variant=most_liked */}
          <PageLayout>Home</PageLayout>
        </Route>
        <Route path="/profile/:nick">
          <PageLayout>Profile page</PageLayout>
        </Route>
        <Route path="/detail/:twitId">
          <PageLayout>Twit detail</PageLayout>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
