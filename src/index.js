import React, { Component } from "react";
import ReactDOM from "react-dom";

import { Forecast } from "./Forecast";
import { Image } from "./Image";

let weather = "http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=Bo2eoe3z7pXFlTeZLRFGkCJXxITS9tSq&q="
let weather_end = "&details=true"
 
class Weather extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            city: "",
            key: "",
            isLoaded: false
        }
        this.getWeather = this.getWeather.bind(this);
      }
      
      getLocation () {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.getWeather);
        }
      }
    
      getWeather (position) {
        weather += position.coords.latitude + "%2C" + position.coords.longitude + weather_end;
        fetch(weather)
        .then(res => res.json())
        .then(
          (result) => {
            console.log(result.AdministrativeArea);
            this.setState({
              city: result.AdministrativeArea.EnglishName,
              key: result.Key,
              isLoaded: true
            }); 
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
        const {error, city, key, isLoaded} = this.state;
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
              <Forecast f_key={key}/>
              <Image city={city}/>
            </div>
          )
        }
      }
    }
 
ReactDOM.render( <Weather />, document.querySelector( "#app" ) );