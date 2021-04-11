
const UserIcon= () =>
{
    return(
        <div className='user-icon'>
            <img src={process.env.PUBLIC_URL + '/nav-logos/user-icon.png'} 
            alt='Default User Head'/>
        </div>
    )
}

function LoginButton(){
    function handleClick(e)
    {
        e.preventDefault();
        alert("Login will be handled here")
    }
    return(
        <div className="login-div">
            <a href="/" onClick={handleClick} className='login-link'>login</a>
        </div>
    );
}


function LogOutButton(){
    function handleClick(e)
    {
        e.preventDefault();
        alert("Logout will be handled here")
    }
    return(
        <div className="logout-div">
            <a href="/" onClick={handleClick} className='logout-link'>login</a>
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
    }
    else
    {
        return( 
            <div className='accountFlex'>
                <UserIcon />
                <LoginButton />
            </div> 
        );
    }
}
    


export default LoginFlex;