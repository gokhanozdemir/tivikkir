import { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export default function UserContextProvider({ children }) {
	const [userInfo, setUserInfo] = useState({});

	return (
		<UserContext.Provider value={{ userInfo, setUserInfo }}>
			{children}
		</UserContext.Provider>
	)
}

export const useUserContext = () => {
	return useContext(UserContext);
};