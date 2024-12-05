import { createContext, useContext, useEffect, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { jwtDecode } from "jwt-decode";
import { isPast } from "date-fns";
import { useHistory } from "react-router-dom";

const UserContext = createContext();

export default function UserContextProvider({ children }) {
	let history = useHistory();
	const [tokenData, setTokenData] = useLocalStorage("tivikkir-user", {});
	const [userInfo, setUserInfo] = useState({});

	function logOut() {
		setTokenData({});
		setUserInfo({});
	}

	useEffect(() => {
		if (tokenData.token) {
			const payload = jwtDecode(tokenData.token);
			if (isPast(payload.exp * 1000)) {
				logOut();
				// token bayatlamış
			} else {
				// burada başarılı giriş var
				setUserInfo(payload);
				//history.push("/");
			}
		}
	}, [tokenData]);


	return (
		<UserContext.Provider value={{ userInfo, setTokenData, tokenData, logOut }}>
			{children}
		</UserContext.Provider>
	)
}

export const useUserContext = () => {
	return useContext(UserContext);
};