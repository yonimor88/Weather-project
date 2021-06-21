import React, { useEffect, useState } from "react";

const baseUrl = "http://dataservice.accuweather.com";

async function getAutoComplete(q, key) {
	const url = `${baseUrl}/locations/v1/cities/autocomplete?apikey=${key}&q=${q}`;
	const response = await fetch(url);
	const body = await response.json();
	return body;
}

async function getDaily(cityKey, apikey) {
	const url = `${baseUrl}/forecasts/v1/daily/5day/${cityKey}?apikey=${apikey}&metric=true`;
	const response = await fetch(url);
	const body = await response.json();
	return body;
}

function Main(props) {
	const { API_KEY, favorites, addToFavorites, removeFavorite } = props;
	const [city, setCity] = useState(null);
	const [daily, setDaily] = useState([]);
	const [suggestions, setSuggestions] = useState([]);
	const [dataFetched, setDataFetched] = useState(false);
	const cityAPI=`http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${API_KEY}&q=tel aviv`
	

	async function onSearch(event) {
		const { value } = event.target;
		if (event.nativeEvent.data) {
			// on type in input
			const results = await getAutoComplete(value, API_KEY);
			setSuggestions(results);
		} else {
			// on select from datalist
			const selected = suggestions.find((suggestion) => suggestion.LocalizedName === value);
			setCity(selected);
			getFiveDayAPI(selected.Key);
		}
	}

	async function getCityAPI() {
		return await fetch(cityAPI)
			.then((res) => res.json())
			.then((result) => {
				setCity(result[0]);
			});
	}

	async function getFiveDayAPI(cityKey = "215854") {
		return await getDaily(cityKey, API_KEY).then((result) => {
			setDaily(result.DailyForecasts);
		});
	}

	useEffect(() => {
		async function load() {
			try {
				await getCityAPI();
				await getFiveDayAPI();
				setDataFetched(true);
			} catch (error) {
			}
		}
		load();
	}, [cityAPI]);

	
	const isFavorite = favorites.find((favorite) => favorite.Key === city?.Key);

	return (
		<div>
			<div className="Main-top">
				<div className="Main-Current">
					<h1>Current weather:</h1>
					{dataFetched ? (
						<h1 className="current-city">{favorites[0]?.LocalizedName}</h1>
					) : (
						<p>loading...</p>
					)}
					{dataFetched ? (
						<h2 className="current-degree">
							{Math.floor(
								(daily[0]?.Temperature?.Maximum?.Value +
									daily[0]?.Temperature?.Minimum?.Value) / 2)}C
						</h2>
					) : (
						<p>loading...</p>
					)}
					{dataFetched ? (
						<h1 className="current-description">{daily[0].Day.IconPhrase}</h1>
					) : (
						<p>loading...</p>
					)}
				</div>
				<div className="Main-search">
					<input type="text" list="search" placeholder={"search weather"} onChange={onSearch} />
					<datalist id="search">
						{suggestions.map((suggestion) => (
							<option value={suggestion.LocalizedName} />
						))}
					</datalist>
					<button
						className="add"
						onClick={() => {
							if (isFavorite) return removeFavorite(city);
							addToFavorites(city);
						}}>
						{isFavorite ? "Remove From favorites" : "Add to favorites"}
					</button>
				</div>
			</div>

			{dataFetched ? (
				<div>
					<ul>
						{daily.map((day, i) => {
							return (
								<li key={i}>
									<p>{new Date(day.Date).toString().split(" ")[0]}</p>
									<br />
									<p>
										{Math.floor(
											(day?.Temperature?.Maximum?.Value +
												day?.Temperature?.Minimum?.Value) /2)}C
									</p>
								</li>
							);
						})}
					</ul>
				</div>
			) : (
				<p>Loading...</p>
			)}
		</div>
	);
}

export default Main;
