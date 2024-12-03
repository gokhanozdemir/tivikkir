import { useUserContext } from "./context/UserContext";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

export default function PageLayout({ children }) {
  const { userInfo, logOut } = useUserContext();

  return (
    <div className="relative">
      <div className="sticky top-0 bg-white dark:bg-slate-400 shadow-md">
        <header className="container mx-auto p-6 flex justify-between"><h1 className="text-lg font-bold ">TIWIKKIR</h1>

          {userInfo.name ? <button onClick={logOut}>Çıkış yap {userInfo.name}</button> : <div className="flex gap-4 items-center"><Link to="/login">Giriş Yap</Link>
            <Link to="/signup">Kayıt Ol</Link></div>}


        </header>
      </div>
      <div className="pt-6 pb-12">
        <main className="container mx-auto bg-white dark:bg-slate-400 min-h-96 rounded-xl shadow-xl p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
