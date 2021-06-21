import React, { useEffect, useState } from "react";
import {Link} from 'react-router-dom';

function Favorites(props) {
	const { API_KEY, favorites } = props;

	const [currentWeather, setCurrentWeather] = useState([]);

	useEffect(() => {
		const promises = favorites.map((city) => {
			return fetch(
				`https://dataservice.accuweather.com/currentconditions/v1/${city.Key}?apikey=${API_KEY}&metric=true`
			)
				.then((res) => res.json())
				.then((body) => body[0]);
		});
		Promise.all(promises).then((values) => {
			setCurrentWeather(values);
		});
	}, []);

	

	return (
		<div>
		<ul className="Favorite-city">
			{favorites.map((city, i) => {
				return (
					<li key={i}>
                        <Link to="/Main" replace><button className="Favorites-button" >
						<div>{city.LocalizedName}</div>
						<div>{currentWeather[i]?.Temperature.Metric.Value}°C</div></button></Link>
					</li>
				);
			})}
		</ul></div>
	);
}

export default Favorites;
