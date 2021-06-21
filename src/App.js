import React, { useState } from "react";

import "./App.css";
import { HashRouter as Router, Switch, Route, Redirect, Link } from "react-router-dom";
import Main from "./Main";
import Favorites from "./Favorites";

function App() {
	const [favorites, setFavorites] = useState([]);
	const API_KEY = "A6pmRGXawgAtZM5Y11NF2ZemuHR9XdPm";

	function addToFavorites(favorite) {
		setFavorites([favorite, ...favorites]);
	}

	function removeFavorite(favorite) {
		setFavorites(favorites.filter((city) => favorite.Key !== city.Key));
	}

	

	console.log("favorites", favorites);

	return (
		<div className="App">
			<Router>
				<header className="App-header">
					<Link to="/Main" replace>
						<button className="App-main-button">Main Page</button>
					</Link>
					<Link to="/Favorites" replace>
						<button className="App-fav-button">Favorites</button>
					</Link>
				</header>
				<Switch>
					<Route
						exact
						path="/"
						render={() => {
							return <Redirect to="/Main" />;
						}}
					/>
					<Route exact path="/Main">
						<Main
							API_KEY={API_KEY}
							favorites={favorites}
							removeFavorite={removeFavorite}
							addToFavorites={addToFavorites}
						/>
					</Route>
					<Route exact path="/Favorites">
						<Favorites
							API_KEY={API_KEY}
							favorites={favorites}
						/>
					</Route>
				</Switch>
			</Router>
		</div>
	);
}

export default App;
