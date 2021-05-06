import {Component, Fragment} from 'react';
import SideBar from './SideBar';
import CourseFeedSelector from './CourseFeedSelector';
import Notification from './Notification';
import axios from 'axios';
import './feed.css'



class FeedContent extends Component
{
    constructor(props)
    {
        super(props);
        this.state=
        {
            selectedCategory: 'Notification',
            selectedCourse:{id: "All"},
            userId:this.props.userId,
            userType:this.props.userType,
            notificationsToDisplay:[]
        }
        this.categoryChangeListener=this.categoryChangeListener.bind(this);
        this.courseChangeListener=this.courseChangeListener.bind(this);
    }


     async componentDidMount()
    {
        let selected=this.state.selectedCourse.id;
        let currentType=this.state.selectedCategory;
        let usertype=this.state.userType;
        let userId=this.state.userId;
        console.log("Using: "+userId);
        if(selected === 'All')
        {
            if(usertype === 'Student')
            {
                const studentURL=
                {
                    url:"http://localhost:8080/student/"+userId,
                    method:"get",
                    headers:
                    {
                        'Content-Type':'application/json'
                    }
                };
                let allCourses= await axios(studentURL).then((response) =>
                {
                    let courses=response.data.course;
                    console.log("Courses is: "+JSON.stringify(courses));
                    let courseIDs=new Array();
                    for(let x=0; x< courses.length; x++)
                    {
                        let courseID=courses[x]._id;
                        courseIDs.push(courseID);
                    }
                    return(courseIDs);
                }).catch((err) => 
                {
                    console.log(err);
                });
                let notificationArray=new Array()
                for(let i=0; i<allCourses.length; i++)
                {
                    let course=allCourses[i];
                    console.log("Course is "+course);
                    const notificationsURL=
                    {
                        url:"http://localhost:8080/notifications/course/"+course,
                        method:"get",
                        headers:
                        {
                            'Content-Type':'application/json'
                        }
                    }
                    let notifications=await axios(notificationsURL).then((response) =>
                    {
                        let notificationData=response.data;
                        console.log("Got back "+JSON.stringify(notificationData));
                        return(notificationData);
                    }).catch((err) =>
                    {
                        console.log(err);
                    });

                    for(let j=0; j<notifications.length; j++)
                    {
                        let notification=notifications[j];
                        console.log("On notification "+JSON.stringify(notification));
                        notificationArray.push(notification);
                    }
                }
                this.setState({notificationsToDisplay: notificationArray});
            }
            else if(usertype === 'Teacher' )
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
                let allCourses= await axios(teacherURL).then((response) =>
                {
                    let courses=response.data.course;
                    console.log("Courses is: "+JSON.stringify(courses));
                    let courseIDs=new Array();
                    for(let x=0; x< courses.length; x++)
                    {
                        let courseID=courses[x]._id;
                        courseIDs.push(courseID);
                    }
                    return(courses);
                }).catch((err) => 
                {
                    console.log(err);
                });
                let notificationArray=new Array()
                for(let i=0; i<allCourses.length; i++)
                {
                    let course=allCourses[i];
                    const notificationsURL=
                    {
                        url:"http://localhost:8080/notifications/course/"+course,
                        method:"get",
                        headers:
                        {
                            'Content-Type':'application/json'
                        }
                    }
                    let notifications=await axios(notificationsURL).then((response) =>
                    {
                        let notificationData=response.data;
                        return(notificationData);
                    }).catch((err) =>
                    {
                        console.log(err);
                    });
                    for(let j=0; j<notifications; j++)
                    {
                        let notification=notifications[j];
                        let notificationType=notification.type;
                        if(currentType ==notificationType)
                        {
                            notificationArray.push(notification);
                        }
                    }
                }
                this.setState({notificationsToDisplay: notificationArray});
            }   
        }
        else
        {
            let courseToDisplayid=selected.id;
            console.log("Course is "+courseToDisplayid);
            let notificationArray=new Array();
            const notificationsURL=
                    {
                        url:"http://localhost:8080/notifications/course/"+courseToDisplayid,
                        method:"get",
                        headers:
                        {
                            'Content-Type':'application/json'
                        }
                    }
            let notifications=await axios(notificationsURL).then((response) =>
            {
                let notificationData=response.data;
                return(notificationData);
            }).catch((err) =>
            {
                console.log(err);
            });
            for(let j=0; j<notifications.length; j++)
            {
                let notification=notifications[j];
                let notificationType=notification.type;
                if(currentType ==notificationType)
                {
                        notificationArray.push(notification);
                }
            }
            this.setState({notificationsToDisplay:notificationArray});
        }
        
    }

    async componentDidUpdate(prevProps, prevState)
    {
        if((prevState.selectedCourse != this.state.selectedCourse) || (prevState.selectedCategory != this.state.selectedCategory))
        {
            let currentType=this.state.selectedCategory;
            let courseToDisplayid=this.state.selectedCourse.id;
            let courseToDisplay=this.state.selectedCourse;
            console.log("Course is "+ JSON.stringify(courseToDisplay));
            console.log("Course id is "+ courseToDisplayid);
            if(courseToDisplayid !== "All")
            {
                console.log("Course to display id is "+courseToDisplayid);
                let notificationArray=new Array();
                const notificationsURL=
                        {
                            url:"http://localhost:8080/notifications/course/"+courseToDisplayid,
                            method:"get",
                            headers:
                            {
                                'Content-Type':'application/json'
                            }
                        }
                let notifications=await axios(notificationsURL).then((response) =>
                {
                    let notificationData=response.data;
                    return(notificationData);
                }).catch((err) =>
                {
                    console.log(err);
                });
                console.log("GOT BACK "+JSON.stringify(notifications));
                for(let j=0; j<notifications.length; j++)
                {
                    let notification=notifications[j];
                    let notificationType=notification.type;
                    if(currentType ===notificationType)
                    {
                        console.log("Match");
                        notificationArray.push(notification);
                    }
                }
                this.setState({notificationsToDisplay:notificationArray});
            }

        }

    }



    categoryChangeListener(category)
    {
        console.log("GOT FROM SIDE BAR SELECTOR: "+JSON.stringify(category));
        this.setState({selectedCategory: category});
    }

    courseChangeListener(courseName)
    {
        console.log("GOT FROM COURSE SELECTOR: "+JSON.stringify(courseName));
        this.setState({selectedCourse:courseName});
    }

    render()
    {
        // const defaultNotification=
        // {
        //     _id:0,
        //     header: "Example",
        //     short_description:"This is an example.",
        //     long_description:"This is a long description of an example,"+ 
        //     "which explains all of the details about a given notification\n"+
        //     "The type of notification is set to "+this.state.selectedCategory,
        //     hyperlink:"https://www.duckduckgo.com"
        // }
        // const defaultNotifications=[defaultNotification];

        let currentNotifications=this.state.notificationsToDisplay;
        const notifications=currentNotifications.map((notification) => {
            const id=notification._id;
            const header=notification.header;
            const short_description=notification.short_descript;
            const long_description=notification.long_descript;
            const location=notification.hyperlink;
            console.log("id: "+id);
            console.log("header: "+header);
            console.log("short_description: "+short_description);
            console.log("long_description: "+long_description);
            console.log("location: "+location)
            return(<Notification 
                key={id}
                header={header}
                short_description={short_description}
                long_description={long_description}
                location={location}
            />);
        });

        return(
            <Fragment>
                <SideBar onNavigation={this.categoryChangeListener} />
                <div className='feedbox'>
                    <div className='left-feed'>
                        <CourseFeedSelector 
                        userId={this.state.userId}
                        userType={this.state.userType}
                        onCourseChange={this.courseChangeListener}
                        />
                    </div>
                    <div className='feed-items'>
                        {notifications}
                    </div> 
                </div>
            </Fragment>

        )
    }
}

export default FeedContent;