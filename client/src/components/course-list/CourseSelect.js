import {Component} from 'react';
import axios from 'axios'


class CourseSelect extends Component
{
    constructor(props)
    {
        super(props);
        this.state=
        {
            coursesToList:[],
            role:this.props.roleName
        }
    }


    componentDidMount()
    {
        if(role === "Teacher")
        {
            console.log("Gathering courses left to teach");
            let coursesEndpoint=
            {
                url: "http://localhost:8080/courses/",
                method: 'get',
                headers:
                {
                'Content-Type':'application/json'
                }
            }
            axios(coursesEndpoint).then((res)=> 
            {
                courseData=res.data;
                let limitedData=new Array[length(courseData)]
                //sort the data by courses that don't have null
                courseData.array.forEach((course) => 
                {
                    let filteredItem =course;
                    if (!(filteredItem.Teacher))
                    {
                        console.log("pushing"+filteredItem.courseName);
                        limitedData.push(filteredItem);
                    }
                });

                this.setState({coursesToList:limitedData});
                
            }).catch(err)
            {
                console.log(err);
            }
        }
        else if(role === 'Student')
        {
            console.log("Gathering courses to signup for");
            let coursesEndpoint=
            {
                url: "http://localhost:8080/courses/",
                method: 'get',
                headers:
                {
                'Content-Type':'application/json'
                }
            }
            axios(coursesEndpoint).then((res)=> 
            {
                courseData=res.data;
                this.setState({coursesToList:res.data});
                
            }).catch(err)
            {
                console.log(err);
            }
        }
    }


    render()
    {
        
    }
}