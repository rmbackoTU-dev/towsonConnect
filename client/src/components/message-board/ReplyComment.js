import React, { Component } from 'react';
import { Row, Button, ListGroup, ListGroupItem } from 'react-bootstrap';
import Comment from './Comment';
import './Comments.scss';

export class ReplyComment extends Component {
    constructor(props){
        super(props);

        this.state = {
            comments: this.props.comments,
            threadId: this.props.threadId,
            parentId: this.props.parentId,
            userId: this.props.userId,
            userType: this.props.userType,
            comment_ids: this.props.comment_ids,
            commentNum: 0,
            showComments: false,
            user: this.props.user,
            loaded: false,
        }

        this.handleClick = this.handleClick.bind(this);
        this.getCommentNum = this.getCommentNum.bind(this);
    }

    componentDidMount = () => {
        this.getCommentNum();
    }

    getCommentNum = () => {
        var commentNum_ = 0;

        this.state.comments.map(comment => {
            if(comment.parent_id === this.state.parentId){
                commentNum_++;
            }
        })

        this.setState({commentNum: commentNum_})
    }

    handleClick = () => {
        this.setState({showComments: !this.state.showComments})
    }

    render() {
        console.log("Reply Comment State: ", this.state)
        return (
            <>
                <Row className="r_group">
                    {this.state.showComments ? 
                        <>
                            <ListGroupItem className="r_list">
                            <Row>
                               <Button variant="dark" onClick={this.handleClick}>Close comments</Button> 
                            </Row>
                            <Row>
                                <ListGroup as="ul" className="inner_r">
                                    {this.state.comments.map(comment => (
                                        (comment.parent_id === this.state.parentId && 
                                            <ListGroupItem key={comment._id} className="klk">
                                                <Comment 
                                                    comment={comment}
                                                    threadId={this.state.threadId}
                                                    parentId={comment._id}
                                                    userId={this.state.userId}
                                                    userType={this.state.userType}
                                                    user={this.state.user}
                                                    comment_ids={this.state.comment_ids}
                                                    refreshPage={this.props.refreshPage}
                                                />
                                                <ReplyComment 
                                                    comments={this.state.comments}
                                                    threadId={this.state.threadId}
                                                    parentId={comment._id}
                                                    userId={this.state.userId}
                                                    userType={this.state.userType}
                                                    user={this.state.user}
                                                    comment_ids={this.state.comments_ids}
                                                    refreshPage={this.props.refreshPage}
                                                />
                                            </ListGroupItem>
                                        )
                                    ))}
                                </ListGroup>   
                            </Row></ListGroupItem>
                        </>
                        : <Button variant="warning" onClick={this.handleClick} size="sm" className="com_button" >View {this.state.commentNum} comment(s)</Button>
                    }  
                </Row>
            </>
        )
    }
}

export default ReplyComment
