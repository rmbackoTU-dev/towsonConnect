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

    componentDidMount()
    {
        //Setup the user id and type
        const userId=this.props.userId;
        const userType=this.props.userType;
        if(userType === "Teacher")
        {
            const teacherURL=
            {
                url:"http://localhost:8080/teacher/"+userId,
                method:"get",
                headers:
                {
                    'Content-Type':'application/json'
                }
            };
            axios(teacherURL).then((response) => {
                 let studentData=response.data;
                 const courses=studentData.course;
                 const coursesURL=
                 {
                     url:'http://localhost:8080/courses/',
                     method: 'get',
                     headers:
                     {
                         'Content-Type':'application/json'
                     }
                 }
 
                 axios(coursesURL).then((response) =>
                 {
                     const coursesData=response.data;
                     var allCourses=Array();
                     courses.forEach((course, index) =>
                     {
                         const courseId=course._id;
                         coursesData.forEach((courseFromBackend) =>
                         {
                             if(courseId === courseFromBackend._id)
                             {
                                 const courseName=courseFromBackend.subjectDesignator+
                                 courseFromBackend.courseNum;
                                 let teacherName=userId
                                 let currentCourse=
                                    {
                                        id: courseId,
                                        name: courseName,
                                        teacher:teacherName,
                                    }
                                    allCourses.push(currentCourse); 
                                 
                             }
                         });
                         //fill the users names afterwards so all the data is in the list
                         const userEndpoint=
                         {
                            url: "http://localhost:8080/users/"+userId,
                            method:'get',
                            headers:
                            {
                                'Content-Type':'application/json'
                            }
                         };
                         axios(userEndpoint).then((result) => 
                         {          
                            const userData=result.data;
                            const teacherName=userData.userName;
                            allCourses.forEach((course, inPlaceIndex) =>
                            {
                                let currentCourse=
                                {
                                    id: course.id,
                                    name: course.name,
                                    teacher:teacherName,
                                }
                                allCourses[inPlaceIndex]=currentCourse;
                            });
                            this.setState({courseList: allCourses});
                        }).catch((err) => {
                            console.log(err);
                        });
                        
                     });
                }).catch((err) =>
                {
                    console.log(err)
                });   
            }).catch((err) =>
            {
                console.log(err)
            });         
        }
        else if(userType ==="Student")
        {

            //Attempting to get a single user object
            const studentURL=
            {
                url:"http://localhost:8080/student/"+userId,
                method:"get",
                headers:
                {
                    'Content-Type':'application/json'
                }
            };
            axios(studentURL).then((response) => {
                let studentData=response.data;
                const courses=studentData.course;
                const coursesURL=
                {
                    url:'http://localhost:8080/courses/',
                    method: 'get',
                    headers:
                    {
                        'Content-Type':'application/json'
                    }
                }

                axios(coursesURL).then((response) =>
                {
                    const coursesData=response.data;
                    var allCourses=Array();
                    courses.forEach((course, index) =>
                    {
                        const courseId=course._id;
                        
                        console.log("Currently on course "+index);
                        coursesData.forEach((courseFromBackend) =>
                        {
                            if(courseId === courseFromBackend._id)
                            {
                                const courseName=courseFromBackend.subjectDesignator+
                                    courseFromBackend.courseNum;
                                let teacherID=courseFromBackend.Teacher;
                                let teacherName="";
                                if(teacherID == null)
                                {
                                    teacherName="unassigned";
                                    
                                    let currentCourse=
                                    {
                                        id: courseFromBackend._id,
                                        name: courseName,
                                        teacher:teacherName,
                                    }
                                    allCourses.push(currentCourse);
                                }
                                else
                                {
                                    teacherName=teacherID;
                                    
                                    let currentCourse=
                                    {
                                        id: courseFromBackend._id,
                                        name: courseName,
                                        teacher:teacherName,
                                    };
                                    allCourses.push(currentCourse);
                                }
                            }
                        }
                        );
                    });
                    //fill the users names afterwards so all the data is in the list

                    allCourses.forEach((course, inPlaceIndex) =>
                    {
                        if(course.teacher !== "unassigned")
                        {
                            let teacherID=course.teacher;
                            const userEndpoint=
                            {
                                url: "http://localhost:8080/users/"+teacherID,
                                method:'get',
                                headers:
                                {
                                    'Content-Type':'application/json'
                                }
                            }
                            axios(userEndpoint).then((result) => 
                            {
                    
                                const userData=result.data;
                                const teacherName=userData.userName;
                                let currentCourse=
                                {
                                    id: course.id,
                                    name: course.name,
                                    teacher:teacherName,
                                }
                                allCourses[inPlaceIndex]=currentCourse;
                                console.log("Updating course list");
                                this.setState({courseList: allCourses});
                                
                            }).catch((err) => {
                                console.log(err);
                            });
                        }
                        
                    });   
                }).catch((err) =>
                {
                    console.log(err)
                });
            }).catch((err)=> {
                console.log(err);
            });
        }   
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
