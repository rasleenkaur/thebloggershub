import React,{useState,useContext} from "react";
import {Box, Button, TextField,Typography,styled} from '@mui/material'

import { API } from "../../service/api";
import { DataContext } from "../../context/DataProvider";
import {useNavigate} from 'react-router-dom';



const Component = styled(Box)`
    width: 400px;
    margin: auto;
    box-shadow: 5px 2px 5px 2px rgb(0 0 0/0.6);
`

const Image = styled('img')({
    width:100,
    margin: 'auto',
    display: 'flex',
    padding: '50px 0 0'
});

const Wrapper = styled(Box)`
    padding: 25px 35px;
    display: flex;
    flex: 1;
    flex-direction: column;
    & > div , & > button, & > p{
        margin-top: 20px;
    }
`

const LoginButton = styled(Button)`
    text-transform: none;
    background: #fb641b;
    color: #fff;
    height: 48px;
    border-radius: 2px;
`

const SignupButton = styled(Button)`
    text-transform: none;
    background: #fff;
    color: #2874f0;
    height: 48px;
    border-radius: 2px;
    box-shadow: 0 2px 4px 0 rgb(0 0 0/ 20%);
`

const Error = styled(Typography)`
    font-size: 10 px;
    color: #ff6161;
    line-height: 0;
    margin-top: 10px;
    font-weight: 600;
`

const Login = ({isUserAuthenticated})=>{
    const imageURL = 'https://www.sesta.it/wp-content/uploads/2021/03/logo-blog-sesta-trasparente.png';

    const signupIntialValues={
        name:'',
        username:'',
        password:''
    }

    const loginIntialValues={
        username:'',
        password:''
    }

    const [account,toggleAccount] = useState('login');

    const [signup,setSginup]= useState(signupIntialValues);

    const [login, setLogin]=useState(loginIntialValues);

    const [error,setError] = useState('');

    const {setAccount}= useContext(DataContext);

    const navigate = useNavigate();

    const onInputChange= (event) =>{
        const {name,value} = event.target;
        setSginup({...signup , [name]:value })
    }

    const signupUser = async() =>{
        let response = await API.userSignup(signup);
        if(response.isSuccess){
            setError('')
            setSginup(signupIntialValues);
            toggleAccount('login')
        }
        else{
            setError('Something went wrong! Please try again later')
        }
        
    }

    const onValueChange = (e) =>{
        const {name,value} = e.target;
        setLogin({...login, [name]:value})
    }

    const loginUser = async() =>{
        let response = await API.userLogin(login);
        if(response.isSuccess){
            setError('');
            sessionStorage.setItem('accessToken',`Bearer ${response.data.accessToken}`);
            sessionStorage.setItem('refreshToken',`Bearer ${response.data.refreshToken}`)
            setAccount({username: response.data.username, name:response.data.name});
            isUserAuthenticated(true)
            navigate('/')
        }
        else{
            setError('Something went wrong! Please try again later');
        }
    }

   return (
    <Component>
          <Box>
            <Image src={imageURL} alt='login'/>
            {
                account==='login' ?
                <Wrapper>       
                <TextField variant="standard" value={login.username}  label="Enter username" name="username" onChange={onValueChange} />
                <TextField variant="standard" value={login.password} label="Enter password" name="password" onChange={onValueChange}/>
                {error && <Error>{error}</Error>}
                <LoginButton variant="contained" onClick={loginUser}>Login</LoginButton>
                <Typography style={{textAlign: 'center', color:'#878787'}} >OR</Typography>
                <SignupButton onClick={()=>toggleAccount('signup')}>Create an account</SignupButton>
            </Wrapper> 
            :
            <Wrapper>       
                <TextField variant="standard" value={signup.name} label="Enter Name" name="name" onChange={onInputChange}/>
                <TextField variant="standard" value={signup.username}  label="Enter Username" name="username" onChange={onInputChange}/>
                <TextField variant="standard" value={signup.password}  label="Enter Password" name="password" onChange={onInputChange}/>
                {error && <Error>{error}</Error>}
                <SignupButton onClick={signupUser} >Signup</SignupButton>
                <Typography style={{textAlign: 'center', color:'#878787'}} >OR</Typography>
                <LoginButton variant="contained" onClick={()=> toggleAccount("login")} >Already have an account</LoginButton>
            </Wrapper>

            }
            
           
        </Box>
    </Component>

   )
}


export default Login;