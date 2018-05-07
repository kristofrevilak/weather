import React, { Component } from "react";
import ReactDOM from "react-dom";

let weather = "http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=Bo2eoe3z7pXFlTeZLRFGkCJXxITS9tSq&q="
let weather_end = "&details=true"

let img = "https://pixabay.com/api/?key=8814402-dfba581d7d4bbd350ea0d6f8b&q=";
let img_end = "&image_type=photo&pretty=true";
 
class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            weather: [],
            image: []
        }
      }
      
      getLocation () {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.getWeather);
        }
      }
    
      getImage (city) {
        img += city + img_end;
        console.log(img);
        fetch(img)
        .then(res => res.json())
        .then(
          (result) => {
            console.log(result.hits[0]);
            this.setState({
              image: result.hits[0]
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
    
      getWeather (position) {
        weather += position.coords.latitude + "%2C" + position.coords.longitude + weather_end;
        fetch(weather)
        .then(res => res.json())
        .then(
          (result) => {
            const city = result.AdministrativeArea.EnglishName;
            this.setState({
              weather: result
            })
            .then(this.getImage(city));
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
        this.getLocation();
      }
    
      render() {
        const { error, isLoaded, weather, image } = this.state;
        if(error){
          return pug`
            div
                h1 Error has happened!
                p=error
            `;
        } else if(isLoaded == false){
          return pug`
            div
                h1 Loading.....
            `;
        } else {
          return pug`
            div
                h1 Weather:
                p=weather
                h1 Picture:
                p=image
            `;
        }
      }
    }
 
ReactDOM.render( <App />, document.querySelector( "#app" ) );