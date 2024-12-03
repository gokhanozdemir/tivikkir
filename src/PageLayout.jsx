import { useUserContext } from "./context/UserContext";
import { Link } from "react-router-dom";
import { Origami, LogIn, LogOut, CircleUserRound, Milestone } from "lucide-react";

export default function PageLayout({ children }) {
  const { userInfo, logOut } = useUserContext();

  return (
    <div className="relative">
      <div className="sticky top-0 bg-white dark:bg-slate-400 shadow-md">
        <header className="container mx-auto p-6 flex justify-between">
          <h1 className="text-lg font-bold flex gap-2 ">
            <Origami />
            TIWIKKIR
          </h1>

          {userInfo.name ? (
            <button onClick={logOut} className="h-12 text-center block w-full rounded-lg bg-primary text-white font-bold flex flex-nowrap justify-center items-center gap-2">Çıkış yap <LogOut /> {userInfo.name}</button>
          ) : (
            <div className="flex gap-4 items-center">
              <Link to="/login">
                {" "}
                <div className="flex gap-1 text-nowrap ">
                  Giriş Yap <LogIn />
                </div>
              </Link>
              <Link to="/signup"><div className="flex gap-1 text-nowrap ">
                Kayıt Ol <Milestone />
              </div></Link>
            </div>
          )}
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
