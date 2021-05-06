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
        console.log(isChecked);
        this.setState(({checked}) =>
        (
            {
                checked: !checked,
            }
        ));
        const newState=!(isChecked);
        console.log(newState);
        if(newState)
        {
            console.log("Checked")
            this.props.onChange(this.props.value, "add");
        }
        else
        {
            console.log("Unchecked");
            this.props.onChange(this.props.value, "remove");
        }
    }

    render()
    {
        const  isChecked=this.state.checked;
        const itemValue=this.props.value;
        const courseDescription=this.props.label;
        return(
            <div className="checkbox">
                    <label>
                        {courseDescription}
                        <input
                            type="checkbox"
                            value={itemValue}
                            checked={isChecked}
                            onChange={this.toggleCheckBoxChange}
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
            success:false,
            coursesSelected:[],
        }
        this.onSubmit=this.onSubmit.bind(this);
        this.onSelectedChange=this.onSelectedChange.bind(this);
    }


    async componentDidMount()
    {
        const userId=this.props.userId;
        const userType=this.props.userType;
        console.log("Got user id from register: "+userId);
        console.log("Got user type from register: "+userType);
        // let userEndpoint=
        // {
        //     url: "http://localhost:8080/users/"+userId,
        //     method: "get",
        // }
        // axios(userEndpoint).then((res)=>
        // {
        //     const userData=res.data;
        //     console.log("User Data: "+JSON.stringify(userData));
        //     const userRole=userData.userType;
        //     this.setState({role:userRole});
        //     console.log("User Role: "+userRole);
        if(userType === "Teacher")
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
        else if(userType === 'Student')
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
    // }).catch((err)=>
    // {
    //     console.log(err);
    // })
    }

    onSubmit(event)
    {
        const userType=this.props.userType;
        event.preventDefault();
        let values=this.state.coursesSelected;
        let idList=new Array(values.length);
        let userId=this.props.userId;
        for(let i=0; i< values.length; i++)
        {
             let currentId=values[i];
             idList.push(currentId);
             console.log("pushing "+currentId);
        }
        let currentCourse=this.state.coursesToList;
        let limitedList=new Array(idList.length);
        let courseIDData=""
        currentCourse.forEach((course) =>
        {
            let courseID=course._id;
            for(let j=0; j<idList.length; j++)
            {
                if(courseID === idList[j])
                {
                    console.log("Match!")
                    limitedList.push(course);
                    //create an id list for the teachers endpoint
                    if(courseIDData ==="")
                    {
                        courseIDData=idList[j];
                    }
                    else
                    {
                        courseIDData=courseIDData+","+idList[j];
                    }
                }
                else
                {
                    console.log("No Match");
                }
            }
        });

        if( userType === "Teacher")
        {
            let teachersPostEndpoint=
                    {
                        url: "http://localhost:8080/teacher/",
                        method: 'post',
                        data:{
                            "userId":userId,
                            "course":courseIDData
                        }
                    }
                    console.log("Queing teacher post. ");
                    axios(teachersPostEndpoint).then((res) => {
                        const responseData=res.data
                        console.log(responseData);
                    }).catch((err) => 
                    {
                        console.log(err);
                        this.setState({success:false});
                        this.props.onFormSubmit(this.state.success);
                    });
        }
        else if(userType === "Student")
        {
            let studentsPostEndpoint=
                    {
                        url: "http://localhost:8080/student/",
                        method: 'post',
                        data:{
                            "userId":userId,
                            "course":courseIDData
                        }
                    }
            console.log("Queing student post. ");
            axios(studentsPostEndpoint).then((res) => {
                const responseData=res.data
                console.log(responseData);
                this.setState({success:true});
                this.props.onFormSubmit(this.state.success);
            }).catch((err) => 
            {
                console.log(err);
                this.setState({success:false});
                this.props.onFormSubmit(this.state.success);
            });
        }

        limitedList.forEach((course) =>
        {
            let newCourse={
                _id:0,
            };
            if(userType === "Teacher")
            {
                console.log("Modifying: \n"+
                JSON.stringify(course));
                newCourse=
                {
                    _id:course._id,
                    courseName:course.courseName,
                    subjectDesignator:course.subjectDesignator,
                    courseNum:course.courseNum,
                    Teacher:userId
                } 
                console.log("Attempting to add: \n"+
                JSON.stringify(newCourse));
                    /*call the code to both post to teacher
                    *and patch teacher.
                    */
                    let coursesPatchEndpoint=
                    {
                        url: "http://localhost:8080/courses/",
                        method: 'patch',
                        data:newCourse
                    }
                    console.log("Queing course update. ");
                    axios(coursesPatchEndpoint).then((res) => {
                        const responseData=res.data
                        console.log(responseData);
                        this.setState({success:true});
                        this.props.onFormSubmit(this.state.success);
                    }).catch((err) => 
                    {
                        console.log(err);
                        this.setState({success:false});
                        this.props.onFormSubmit(this.state.success);
                    })
            }
        });
        console.log("Unloading all request");
        
        
    }

    onSelectedChange(idNum, change)
    {
        if(change === "add")
        {
            var currentListOfCourses=this.state.coursesSelected;
            currentListOfCourses.push(idNum);
            this.setState({coursesSelected: currentListOfCourses });   
        }
        else if(change === "remove")
        {
            var currentCourseList=this.state.coursesSelected;
            var newCourseList=Array();
            for(let k=0; k< currentCourseList.length; k++)
            {
                let currentCourse=currentCourseList[k];
                if(idNum !== currentCourse)
                {
                    newCourseList.push(currentCourse);               
                }
                else{
                    console.log("Unselecting :"+currentCourse)
                }
            }
            this.setState({coursesSelected: newCourseList});
        }
    }

    render()
    {
        let currentCourseList=this.state.coursesSelected;
        console.log("Courses in current course list");
        for(let x=0; x<currentCourseList.length; x++)
        {
            console.log("Course "+x+" index num "+currentCourseList[x]);
        }
        const courseList=this.state.coursesToList;
        var courseCheckBoxes=courseList.map((course, index) =>
            {
                let courseDesignator=course.subjectDesignator+" "+course.courseNum;
                let courseLabel=courseDesignator+": "+course.courseName;
                let courseValue=course._id;
            return( <CourseCheckBox
                index={index}
                onChange={this.onSelectedChange}
                label={courseLabel}
                value={courseValue}
                key={courseDesignator}
                />
                );
            }
        )

        return(
            <div className="courseSelector">
                <form className="courseSelectionForm" onSubmit={this.onSubmit}>
                    {courseCheckBoxes}
                    <input 
                    value="Submit" 
                    type="submit"
                    className="btn btn-primary btn-block" />
                </form>
            </div>
        );
        
    }
}

export default CourseSelect;