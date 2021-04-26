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

class Layout extends Component
{
    constructor(props)
    {
        super(props);
        this.state=
        {
            content: 0
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
        return(
            <div className="wrapper">
                <div className='header'>
                    <HeaderTop />
                    <HeaderBottom 
                    selectedItem={this.state.content}
                    onNavigation={this.handleContent}
                    />
                </div>
                <ContentSelection 
                content={this.state.content}/>
            </div>
        );
    }

}

export default Layout;