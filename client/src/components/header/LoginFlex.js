import {Link} from 'react-router-dom';


const UserIcon= () =>
{
    return(
        <div className='user-icon'>
            <img src={process.env.PUBLIC_URL + '/nav-logos/user-icon.png'} 
            alt='Default User Head'/>
        </div>
    )
}

function LogOutButton(){
    
    return(
        <div className="logout-div">
            <Link to="/login" className="logout-button" id="login" role="button">
                Logout
            </Link>
        </div>
    );
}

function LoginFlex(props)
{
    const isLoggedIn=props.isLoggedIn;
    if(isLoggedIn)
    {
        return( 
            <div className='accountFlex'>
                <UserIcon />
                <LogOutButton />
            </div>    
        );
    }else
    {
        return( 
            <div className='accountFlex'>
                <p>Error Logging in please try again.</p>
            </div>    
        );
    }
}
    


export default LoginFlex;