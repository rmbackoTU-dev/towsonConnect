import {Component} from 'react';
import axios from 'axios'
import './courseList.css'

function CourseItem(props)
{
    return(
        <li className='courseItem' id={props.key}>
            <h3 className='courseHeader'>Course Name:</h3>
            <a href={props.courseLink} 
            className='courseLink'>  {props.courseName} 
            </a>
            <p className='courseInstructor'>Taught by: {props.teacherName}</p>
        </li>
    );
}

class CourseList extends Component
{
    constructor(props)
    {
        super(props);
        this.state=
        {
            courses:[]
        }
    }

    componentDidMount()
    {
        const backendURL=
        {
            url:'https://jsonplaceholder.typicode.com/comments',
            method: 'get',
            headers:
            {
                'Content-Type':'application/json'
            }
        }
        axios(backendURL).then((response) => {
            const data=response.data;
            //get the first 10 for our purposes
            let coursesData=new Array(10);
            for(let i=0; i< 10; i++)
            {
                let course={
                    id: data[i].id,
                    name: data[i].name,
                    teacher:data[i].email,
                    link:"https://www.duckduckgo.com"
                }
                coursesData[i]=course;
                console.log("Got Course Data: "+JSON.stringify(course));
            }
            this.setState({courses:coursesData})
            
        }).catch((err) => {
            console.log(err);
        })
        
    }

    render()
    {
        const courseItems=this.state.courses;
        const courseItemList=courseItems.map((item, index) => 
        {
            return(
                <CourseItem
                key={item.id}
                courseName={item.name}
                courseInstructor={item.teacher}
                courseLink={item.link} />
            );
        });

        return(
            <div className='courseListWrapper'>
                <div className='courseHeaderDiv'>
                    <h2>Your Courses:</h2>
                </div>
                <ul className='courseList'>
                    {courseItemList}
                </ul>
            </div>
        )
    }
}

export default CourseList;