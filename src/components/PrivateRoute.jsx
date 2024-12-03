import { Redirect, Route } from "react-router-dom";
import { useUserContext } from "../context/UserContext";

export default function PrivateRoute({ children, ...rest }) {

	let { tokenData } = useUserContext();
	return (
		<Route
			{...rest}
			render={({ location }) =>
				tokenData.token ? (
					children
				) : (
					<Redirect
						to={{
							pathname: "/login",
							state: { from: location }
						}}
					/>
				)
			}
		/>
	);
}