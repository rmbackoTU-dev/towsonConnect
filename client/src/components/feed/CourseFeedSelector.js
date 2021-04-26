//Feed Course Selector
import React, {Component} from 'react';
import axios from 'axios';
import "./feed.css";


class CourseFeedSelectorItem extends Component
{
    constructor(props)
    {
        super(props);
        this.handleClick=this.handleClick.bind(this);
    }

    handleClick()
    {
        return (this.props.onClick( this.props.id));
    }


    render()
    {
        if(this.props.selected)
        {
            return(
                <li className='courseSelector' id={this.props.id}>
                        <div className='selectedCourse'>
                        <p onClick={this.handleClick}><b>{this.props.courseName}</b></p>
                        <p>{this.props.teacherName}</p>
                        </div>
                </li>
            );
        }
        else
        {
            return(
                <li className='courseSelector' id={this.props.id}>
                        <div className='unselectedCourse'>
                        <p onClick={this.handleClick}>{this.props.courseName}</p>
                        <p>{this.props.teacherName}</p>
                        </div>
                </li>
            );
        }
    }
}

class CourseFeedSelector extends Component
{
    constructor(props)
    {
        super(props);
        this.state=
        {
            courseList:[],
            selected:0
        };
        this.getCourseSelected=this.getCourseSelected.bind(this);
    }


    getCourseSelected(selectedCourseKey)
    {
        this.setState({selected: selectedCourseKey});
        const selectedCourse=this.state.courseList[selectedCourseKey];
        const selectedCourseName=selectedCourse.name;
        return(this.props.onCourseChange(selectedCourseName));
    }

    componentDidMount= () =>
    {
        //Do axios logic here
        const backendURL=
        {
            url:'https://jsonplaceholder.typicode.com/comments',
            method: 'get',
            headers:
            {
                'Content-Type':'application/json'
            }
        }
        axios(backendURL).then((response) =>
        {
            const coursesData=response.data;
            let allCourses=Array();
            for(let i=0; i< 10; i++)
            {
                let course={
                    id: coursesData[i].id,
                    name: coursesData[i].name,
                    teacher:coursesData[i].email,
                }
                allCourses.push(course);
                console.log("Got Course :"+allCourses[i].name)
            }
            this.setState({courseList:allCourses});
        }).catch((err) =>
        {
            console.log(err)
        });
    }

    render()
    {

        const courseData=this.state.courseList;
        console.log(courseData);
        const courseItemList=courseData.map((course, index) =>
        {
            const courseName=course.name;
            const teacherName=course.teacher;
            const keyNum=course.id;
            console.log("Sending in Course Name "+courseName);
            console.log("Sending in Teacher Name: "+teacherName)
            console.log("Sending in ID: "+keyNum)

            return(
                <CourseFeedSelectorItem
                courseName={courseName}
                teacherName={teacherName}
                id={index}
                key={keyNum}
                onClick={this.getCourseSelected}
                selected={(this.state.selected == index)}
                />
            );
        })


        return(
            <div className="dynamic_course_div">
                <div className='courseSelectorHeaderDiv' >
                    <h2> Courses</h2>
                </div>
                <ul className='course_list'>
                    {courseItemList}
                </ul>
            </div>
        );
    }
}



export default CourseFeedSelector;
