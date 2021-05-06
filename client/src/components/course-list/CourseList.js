import {Component} from 'react';
import axios from 'axios'
import './courseList.scss'
import { ListGroup, ListGroupItem, Card, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function CourseItem(props)
{
    console.log(props.userId);
    return(
        <ListGroupItem key={props.itemId} className="courseItem">
            <Card>
                <Card.Header>
                    {`${props.subjectDesignator} ${props.courseNum}`}
                </Card.Header>
                <Card.Body>
                    <Link to={{
                        pathname: '/threadboard',
                        state: {course_id: props.itemId, userId: props.userId}
                        }}>
                        <Card.Title>{props.courseName}</Card.Title>
                    </Link>
                    <Card.Subtitle className="courseInstructor">{`Instructed by: ${props.teacherName}`}</Card.Subtitle>
                </Card.Body>
            </Card>
        </ListGroupItem>
    );
}

class CourseList extends Component
{
    constructor(props)
    {
        super(props);
        this.state=
        {
            courses:[],
            courses_: [],
            loaded: false,
            userId: this.props.userId
        }

        this.getCourses = this.getCourses.bind(this);
    }

    componentDidMount()
    {
        this.getCourses();
        
    }

    getCourses = async () => {
        await axios.get("http://localhost:8080/courses")
            .then(res => {
                //console.log("Courses in res: ", res);

                this.setState({courses_: res.data, loaded: true})
            })
            .catch(() => {
                console.log("Error getting courses");
            })
    }

    render()
    {
        if(this.state.loaded){
            console.log("CourseList state: ", this.state)

            const courseItems=this.state.courses_;
            const courseItemList=courseItems.map((item, index) => 
            {
                return(
                    <CourseItem
                        key={item._id}
                        courseName={item.courseName}
                        teacherName={item.Teacher}
                        courseNum={item.courseNum}
                        subjectDesignator={item.subjectDesignator}
                        itemId={item._id}
                        userId={this.state.userId}
                     />
                );
            });

            return(
                <div className='courseListWrapper'>
                    <div className='courseHeaderDiv'>
                        <h2>Your Courses:</h2>
                    </div>
                    <ListGroup className="courseListGroup">
                        {courseItemList}
                    </ListGroup>
                </div>
            );
        }
        else{
            return (
                <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
            );
        }
        
    }
}

export default CourseList;