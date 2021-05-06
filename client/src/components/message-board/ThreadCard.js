import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import './ThreadCard.scss';

export class ThreadCard extends Component {
    constructor(props){
        super(props);

        this.state = {
            thread: this.props.thread,
            users: this.props.users,
            userName: '',
            userId: this.props.userId
        }

        this.getUserName = this.getUserName.bind(this);
    }

    componentDidMount = () => {
        this.getUserName();
    }

    getUserName = () => {
        let user_;
        
        this.state.users.forEach(user => {
            if(this.state.thread.creator_id === user._id){
                user_ = user;
            }
        })

        this.setState({userName: user_.userName})
        
    }

    render() {
        console.log("Thread card state: ", this.state)
        return (
            <Card className="threadCard">
                <Card.Header>by: {this.state.userName}</Card.Header>
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
                                userId: this.state.userId
                            }
                        }}>
                        <Card.Title>
                            {this.state.thread.title}
                        </Card.Title>
                    </Link>
                    <Card.Text>
                        {this.state.thread.description}
                    </Card.Text>
                </Card.Body>
            </Card>
        )
    }
}

export default ThreadCard
