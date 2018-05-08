import React, { Component } from "react";

let img = "https://pixabay.com/api/?key=8814402-dfba581d7d4bbd350ea0d6f8b&q=";
let img_end = "&image_type=photo&pretty=true";

export class Image extends Component {
	constructor(props) {
		super(props);
		this.state = {
				error: null,
				image: {},
				isLoaded: false
		}
		this.getImage = this.getImage.bind(this);
	}


	getImage (city) {
		img += city + img_end;
		fetch(img)
		.then(res => res.json())
		.then(
			(result) => {
				this.setState({
					image: result.hits[3],
					isLoaded: true
				})
			},
			(error) => {
				this.setState({
					isLoaded: true,
					error
				});
			}
		)
	}

	componentWillMount() {
		this.getImage(this.props.city);
	}

	render() {
		const {error, image, isLoaded} = this.state;
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
					<img src={image.largeImageURL}/>
				</div>
			)
		}
	}
}