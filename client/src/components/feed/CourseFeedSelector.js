//Feed Course Selector
import React, {Component, Fragment} from 'react';
import axios from 'axios';
import "./feed.css";


class CourseFeedSelectorItem extends Component
{
    
    render()
    {
        var courseList=this.props.courseNameList;
        var courseIDList=this.props.courseIdList;
        var courseListItems=courseList.map((course, index) => {

            return(
                <li id={courseIDList[index]} key={courseIDList[index]}>
                    {course}
                </li>
            );
        });
        return(
            <Fragment>
                {courseListItems}
            </Fragment>
        );
    }
}

class CourseFeedSelector extends Component
{
    constructor(props)
    {
        super(props);
        this.state=
        {
            courseList:['All'],
            courseIds:[0]
        };
    }

    componentDidMount= () =>
    {
        //Do axios logic here
        var doNotQuery=this.props.doNotQuery;
        if(!doNotQuery)
        {
            //Run Axios Query here
        }
    }

    render()
    {
        return(
            <div className="dynamic_course_div">
                <h2> Courses</h2>
                <ul className='course_list'>
                    <CourseFeedSelectorItem
                    courseNameList={this.state.courseList}
                    courseIdList={this.state.courseList}
                    />
                </ul>
            </div>
        );
    }
}



export default CourseFeedSelector;
