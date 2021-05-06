import React, {useState} from 'react'
import axios, {post} from 'axios';
import "./upload.css";


function Upload() {
    let originalState={
        teacher: "608ef07186535261a224be22", // please change this as per the  teacher
        course: "6092bf805473bc49139fb48f", // please change this as per the  student course
        student: "608ef2c1dcfca3631f8c290e", // please change this as per the  course
        image:{
            name:"No File Selected"
        }


    }
    const [state, setState] = useState(originalState);

    let handleUpload = (e) => {
    
        setState({...state,image: e.target.files[0]})
    }

    let fileUpload = () => {

        const formData = new FormData();
        console.log(state)
        formData.append('document', state.image);
        formData.append('teacher', state.teacher);
        formData.append('course', state.course);
        formData.append('student', state.student);
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
                // 'authorization':localStorage.getItem("token")
            }
        }

        post("http://localhost:8080/student/upload", formData, config).then(data => {
            console.log(data["data"]);
            setState({...originalState});


        })

    }

    return (
        <>
            <div className='file-input'>
                <input type='file'
                    onChange={handleUpload}  />
                <span className='button'>Choose</span>
                <span className='label' data-js-label> {state.image.name}</span>
            </div>

            <div class="button_slide slide_down outer"
                onClick={fileUpload}>
                UPLOAD FILE</div>


        </>


    )
}

export default Upload
