import React, { useEffect, useState } from "react";
import {Link, useHistory} from 'react-router-dom';
import { useSetRecoilState } from "recoil";
import { cityKeyAtom, cityNameAtom, tempAtom } from './DailyAtom.js';

function Favorites(props) {
	const { API_KEY, favorites, createSelected, selected } = props;

	const [currentWeather, setCurrentWeather] = useState([]);
	const setCityKey = useSetRecoilState(cityKeyAtom);
	const setCityName = useSetRecoilState(cityNameAtom);
	const setTemp = useSetRecoilState(tempAtom);
	const history = useHistory();

	useEffect(() => {
		const promises = favorites.map((city) => {
			return fetch(
				`https://dataservice.accuweather.com/currentconditions/v1/${city.Key}?apikey=${API_KEY}&metric=true`
			)
				.then((res) => res.json())
				.then((body) => ({...body[0], cityKey: city.Key }));
		});
		Promise.all(promises).then((values) => {
			setCurrentWeather(values);
		});
	}, []);
	
	const handleClick = (city, i) => () => {
		setCityKey(city.Key);
		setCityName(city.LocalizedName);
		const current = currentWeather.find(c => c.cityKey == city.Key);
		setTemp(current.Temperature.Metric.Value);
		history.push('/Main');
	}

	return (
		<div>
		<ul className="Favorite-city">
			{favorites.map((city, i) => {
				return (
					<li key={i}>
						<button className="Favorites-button" onClick={handleClick(city, i)}  >
							<div>{city.LocalizedName}</div>
							<div>{currentWeather[i]?.Temperature.Metric.Value}°C</div>
						</button>
					</li>
				);
			})}
		</ul></div>
	);
}

export default Favorites;
