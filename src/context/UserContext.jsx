import { createContext, useContext, useEffect, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { jwtDecode } from "jwt-decode";

const UserContext = createContext();

export default function UserContextProvider({ children }) {

	const [userInfo, setUserInfo] = useLocalStorage("tivikkir-user", {});

	// userInfo.token 
	/* 
	{
  "id": 170,
  "nickname": "t1",
  "name": "t1",
  "role": "USER",
  "iat": 1733127420,
  "exp": 1733149020
}
   */

	return (
		<UserContext.Provider value={{ userInfo, setUserInfo }}>
			{children}
		</UserContext.Provider>
	)
}

export const useUserContext = () => {
	return useContext(UserContext);
};