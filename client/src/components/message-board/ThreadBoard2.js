import React, { Component } from 'react';
import {Container, Spinner, Row, Col, Form, FormControl, FormGroup, FormLabel, Button, ButtonGroup} from 'react-bootstrap';
import {HeaderTop, HeaderBottom } from '../header/Header';
import FeedContent from '../feed/FeedContent';
import CourseList from '../course-list/CourseList';
import axios from 'axios';
import ThreadCard from './ThreadCard';
import { Link } from 'react-router-dom';
import './ThreadBoard.scss';



function ContentSelection(props)
{
    const mainContent=props.content;
    if(mainContent === 0)
    {
        return(
            <div className='feedWrapper'>
                <FeedContent 
                    userId={props.userId}
                    userType={props.userType}
                />
            </div>
        );
    }
    else
    {
        return(
            <div className='outerCourseWrapper'>
                <CourseList 
                    userId={props.userId}
                    userType={props.userType}
                />
            </div>
        );
    }
}

export class ThreadBoard2 extends Component {
    constructor(props){
        super(props);

        this.state = {
            loaded: false,
            content: 0,
            course_id: this.props.location.state.course_id,
            threads: [],
            users: [],
            showForm: false,
            title: '',
            description: '',
            userId: this.props.location.state.userId,
            userType: this.props.location.state.userType
        }

        this.handleContent = this.handleContent.bind(this);
        this.getThreads = this.getThreads.bind(this);
        this.getUsers = this.getUsers.bind(this);
        this.setShowForm = this.setShowForm.bind(this);
        this.resetInputs = this.resetInputs.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.displayThreads = this.displayThreads.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount = () => {
        //this.setState({loaded: true})
        this.getUsers();
        this.getThreads();
    }

    getThreads = async () => {
        var url = "http://localhost:8080/threads/course/";
        url = url.concat(this.state.course_id);

        await axios.get(url)
            .then(res => {
                console.log("Response: ", res)

                this.setState({threads: res.data, loaded: true})
            })
            .catch(() => {
                console.log("Error getting thread from course id")
            })
    }

    getUsers = async () => {
        const url = "http://localhost:8080/users";

        //var users_ = [];

        await axios.get(url)
            .then(res => {
                console.log(res)
                this.setState({users: res.data})
            })
            .catch(() => {
                console.log("Error getting users")
            })
    }

    handleContent(page)
    {
        console.log("Called from NavBar");
        this.setState({content: page});
    }

    handleTitleChange = (event) => {
        this.setState({title: event.target.value});
    }

    handleDescriptionChange = (event) => {
        this.setState({description: event.target.value});
    }

    handleSubmit = (event) => {
        event.preventDefault();

        const payload = {
            creator_id: this.state.userId,
            creator_type: this.state.userType,
            course_id: this.state.course_id,
            title: this.state.title,
            description: this.state.description
        }

        //https://limitless-mountain-55127.herokuapp.com/threads
        axios.post("http://localhost:8080/threads", payload)
            .then(res => {
                this.resetInputs();
                this.getThreads();
            })
            .catch(() => {
                console.log("Error saving new thread")
            })

    }

    setShowForm = () => {
        if(this.state.showForm){
            this.resetInputs();
        }

        this.setState({
            showForm: !this.state.showForm
        });
    }

    resetInputs = () => {
        this.setState({
            title: '',
            description: ''
        });
    }

    displayThreads = () => {
        //if(!this.state.threads.length) return null;

        if(this.state.threads.length === 0){
            return (
                <div className="no-threads">
                    <h1>It looks like there are no threads here</h1>
                    <h3>How about you bring some life here by creating a new thread</h3>
                </div>
            )
        }

        return this.state.threads.map(thread => (
            <Row key={thread._id} className="threadRow">
                <ThreadCard course_id={this.state.course_id} thread={thread} userId={this.state.userId} userType={this.state.userType} users={this.state.users} />
            </Row>
        ));
    }

    render() {
        if(this.state.loaded){
            console.log("Threadboard state: ", this.state)
            return (
                <Container fluid className="thread_board">
                    <Row className='content_header'>
                        <HeaderTop />
                        <Col>
                            <Row className="justify-content-end">
                                <Link to={{
                                        pathname: '/course-list',
                                        state: {userId: this.state.userId, userType: this.state.userType}
                                    }}>
                                    <Button>Courses</Button>
                                </Link> 
                            </Row>
                            <Row className="justify-content-end">
                            <Link to="/login" className="logout-button" id="login" role="button" style={{color: "#ffc00f", "padding-top": "9px"}}>
                                Logout
                            </Link>
                            </Row>
                        </Col>
                    </Row>
                    <Row className="d-flex justify-content-end">
                        <Col>
                            {this.state.showForm ? 
                                <Form onSubmit={this.handleSubmit}>
                                    <FormGroup controlId="threadText">
                                        <FormLabel>Enter a Title</FormLabel>
                                        <FormControl 
                                            type="text"
                                            rows={2}
                                            value={this.state.title}
                                            onChange={this.handleTitleChange}
                                        />
                                        <FormLabel>Enter some Text</FormLabel>
                                        <FormControl 
                                            as="textarea"
                                            rows={3}
                                            placeholder="What do you want to say?"
                                            value={this.state.description}
                                            onChange={this.handleDescriptionChange}
                                        />
                                    </FormGroup>
                                    <ButtonGroup>
                                        <Button variant="primary" type="submit">Submit</Button>
                                        <Button variant="secondary" onClick={this.setShowForm}>Cancel</Button>
                                    </ButtonGroup>
                                </Form> : <Button variant="primary" onClick={this.setShowForm}>Create New Thread</Button>}
                        </Col>
                    </Row>
                    <Row className="d-flex justify-content-center">
                        <Col lg="8">
                            <Row className="d-flex justify-content-center"><h1 style={{color: 'white'}}>Threadboard</h1></Row>
                            {this.displayThreads()}
                        </Col>  
                    </Row>
                </Container>
            )
        }
        else{
            return (
                <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
            )
        }
        
    }
}

export default ThreadBoard2
