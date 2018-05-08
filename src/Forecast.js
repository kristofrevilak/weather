import React, { Component } from "react";

let forecast = "http://dataservice.accuweather.com/forecasts/v1/daily/5day/";
let forecast_end = "?apikey=Bo2eoe3z7pXFlTeZLRFGkCJXxITS9tSq&details=true&metric=true"

export class Forecast extends Component {

	constructor(props) {
		super(props);
		this.state = {
				error: null,
				forecast: {},
				isLoaded: false
		}
		this.getForecast = this.getForecast.bind(this);
	}

	getForecast (key) {
		forecast += key + forecast_end;
		fetch(forecast)
		.then(res => res.json())
		.then(
			(result) => {
				this.setState({
					forecast: result,
					isLoaded: true
				})
			},
			(error) => {
				this.setState({
					isLoaded: true,
					error
				})
			}
		)
	}

	componentWillMount() {
		this.getForecast(this.props.f_key);
	}

	render() {
		const {error, forecast, isLoaded} = this.state;
		if(error) {
			return (
				<div>
					<p>{error}</p>
				</div>
			)
		} else if(isLoaded == false){
			return (
				<div>
					<p>Waiting..</p>
				</div>
			)
		} else {
			return (
				<div>
					<p>{forecast.Headline.Text}</p>
				</div>
			)
		}
	}
}