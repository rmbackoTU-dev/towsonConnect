import {Component} from 'react';
import axios from 'axios'

class CourseCheckBox extends Component 
{
    constructor(props)
    {
        super(props);
        this.state=
        {
            checked:false
        }
        this.toggleCheckBoxChange = this.toggleCheckBoxChange.bind(this);
    }

    toggleCheckBoxChange()
    {
        const isChecked=this.state.checked;
        this.setState({checked:!isChecked});
        this.props.onChange(this.props.index)
    }

    render()
    {
        const  isChecked=this.state.checked;
        const itemIndex=this.props.index;
        const courseDescription=this.props.label;
        return(
            <div className="checkbox">
                    <label>
                        {courseDescription}
                        <input
                            type="checkbox"
                            value={itemIndex}
                            checked={isChecked}
                        />
                    </label>
            </div>
        );
    }
}

class CourseSelect extends Component
{
    constructor(props)
    {
        super(props);
        this.state=
        {
            coursesToList:[],
            role:"",
            success:false,
            coursesSelected:[],
        }
        this.onSubmit=this.onSubmit.bind(this);
        this.onSelectedChange=this.onSelectedChange.bind(this);
    }


    componentDidMount()
    {
        const userId=this.props.userId;
        console.log("Got user id from register: "+userId);
        let userEndpoint=
        {
            url: "http://localhost:8080/users/"+userId,
            method: "get",
        }
        axios(userEndpoint).then((res)=>
        {
            const userData=res.data;
            console.log("User Data: "+JSON.stringify(userData));
            const userRole=userData.userType;
            this.setState({role:userRole});
            console.log("User Role: "+userRole);
            if(userRole === "Teacher")
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
                let courseData=res.data;
                let limitedData=new Array(Object.keys(courseData).length);
                //sort the data by courses that don't have null
                courseData.forEach((course) => 
                {
                    let filteredItem =course;
                    if (!(filteredItem.Teacher))
                    {
                        console.log("pushing "+filteredItem.courseName);
                        limitedData.push(filteredItem);
                    }
                });
                this.setState({coursesToList:limitedData});
            }).catch((err)=>
            {
                console.log(err);
            });
        }
        else if(userRole === 'Student')
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
                let courseData=res.data;
                this.setState({coursesToList:courseData});
            
            }).catch((err) =>
            {
                console.log(err);
            });
            }
    }).catch((err)=>
    {
        console.log(err);
    })
            
    }

    onSubmit(values)
    {
        let idList=new Array(values.length);
        let userId=this.props.userId;
        for(let i=0; i< values.length; i++)
        {
            let currentId=values._id;
            idList.push(currentId);
        }
        let performRequest=async (requestObj) => 
        {
            axios(requestObj).then((res) => {
                const responseData=res.data
                console.log(responseData);
                this.setState({success:true});
                
            }).catch((err) => 
            {
                console.log(err);
                this.setState({success:false});
            })
        }
        for(let j=0; j< idList.length; j++)
        {
            let currentId=idList[j];
            let currentCourse=this.state.coursesToList[currentId];
            console.log("Current course is: "+JSON.stringify(currentCourse));
            if(this.state.role === "Teacher")
            {
                /*call the code to both post to teacher
                *and patch teacher.
                */
                let coursesPatchEndpoint=
                {
                    url: "http://localhost:8080/courses/",
                    method: 'patch',
                    data:currentCourse
                }
                let teachersPostEndpoint=
                {
                    url: "http://localhost:8080/teachers/",
                    method: 'post',
                    data:{
                        "userId":userId,
                        "course":currentCourse
                    }
                }
                console.log("Queing teacher post. ");
                performRequest(teachersPostEndpoint);
                console.log("Queing course update. ");
                performRequest(coursesPatchEndpoint);
            }
            console.log("Unloading all request");
        }
    }

    onSelectedChange(indexNum)
    {
        var currentListOfCourses=this.state.coursesSelected;
        currentListOfCourses.push(indexNum);
        this.setState({coursesSelected: currentListOfCourses });
    }

    render()
    {

        const courseList=this.state.coursesToList;
        var courseCheckBoxes=courseList.map((course, index) =>
            {
                let courseDesignator=course.subjectDesignator+" "+course.courseNum;
               
               return( <CourseCheckBox
                index={index}
                
                label={courseDesignator}
                />
                );
            }
        )

        return(
            <div className="courseSelector">
                <form className="courseSelectionForm" onChange={this.onSelectedChange}>
                    {courseCheckBoxes}
                    <button  onSubmit={this.onSubmit} className="btn btn-primary btn-block"> Submit </button>
                </form>
            </div>
        );
    }
}

export default CourseSelect;