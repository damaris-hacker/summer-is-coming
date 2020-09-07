import React, { Component } from "react";
import { Link } from 'react-router-dom';
import "../../App.css";
import 'bootstrap/dist/css/bootstrap.css';
import { Container, Card, Image, Nav, Col, Row } from 'react-bootstrap';
import axios from "axios";
/*import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faClipboard } from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar, faClipboard as farClipboard } from '@fortawesome/free-regular-svg-icons';
 import moment */



class Userprofile extends Component {
  state = {
    loading: true,
    user: null,
    /*     myBucketlistArr: this.props.loggedInUser ? this.props.loggedInUser.myBucketlist : "" */
  }


  componentDidMount() {
    axios.get('/api/user/' + this.props.userID).then((response) => {
      this.setState({
        user: response.data,
        loading: false
      })
    })
  }

  /*   
    // add that activity to user's bucketlist
    updateUserBucketlistAddHandler = (event) => {
      event.preventDefault()
  
      let myBucketlistArr = this.state.myBucketlistArr
      myBucketlistArr.push(this.props.match.params.identifier)
  
      axios.put('/activities/' + this.props.match.params.identifier, { myBucketlistArr, myFavoriteActivitiesArr: this.state.myFavoriteActivitiesArr }).then(() => {
        this.setState({
          myBucketlistArr: myBucketlistArr
        })
      })
    }
  
    // remove that activity from user's bucketlist
    updateUserBucketlistRemoveHandler = (event) => {
      event.preventDefault()
  
      let myBucketlistArr = this.state.myBucketlistArr
      myBucketlistArr = myBucketlistArr.filter((id) => {
        return this.props.match.params.identifier !== id
      })
  
      axios.put('/activities/' + this.props.match.params.identifier, { myBucketlistArr, myFavoriteActivitiesArr: this.state.myFavoriteActivitiesArr }).then(() => {
        this.setState({
          myBucketlistArr: myBucketlistArr
        })
      })
    }
   */
  render() {
    if (this.state.loading) {
      return <div>Loading…</div>
    }
    return (
      
      <Container> 
      <div>
        {this.props.userID !== this.props.userInSession._id ? "" : <Nav.Link href="/editprofile"> Edit my profile </Nav.Link>}

        {/*     Shows the Name of the current user
        {this.state.loading ? "" : this.state.user.username} */}

        {/* // ERROR MESSAGE IF USER IS NOT LOGGED IN // */}
        {/* {this.state.errorMessage ? <h1>{this.state.errorMessage}</h1> : null} */}

        <Card>

        <div className="profile">

            <div className="profileimage">
              <Image src={this.state.user.profilePicUrl} alt="profile-pic" thumbnail fluid />
            </div>

            <div className="profile-info">
              <Card.Title> <h3>{this.state.user.username}'s Profile</h3> </Card.Title>
              <div>
                <div className="inline">Name:</div> {this.state.user.username} <br />
                {/* Living in: <br /> */}
                <div className="inline">Member since:</div> {this.state.user.created.split('T')[0]} <br />
                {/* find out how to show the date in pretty with .timeStamp */}
                <div>My Interests:</div>
                <ul>
                  {this.state.user.myInterests.length > 0 ? this.state.user.myInterests.map((i, key) => <li key={key} className="inline">{i} / </li>) : "Sorry, I'm not interested :("}
                  {/* {JSON.stringify(this.state.user.myFavoriteActivities, null, 2)} */}
                </ul>


                {/* show ONLY if it's ur own profile (like "edit profile")
                <h5>E-Mail: {this.props.userInSession.email}</h5> */}

              </div>
            </div>
          </div>
        </Card>



        <br />
        <Card>

        <div className="favouriteActivities">

          <Card.Title id="lists" className="text-center"><h3>My favourite activities:</h3></Card.Title>
          <Container>

         <Row className="no-gutters">
          <Col xs={12} sm={6} md={6} lg={3}>
            <div className="activity-padding">
              {this.state.user.myFavoriteActivities.length > 0 ? this.state.user.myFavoriteActivities.map((fav, key) =>
                <Link to={"/activities/" + fav._id} key={fav._id} className="border-bottom">
                  <div className="activity-card">
                    <div className="img-div">
                      <Image src={fav.pictureUrl} alt={fav.title} className="activity-img" />
                    </div>
                    <div className="text-div">
                      <h3>{fav.title}</h3>
                      <div>
                        {fav.tags.map(tag => {
                          return (
                            <span id="interest-tag">{tag}</span>
                          )
                        })}
                      </div>
                      <p className="activitiy-txt">{fav.location}</p>
                    </div>
                  </div><br />
                </Link>) : <div className="text-center margin0">I've no favourite activities yet.</div>}
            </div>
          </Col>
          </Row>
</Container>
          </div>
        </Card>
        <br />



        <Card>
          
        <div className="bucket-list">
            <Card.Title id="lists" className="text-center"><h3>My Bucket List</h3></Card.Title>

            <Col xs={12} sm={6} md={6} lg={3}>

              <div>
              
                {this.state.user.myBucketlist.length > 0 ? this.state.user.myBucketlist.map((b, key) =>
                
                  <Link to={"/activities/" + b._id} key={key._id} className="border-bottom">
                    <div className="activity-card">
                      <div className="img-div">
                        <Image src={b.pictureUrl} alt={b.title} className="activity-img" />
                      </div>
                      <div className="text-div">
                        <h3>{b.title}</h3>
                        <div>
                          {b.tags.map(tag => {
                            return (
                              <span id="interest-tag">{tag}</span>
                            )
                          })}
                        </div>
                        <p className="activitiy-txt">{b.location}</p>
                        {/* Favs und bucket list icons HERE to add and remove direct */}
                        {/*                       <div>{this.props.loggedInUser ?
                        <p>{this.state.myBucketlistArr.includes(this.state.activity._id) ?
                          <Button onClick={this.updateUserBucketlistRemoveHandler}><FontAwesomeIcon icon={faClipboard} size={"1x"} style={{ color: "#FFF" }} /> Remove from my bucket list</Button>
                          : <Button onClick={this.updateUserBucketlistAddHandler}><FontAwesomeIcon icon={farClipboard} size={"1x"} style={{ color: "#FFF" }} /> Add to my bucket list</Button>}</p>
                        : null}
                      </div> */}

                      </div>
                    </div><br />
                  </Link>) : <div className="text-center margin0">I've got nothing to do.</div>}
              </div>


            </Col>
            </div>
        </Card>

        <Col>
          <Link to="/activities">Go back to all activities</Link>
        </Col>
        <br />
      
      </div>
      </Container> 
    );
  }
}

export default Userprofile;
