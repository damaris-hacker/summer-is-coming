import React, { Component, Nav} from 'react';
import './../App.css';
import axios from 'axios';
import { Image, Button } from 'react-bootstrap'
import Slider from './Slider';
import { Link, Redirect } from 'react-router-dom';
import { Container } from 'react-bootstrap';




class Home extends React.Component {

    state = {
        login: this.props.userInSession
    }

    logout = () => {
        return axios.post('/api/logout', {})
            .then(response => response.data)
    }


    render() {
        return (

            <Container fluid>


                <div id="main-content">
                <div id="hero-section">

                <header>
                    <div class="overlay"></div>
                    <video playsinline="playsinline" autoplay="autoplay" muted="muted" loop="loop">
                        <source src="https://www.meetup.com/mu_static/de-DE/video.dddafbfe.mp4" type="video/mp4"/>
                    </video>
                    <div class="container h-100">
                        <div class="d-flex h-100 text-center align-items-center">
                        <div class="w-100 text-white">
                            <h1 class="display-3">The real world is calling</h1>
                            <p class="lead mb-0">Find activities you love and enjoy</p>
                            <Link to={"/signup"}>
                            <button class="home-btn">Join Befriend</button>
                            </Link>
                        </div>
                        </div>
                    </div>
                </header>

                <section class="my-5">
                <div class="container">
                    <div class="row">
                    <div class="col-md-8 mx-auto">
                        <p>Befriend is a plattform for anyone looking for activities which are fun, extrordinary and out of the usual way. You can contribute to our activities by adding activities which are worth sharing. </p>
                     
                        <p>Never ever be bored again.</p>
                       
                    </div>
                    </div>
                </div>
                </section>


                        
                        
                </div>
                </div>

                </Container>

                // {/* {this.state.sortedActivities ? <Slider sliderData={this.state.sortedActivities} /> : ""} */}


        );

    }

}

export default Home;

