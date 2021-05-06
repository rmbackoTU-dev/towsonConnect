import React, { Component } from 'react';
import { Spinner, Container, Row, Col, Card, Button, ButtonGroup, Form, FormControl, FormGroup, FormLabel } from 'react-bootstrap';
import {HeaderTop, HeaderBottom } from '../header/Header';
import FeedContent from '../feed/FeedContent';
import CourseList from '../course-list/CourseList';
import Comments from './Comments';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './MessageBoard.scss';

function ContentSelection(props)
{
    const mainContent=props.content;
    if(mainContent === 0)
    {
        return(
            <div className='feedWrapper'>
                <FeedContent />
            </div>
        );
    }
    else
    {
        return(
            <div className='outerCourseWrapper'>
                <CourseList />
            </div>
        );
    }
}

export class MessageBoard2 extends Component {
    constructor(props){
        super(props);

        this.state = {
            loaded: false,
            content: 0,
            messages: [],
            userId: this.props.location.state.userId,
            userType: this.props.location.state.userType,
            thread_id: this.props.location.state.thread_id,
            desc: this.props.location.state.desc,
            created_at: this.props.location.state.created_at,
            message_ids: this.props.location.state.message_ids,
            creator_id: this.props.location.state.creator_id,
            creator_name: this.props.location.state.creator_name,
            title: this.props.location.state.title,
            uid:this.props.location.state.uid,
            course_id: this.props.location.state.course_id,
            showEditForm: false
        }

        this.handleContent = this.handleContent.bind(this);
        this.getMessages = this.getMessages.bind(this);
        this.updateComments = this.updateComments.bind(this);
        this.showEditButton = this.showEditButton.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleDescChange = this.handleDescChange.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.reloadMessageBoard = this.reloadMessageBoard.bind(this);
    }

    componentDidMount = () => {
        this.getMessages();
    }

    getMessages = async () => {
        var messages_ = [];
        //https://limitless-mountain-55127.herokuapp.com/messages
        await axios.get('http://localhost:8080/messages')
            .then(res => {
                res.data.forEach(message_ => {
                    for(var j = 0; j < this.state.message_ids.length; j++){
                        if(message_._id === this.state.message_ids[j]){
                            messages_.push(message_);
                        }
                    }
                });

                this.setState({messages: messages_, loaded: true}, async () => {
                    //console.log("MessageBoard 2 State (Post-load): ", this.state)
                });
            })
            .catch(() => {
                console.log("Error retrieving messages for MessageBoard2")
            })
    }

    updateComments = () => {
        this.setState({loaded: false});
        this.getMessages();
    }

    handleContent(page)
    {
        console.log("Called from NavBar");
        this.setState({content: page});
    }

    handleClick = () => {
        this.setState({showEditForm: !this.state.showEditForm})
    }

    handleDescChange = (event) => {
        this.setState({desc: event.target.value})
    }

    handleTitleChange = (event) => {
        this.setState({title: event.target.value})
    }

    handleSubmit = (event) => {
        event.preventDefault();

        const payload = {
            description: this.state.desc,
            title: this.state.title
        }

        var url = "http://localhost:8080/threads/";
        url = url.concat(this.state.thread_id);

        axios.patch(url, payload)
            .then(res => {
                console.log("Thread updated , " , res)

                this.reloadMessageBoard();
            })
            .catch(() => {
                console.log("Error editing thread")
            })
    }

    reloadMessageBoard = async () => {
        this.setState({loaded: false});

        var url2 = "http://localhost:8080/threads/";
        url2 = url2.concat(this.state.thread_id);

        await axios.get(url2)
            .then(resp => {
                console.log("Response after getting reloaded thread: ", resp)

                this.setState({title: resp.data.title, desc: resp.data.description, showEditForm: false});
                this.getMessages();
            })
            .catch(() => {
                console.log("Error reloading Message Board")
            })
    }

    showEditButton = () => {
        if(this.state.userId === this.state.creator_id){
            return(
                <div className="editForm">
                    {this.state.showEditForm ? 
                        <Form className="eform" onSubmit={this.handleSubmit}>
                            <FormGroup controlId="edit-thread">
                                <FormLabel>Title:</FormLabel>
                                <FormControl 
                                    type="text"
                                    rows={2}
                                    value={this.state.title}
                                    onChange={this.handleTitleChange} 
                                />
                                <FormLabel>Text:</FormLabel>
                                <FormControl 
                                    as="textarea"
                                    rows={3}
                                    value={this.state.desc}
                                    onChange={this.handleDescChange} 
                                />
                            </FormGroup>
                            <ButtonGroup>
                                <Button variant="primary" type="submit" className="seb">Submit</Button>
                                <Button variant="warning" onClick={this.handleClick} className="ceb">Cancel</Button>
                            </ButtonGroup>
                        </Form> : <Button variant="primary" onClick={this.handleClick} className="eb">Edit</Button>} 
                </div>
                
            );
        }
    }


    render() {
        if(this.state.loaded){
            console.log("MessageBoard state: ", this.state)
            return (
                <Container fluid className="message_board">
                    <Row className='content_header'>
                        <HeaderTop />
                        <HeaderBottom 
                            selectedItem={this.state.content}
                            onNavigation={this.handleContent}
                        />
                    </Row>
                    <Row className="bb">
                        <Link to={{
                            pathname: '/threadboard',
                            state: {course_id: this.state.course_id, userId: this.state.userId, userType: this.state.userType}
                        }}>
                            <Button>Back</Button>
                        </Link>
                    </Row>
                    <Row>
                        <Card className="descriptionCard">
                            <Card.Body>
                                <Card.Title>{this.state.title}</Card.Title>
                                <Card.Text>{this.state.desc}</Card.Text>
                                {this.showEditButton()}
                            </Card.Body> 
                        </Card>
                    </Row>
                    <Row className="d-flex justify-content-center">
                        <Col lg="12">
                          <Comments 
                                userId={this.state.userId}
                                userType={this.state.userType} 
                                threadId={this.state.thread_id} 
                                comments={this.state.messages} 
                                comments_ids={this.state.message_ids}
                                refreshPage={this.updateComments}
                                user={this.state.user}
                            />  
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

export default MessageBoard2
