import React, { Component } from 'react';
import axios from 'axios';
import { Row, Col, Form, FormGroup, FormControl, FormLabel, Button, ButtonGroup, Card } from 'react-bootstrap';
import './Comments.scss';

export class Comment extends Component {
    constructor(props){
        super(props);

        this.state = {
            comment: this.props.comment,
            threadId: this.props.threadId,
            showReplyForm: false,
            message: '',
            parentId: this.props.parentId,
            userId: this.props.userId,
            comment_ids: this.props.comment_ids,
            user: this.props.user,
            author: ''
        }

        this.handleClick = this.handleClick.bind(this);
        this.handleMessageChange = this.handleMessageChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.resetInputs = this.resetInputs.bind(this);
        this.getAuthor = this.getAuthor.bind(this);
    }

    componentDidMount = () => {
        this.getAuthor();
    }

    getAuthor = async () => {
        var url = "http://localhost:8080/users/";
        url = url.concat(this.state.comment.author_id);
        await axios.get(url)
            .then(res => {
                this.setState({author: res.data.userName})
            })
            .catch(() => {
                console.log("Error getting user for comment")
            })
    }

    resetInputs = () => {
        this.setState({message: ''})
    }

    handleClick = () => {
        if(this.state.showReplyForm){
            this.resetInputs();
        }
        this.setState({showReplyForm: !this.state.showReplyForm});
    }

    handleMessageChange = (event) => {
        this.setState({message: event.target.value});
    }

    handleSubmit = (event) => {
        event.preventDefault();

        var comments_ids_ = this.state.comment_ids;

        if(this.state.message === ''){
            //do nothing
        }
        else{
            const payload = {
                author_id: this.state.user._id,
                description: this.state.message,
                parent_id: this.state.parentId
            }

            axios.post('http://localhost:8080/messages', payload)
                .then(res => {
                    console.log("Reply successfully saved");
                    console.log("Saved Reply: ", res);

                    var str = 'http://localhost:8080/messages/addChild/';
                    str = str.concat(this.state.parentId);

                    var new_comment_id = res.data._id;
                    comments_ids_.push(new_comment_id);

                    axios.patch(str, {  commentId: res.data._id })
                        .then(resp => {
                            console.log("Successfully updated parent comment");
                            console.log("Updated parent: ", resp);

                            //this.props.refreshPage();
                            
                            var str = 'http://localhost:8080/threads/';
                            str = str.concat(this.state.threadId);
                            
                            axios.patch(str, {  message_ids: comments_ids_   })
                                .then(respo => {
                                    //console.log("Updated thread state: ", respo);
                                    this.props.refreshPage();
                                })
                                .catch(() => {
                                    console.log("Error updating thread after saving Reply")
                                })
                        })
                        .catch(() => {
                            console.log("Error updating parent comment");
                        });
                })
                .catch(() => {
                    console.log("Error saving reply message");
                })
        }
    }

    render() {
        console.log("Comment state: ", this.state)
        return (
            <>
                <Row className="wol">
                    <Card className="wol_inner">
                        <Card.Body>
                            <Card.Subtitle></Card.Subtitle>
                            {this.state.comment.description}
                        </Card.Body>
                    </Card>
                </Row>
                <Row className="wolp">
                   {this.state.showReplyForm ? 
                    <Form onSubmit={this.handleSubmit} className="dform">
                        <FormGroup controlId="replyText">
                            <FormControl 
                                as="textarea" 
                                rows={3} 
                                placeholder="What's on your mind?"
                                value={this.state.message}
                                onChange={this.handleMessageChange} 
                            />
                        </FormGroup>
                        <ButtonGroup aria-label="basic example">
                            <Button variant="primary" type="submit" className="hnb2">Submit</Button>
                            <Button variant="warning" onClick={this.handleClick}>Cancel</Button>
                        </ButtonGroup>
                    </Form> : <Button variant="light" onClick={this.handleClick} className="rep_button">Reply</Button>} 
                </Row>
            </>
        )
    }
}

export default Comment
