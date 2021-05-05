import React, {Component} from 'react';
import {HeaderTop, HeaderBottom } from '../header/Header';
import FeedContent from '../feed/FeedContent';
import CourseList from '../course-list/CourseList';
import './layout.scss';
import { Spinner } from 'react-bootstrap';


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

class Layout extends Component
{
    constructor(props)
    {
        super(props);
        this.state=
        {
            content: 0,
            userId:this.props.location.state.user_id,
            userType:this.props.location.state.userType,
            loggedIn:false,
            loaded: false
        }
        this.handleContent=this.handleContent.bind(this);
        this.setLoggedIn = this.setLoggedIn.bind(this);
    }

    componentDidMount()
    {
       this.setLoggedIn(); 
    }

    setLoggedIn = () => {
        this.setState({loggedIn: true, loaded: true});
    }

    handleContent(page)
    {
        console.log("Called from NavBar");
        this.setState({content: page});
    }

    render()
    {
        if(this.state.loaded){
            console.log("The user id for this user is "+this.state.userId);
            console.log("The user type for this user is "+this.state.userType);
            console.log("Logged in: ", this.state.loggedIn);
            
            return(
                <div className="content_wrapper">
                    <div className='content_header'>
                        <HeaderTop success={this.state.loggedIn} />
                        <HeaderBottom 
                            selectedItem={this.state.content}
                            onNavigation={this.handleContent}
                        />
                    </div>
                    <ContentSelection 
                        content={this.state.content}
                        userId={this.state.userId}
                        userType={this.state.userType}
                    />
                </div>
            );
        }
        else{
            return(
                <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
            );
        }
    }

}

export default Layout;