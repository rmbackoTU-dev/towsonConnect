import React, {Component, Fragment} from 'react';
import Header from '../header/Header.js';
import Feed from '../feed/Feed.js';
import CourseList from '../courseList/CourseList.js';
import './layout.css'
import { render } from '@testing-library/react';


class ContentBox extends Component
{
    render()
    {
        if(this.props.display ='Notifications')
        {
            return(
                <Feed />
            );
        }
        else if(this.props.display='Courses')
        {
            return(
                <CourseList />
            );
        }
        else
        {
            return(
                <div className='Error'>
                    <h1> An Error has occured</h1>
                </div>
            );
        }
    }
}

class Layout extends Component
{

    

    render()
    {
        return(
            <div className="wrapper">
                <Header />
                <ContentBox />
            </div>
        );
    }

}

export default Layout;