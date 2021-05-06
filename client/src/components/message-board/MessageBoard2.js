import React, { Component } from 'react';
import { Spinner, Container, Row, Col, Card } from 'react-bootstrap';
import {HeaderTop, HeaderBottom } from '../header/Header';
import FeedContent from '../feed/FeedContent';
import CourseList from '../course-list/CourseList';
import Comments from './Comments';
import axios from 'axios';
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
            thread_id: this.props.location.state.thread_id,
            desc: this.props.location.state.desc,
            created_at: this.props.location.state.created_at,
            message_ids: this.props.location.state.message_ids,
            creator_id: this.props.location.state.creator_id,
            creator_name: this.props.location.state.creator_name,
            title: this.props.location.state.title,
            uid:this.props.location.state.uid
        }

        this.handleContent = this.handleContent.bind(this);
        this.getMessages = this.getMessages.bind(this);
        this.updateComments = this.updateComments.bind(this);
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
                    <Row>
                        <Card className="descriptionCard">
                            <Card.Body>
                                <Card.Title>{this.state.title}</Card.Title>
                                <Card.Text>{this.state.desc}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Row>
                    <Row className="d-flex justify-content-center">
                        <Col lg="12">
                          <Comments 
                                userId={this.state.userId} 
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
