import React, { useState } from "react";

import "./App.css";
import { HashRouter as Router, Switch, Route, Redirect, Link } from "react-router-dom";
import Main from "./Main";
import Favorites from "./Favorites";
import { RecoilRoot } from 'recoil';

export const API_REAL_KEY = 'm9nQY13nGtGOtGe6QeJ2Y6AegYcDDxxN';

function App() {
	const [favorites, setFavorites] = useState([]);
	const [selected, setSelected] = useState([])
	const API_KEY = "m9nQY13nGtGOtGe6QeJ2Y6AegYcDDxxN";

	function addToFavorites(favorite) {
		setFavorites((current) => [...current, favorite]);
	}

	function removeFavorite(favorite) {
		setFavorites((current) => current.filter((city) => favorite.Key !== city.Key));
	}

	function createSelected(selectedItem) {
		setSelected([selectedItem]);
	}

	console.log("favorites", favorites);
	console.log('selected', selected);
	return (
		<RecoilRoot>
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
							selected={selected}
							removeFavorite={removeFavorite}
							addToFavorites={addToFavorites}
						/>
					</Route>
					<Route exact path="/Favorites">
						<Favorites
							API_KEY={API_KEY}
							favorites={favorites}
							CreateSelected={createSelected}
						/>
					</Route>
				</Switch>
			</Router>
		</div>
		</RecoilRoot>
	);
}

export default App;
