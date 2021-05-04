import React, {Component} from 'react';
import {HeaderTop, HeaderBottom } from '../header/Header';
import FeedContent from '../feed/FeedContent';
import CourseList from '../course-list/CourseList';
import './layout.css';


function ContentSelection(props)
{
    const mainContent=props.content;
    if(mainContent === 0)
    {
        return(
            <div className='feedWrapper'>
                <FeedContent
                userId={props.userId}
                userType={props.userType} />
            </div>
        );
    }
    else
    {
        return(
            <div className='outerCourseWrapper'>
                <CourseList 
                userId={props.userId}
                userType={props.userType}/>
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
            userId:this.props.location.state.userId,
            userType:this.props.location.state.userType
        }
        this.handleContent=this.handleContent.bind(this);
    }


    handleContent(page)
    {
        console.log("Called from NavBar");
        this.setState({content: page});
    }

    render()
    {
        console.log("The user id for this user is "+this.state.userId);
        console.log("The user type for this user is "+this.state.userType);
        return(
            <div className="content_wrapper">
                <div className='content_header'>
                    <HeaderTop />
                    <HeaderBottom 
                    selectedItem={this.state.content}
                    onNavigation={this.handleContent}
                    />
                </div>
                <ContentSelection 
                content={this.state.content}
                userId={this.state.userId}
                userType={this.state.userType}/>
            </div>
        );
    }

}

export default Layout;