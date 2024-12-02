import "./App.css";
import { Switch, Route } from "react-router-dom";
import PageLayout from "./PageLayout";
import Login from "./Login";
import Signup from "./Signup";
import { useUserContext } from "./context/UserContext";

function App() {

  const { userInfo } = useUserContext();

  return (
    <div>
      {userInfo.token ? "kullanıcı daha önce giriş yapmış" : "Kullanıcı daha önce giriş yapmış degil"}
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>

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
