import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import './ThreadCard.scss';
import { Button } from 'react-bootstrap';
import axios from 'axios';

export class ThreadCard extends Component {
    constructor(props){
        super(props);

        this.state = {
            thread: this.props.thread,
            users: this.props.users,
            userName: '',
            userId: this.props.userId,
            userType: this.props.userType,
            course_id: this.props.course_id,
            showDeleteButton: false
        }

        this.getUserName = this.getUserName.bind(this);
        this.showDeleteButton = this.showDeleteButton.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount = () => {
        this.getUserName();
    }

    showDeleteButton = () => {
        if(this.state.userId === this.state.thread.creator_id){
            return(
                <Button variant="danger" onClick={this.handleClick}>Delete</Button>
            )
        }
    }

    handleClick = (event) => {
        event.preventDefault();

        var url = "http://localhost:8080/threads/";
        url = url.concat(this.state.thread._id)

        axios.delete(url)
            .then(res => {
                this.props.refreshBoard();
            })
            .catch(() => {
                console.log("Error deleting thread")
            })
    }

    getUserName = () => {
        let user_;
        
        if(this.state.users.length === 0){
            //do nothing
        }
        else{
            this.state.users.forEach(user => {
                if(this.state.thread.creator_id === user._id){
                    user_ = user;
                }
            })

            this.setState({userName: user_.userName})
        }
        
        
    }

    render() {
        console.log("Thread card state: ", this.state)
        return (
            <Card className="threadCard">
                {this.state.thread.creator_type === "Student" ? 
                    <Card.Header>s/ {this.state.userName}</Card.Header> : <Card.Header>t/ {this.state.userName}</Card.Header>
                }
                <Card.Body>
                    <Link to={{
                            pathname: '/messageboard',
                            state: {
                                thread_id: this.state.thread._id,
                                desc: this.state.thread.description,
                                created_at: this.state.thread.created_at,
                                message_ids: this.state.thread.message_ids,
                                creator_id: this.state.thread.creator_id,
                                title: this.state.thread.title,
                                uid: this.props.userId,
                                userId: this.state.userId,
                                userType: this.state.userType,
                                course_id: this.state.course_id
                            }
                        }}>
                        <Card.Title>
                            {this.state.thread.title}
                        </Card.Title>
                    </Link>
                    <Card.Text>
                        {this.state.thread.description}
                    </Card.Text>
                    {this.showDeleteButton()}
                </Card.Body>
            </Card>
        )
    }
}

export default ThreadCard
