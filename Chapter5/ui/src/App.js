import React, { Component } from 'react';
import {
  Container,
  Row,
  Col,
  Navbar,
  Nav,
  Form,
  FormControl
} from 'react-bootstrap';

import './App.css';

const rekognitionApiBaseUrl = 'https://ge3z4540ad.execute-api.us-east-1.amazonaws.com/dev/';
const neptuneApiBaseUrl = 'https://ge3z4540ad.execute-api.us-east-1.amazonaws.com/dev/';
const s3BucketUrl = 'https://s3.amazonaws.com/mbudmrekphotos/';

const getImageUrl = (key) => `${s3BucketUrl}${key}`;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      threshold: 80,
      hops: 2,
      bucketList: [],
      similarList: [],
      sourceImage: false
    };
  }

  componentWillMount(){
    fetch(`${rekognitionApiBaseUrl}list`)
      .then((response) => response.json())
      .then(photos => {
        this.setState({
          bucketList: photos
        });
      })
      .catch(console.error);
  }

  render() {
    return (
      <div>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="#home">Neptune UI</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
            </Nav>
            <Form inline >
              <Form.Label className="mr-lg-2" >Threshold</Form.Label>
              <FormControl 
                type="number" 
                size="xs" 
                value={this.state.threshold} 
                max="100" 
                min="0" 
                step="1" 
                onChange={this.handleFieldChange}
                id="threshold"/>
              <Form.Label className="ml-lg-4 mr-lg-2" >Hops</Form.Label>
              <FormControl 
                type="number" 
                size="xs" 
                value={this.state.hops} 
                max="10" 
                min="1" 
                step="1" 
                onChange={this.handleFieldChange}
                id="hops"/>
            </Form>
          </Navbar.Collapse>
        </Navbar>
        <Container>
          {this.state.sourceImage ? this.renderSourceImage() : this.renderBucketList() }
        </Container>
      </div>
    );
  }
  
  renderSourceImage(){
    return (
      <Row>
        <Col>col 1</Col>
      </Row>
    );
  }
  
  renderBucketList(){
    return (
      <Row>
        {Array.isArray(this.state.bucketList) && this.state.bucketList.map(key => this.renderPhoto(key))}
      </Row>
    );
  }

  renderPhoto(key){
    return (<Col key={key} xs={6} sm={4} md={3}>
      <img
        src={getImageUrl(key)}
        alt=""
        className="img-fluid"
        onClick={this.handlePhotoClick}
        data-key={key}
      />
    </Col>);
  }

  handleFieldChange = (e) =>{
    const {
      id,
      value
    } = e.target;
    this.setState({
      [id]: value
    });
  }

  handlePhotoClick = (e) =>{
    const {
      key
    } = e.target.dataset;
    console.log('img key clicked', key);

    fetch(`${neptuneApiBaseUrl}query`, {
      method: 'POST',
      body: {
        
      }
    })
      .then((response) => response.json())
      .then(photos => {
        this.setState({
          bucketList: photos
        });
      })
      .catch(console.error);
  }
}

export default App;
