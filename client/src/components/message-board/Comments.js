import React, { Component } from 'react';
import { Spinner, Row, ListGroup, ListGroupItem, Form, FormGroup, FormLabel, FormControl, Button } from 'react-bootstrap';
import Comment from './Comment';
import ReplyComment from './ReplyComment';
import axios from 'axios';
import './Comments.scss';

export class Comments extends Component {
    constructor(props){
        super(props);

        this.state = {
            loaded: true,
            user: this.props.user,
            message: '',
            threadId: this.props.threadId,
            comments: this.props.comments,
            comments_ids: this.props.comments_ids,
            userId: this.props.userId
        }

        this.handleMessageChange = this.handleMessageChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.resetInputs = this.resetInputs.bind(this);
    }

    resetInputs = () => {
        this.setState({
            message: ''
        })
    }

    handleMessageChange = (event) => {
        this.setState({message: event.target.value})
    }

    handleSubmit = (event) => {
        event.preventDefault();

        var comments_ids_ = this.state.comments_ids;

        if(this.state.message === ''){
            //do nothing
        }
        else{
            const payload = {
                author_id: this.state.userId,
                description: this.state.message
            }

            //https://limitless-mountain-55127.herokuapp.com/messages
            axios.post('http://localhost:8080/messages', payload)
                .then(res => {
                    console.log("Saved message: ", res);
                    this.resetInputs();

                    var new_comments_id = res.data._id;
                    comments_ids_.push(new_comments_id);

                    var str = 'http://localhost:8080/threads/';
                    str = str.concat(this.state.threadId);

                    axios.patch(str, {  message_ids: comments_ids_   })
                        .then(resp => {
                            //console.log("Updated thread state: ", resp);
                            //this.getMessages();
                            this.props.refreshPage();
                        })
                        .catch(() => {
                            console.log("Error updating current thread in MessageBoard2");
                        })
                })
                .catch(() => {
                    console.log("Error saving new message to MessageBoard2");
                });
        }
    }

    render() {
        if(this.state.loaded){
            console.log("Comments state: ", this.state)
            return (
                <>
                    <Row className="com_box d-flex justify-content-center">
                        <Form onSubmit={this.handleSubmit} className="dform">
                            <FormGroup controlId="formText">
                                <FormLabel>Enter a Message</FormLabel>
                                <FormControl 
                                    as="textarea" 
                                    rows={3} 
                                    placeholder="What's on your mind?"
                                    value={this.state.message}
                                    onChange={this.handleMessageChange} />
                            </FormGroup>
                            <Button variant="primary" type="submit" className="hnb">Submit</Button>
                        </Form>
                    </Row>
                    <Row className="sep"></Row>
                    <Row className="holds_comments">
                        <ListGroup as="ul" variant="flush" className="c_group">
                            {this.state.comments && this.state.comments.map(comment => (
                                (comment.parent_id === null ? 
                                    <ListGroupItem as="li" eventKey={comment._id} key={comment._id} className="jmk">
                                        <Comment key={comment._id}
                                            comment={comment} 
                                            threadId={this.state.threadId} 
                                            parentId={comment._id}
                                            userId={this.state.userId}
                                            user={this.state.user}
                                            comment_ids={this.state.comments_ids}
                                            refreshPage={this.props.refreshPage}
                                        />
                                        <ReplyComment 
                                            comments={this.state.comments}
                                            threadId={this.state.threadId}
                                            parentId={comment._id}
                                            userId={this.state.userId}
                                            user={this.state.user}
                                            comment_ids={this.state.comments_ids}
                                            refreshPage={this.props.refreshPage}
                                        />
                                    </ListGroupItem> : null
                                ) 
                            ))}
                            {this.state.comments.length === 0 ? 
                                <ListGroupItem as="li">
                                    There are no messages here yet
                                </ListGroupItem> : null}
                        </ListGroup>
                    </Row>
                </>
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

export default Comments
