import React, { Component } from 'react'
import axios from 'axios'
import { Container } from 'react-bootstrap';




class Weather extends Component {

    state = {
        location: 'Berlin, Germany'
    }

    componentDidMount(){
    axios.get('api/weather')
    .then((response) => {
        console.log('response.data',response.data)
        console.log('response.data.temperature',response.data.current.temperature)

        this.setState({
          weather: response.data,
        })
      })
    }

    render() {


        return (
            <Container>
            <div>

            <h1>Good Morning</h1>


        {this.state.weather ? 
            <h2>The temperate in {this.state.location} is {this.state.weather.current.temperature}C</h2>
            : <h2>The temperate in {this.state.location} is...</h2>

        }
            </div>
            </Container>
        )
    }
}

export default Weather;
