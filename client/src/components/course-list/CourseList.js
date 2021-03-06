import {Component} from 'react';
import axios from 'axios'
import './courseList.scss'
import { ListGroup, ListGroupItem, Card, Spinner, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function CourseItem(props)
{
    return(
        <ListGroupItem key={props.itemId} className="courseItem">
            <Card>
                <Card.Header>
                    {`${props.subjectDesignator} ${props.courseNum}`}
                </Card.Header>
                <Card.Body>
                    <Link to={{
                        pathname: '/threadboard',
                        state: {course_id: props.itemId, userId: props.userId, userType: props.userType}
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
            userId: this.props.userId,
            userType: this.props.userType,
            loadedFromComp: false
        }

        this.getCourses = this.getCourses.bind(this);
        this.updateTeacherName=this.updateTeacherName.bind(this);
    }

    async componentDidMount()
    {
        if(typeof this.state.userId === undefined || typeof this.state.userType === 'undefined'){
            await this.setState({userId: this.props.location.state.userId, userType: this.props.location.state.userType, loadedFromComp: true}, function() {
                var url2 = "http://localhost:8080/student/";
                url2 = url2.concat(this.state.userId);
                let w;

                axios.get(url2)
                    .then(res => {
                        console.log("From students table: ", res)
                        w = res.data.course;
                        console.log("W: ", w)

                        this.setState({courses_: w})
                    })
                    .catch(() => {
                        console.log("Error getting from students table")
                    })
            })
        }
        await this.getCourses();
        console.log("State "+JSON.stringify(this.state.courses_));
        await this.updateTeacherName();
        
    }

    getCourses = async () => {   
        var url2 = "http://localhost:8080/student/";
        url2 = url2.concat(this.state.userId);
        let w;

        await axios.get(url2)
            .then(res => {
                console.log("From students table: ", res)
                w = res.data.course;
                console.log("W: ", w)

                this.setState({courses_: w})
            })
            .catch(() => {
                console.log("Error getting from students table")
            })
    }

    updateTeacherName = async () =>
    {
        let courses=this.state.courses_;
        
        console.log("Courses length "+courses.length);
        for(let i=0; i< courses.length; i++)
        {
            let item=courses[i];
            let teacherID=item.Teacher;
            if(teacherID == null )
            {
                item["Teacher"]="Unregistered";
                console.log("Teacher: "+item["Teacher"]);
                courses[i]=item;
            }
            else{
                await axios.get("http://localhost:8080/users/"+teacherID)
                .then(res => {
                    console.log("Courses in res: ", JSON.stringify(res));
                    let currentUserName=res.data.userName;
                    item["Teacher"]=currentUserName;
                    console.log("Teacher: "+item["Teacher"]);
                    courses[i]=item;
                })
                .catch(() => {
                    console.log("Error getting courses");
                });
            }
        }
        this.setState({courses_:courses, loaded: true});
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
                        userType={this.state.userType}
                     />
                );
            });

            if(!this.state.loadedFromComp){
                return(
                    <div className='courseListWrapper'>
                        <div className='courseHeaderDiv'>
                            <h2>Your Courses:</h2>
                        </div>
                        <ListGroup className="courseListGroup">
                            {courseItemList}
                        </ListGroup>
                    </div>
                )
            }
            else{
                return(
                    <Container fluid className="courseListWrapper">
                        <Row className="header">
                         <Col>
                             <div className='header-top'>
                                 <div className='logo-icon'>
                                     <img src={process.env.PUBLIC_URL +'/towson-branded-logos/TowsonU_ConnectLogo.png'}
                                         alt='Towson University Logo'
                                         className='towsonLogo'/>
                                 </div>
                                 
                             </div>
                         </Col>
                         <Col className="clhr">
                             <Row className="d-flex justify-content-end">
                             <div className='user-icon'>
                                <img src={process.env.PUBLIC_URL + '/nav-logos/user-icon.png'} 
                                alt='Default User Head'/>
                            </div>
                                 <div className="logout-div">
                                    <Link to="/login" className="logout-button" id="login" role="button">
                                        Logout
                                    </Link>
                                </div>
                             </Row>
                         </Col>
                        </Row>
                        <Col md={{ span: 6, offset: 3}}>
                         <Row className='courseHeaderDiv'>
                             <h2>Your Courses:</h2>
                             </Row>
                         <Row>
                             <ListGroup className="courseListGroup">
                                 {courseItemList}
                             </ListGroup>
                         </Row>
                        </Col>
                    </Container>
                )
            }
            /*
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
            */
           
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