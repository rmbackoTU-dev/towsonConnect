import {Component, Fragment} from 'react';
import SideBar from './SideBar';
import CourseFeedSelector from './CourseFeedSelector';
import Notification from './Notification';
import './feed.css'



class FeedContent extends Component
{
    constructor(props)
    {
        super(props);
        this.state=
        {
            selectedCategory: 'Notifications',
            selectedCourse:'All',
            userId:this.props.userId,
            userType:this.props.userType
        }
        this.categoryChangeListener=this.categoryChangeListener.bind(this);
        this.courseChangeListener=this.courseChangeListener.bind(this);
    }

    categoryChangeListener(category)
    {
        this.setState({selectedCategory: category});
    }

    courseChangeListener(courseName)
    {
        this.setState({selectedCourse:courseName});
    }

    render()
    {
        const defaultNotification=
        {
            _id:0,
            header: "Example",
            short_description:"This is an example.",
            long_description:"This is a long description of an example,"+ 
            "which explains all of the details about a given notification\n"+
            "The type of notification is set to "+this.state.selectedCategory,
            hyperlink:"https://www.duckduckgo.com"
        }
        const defaultNotifications=[defaultNotification];

        
        const notifications=defaultNotifications.map((notification) => {
            const id=notification._id;
            const header=notification.header;
            const short_description=notification.short_description;
            const long_description=notification.long_description;
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