import queryString from "query-string";
import AuthLayout from "./AuthLayout";
import { useLocation, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useUserContext } from "./context/UserContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { LogIn } from 'lucide-react';

export default function Login() {
  const { search } = useLocation();
  const history = useHistory();

  const values = queryString.parse(search);
  console.log(values.expiresIn, "***");

  const { setTokenData } = useUserContext();


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  function handleLogin(data) {
    const toasterLogin = toast.loading("Please wait...")
    console.log(data, "---");
    axios.post('https://kiwitter-node-77f5acb427c1.herokuapp.com/login', data)
      .then(function (response) {

        console.log(response);
        setTokenData(response.data);

        toast.update(toasterLogin, { render: "All is good", type: "success", isLoading: false, closeOnClick: true, autoClose: 2000 });
        history.push("/");
      })
      .catch(function (error) {
        toast.update(toasterLogin, { render: error.response.data, type: "error", isLoading: false, closeOnClick: true, autoClose: 4000 });
        console.log(error);
      });
  }

  return (
    <AuthLayout>
      <h1 className="text-3xl text-center font-semibold tracking-tighter text-lime-700">
        Hoş Geldin!
      </h1>
      <form onSubmit={handleSubmit(handleLogin)}>
        <div className="pt-4">
          <div className="flex justify-between gap-2 items-baseline pb-1">
            <label htmlFor="nickname ">Kullanıcı adı</label>
            <span className="text-sm font-medium text-red-600">
              {errors.nickname && errors.nickname.message.toString()}
            </span>
          </div>
          <input
            type="text"
            className="w-full h-10 px-2 border rounded-md border-gray-300"
            {...register("nickname", { required: "Bu alan zorunlu" })}
          />
        </div>

        <div className="pt-4">
          <div className="flex justify-between gap-2 items-baseline pb-1">
            <label htmlFor="password">Şifre</label>
            <span className="text-sm font-medium text-red-600">
              {errors.password && errors.password.message.toString()}
            </span>
          </div>
          <input
            type="password"
            className="w-full h-10 px-2 border rounded-md border-gray-300"
            {...register("password", { required: "Bu alan zorunlu" })}
          />
        </div>
        <div className="pt-4">
          <button
            type="submit"
            className="h-12 text-center block w-full rounded-lg bg-primary text-white font-bold flex flex-nowrap justify-center items-center gap-2"
          ><LogIn />
            GİRİŞ
          </button>
          <p className="text-slate-500">Üye değil misin? O zaman <Link to="/signup">kayıt ol</Link></p>
        </div>
      </form>
    </AuthLayout>
  );
}
