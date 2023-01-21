import './SignInPage.css'
import CircularProgress from '@mui/material/CircularProgress';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import { FormControl, Button } from '@mui/material';
import { useNavigate } from "react-router-dom";
// import { toggleLogin } from '../store/loginSlice';
import { useDispatch } from 'react-redux';
import SimpleAlert from '../../reusable/simple_alert/SimpleAlert';
import UserRequests from '../../reusable/UserRequests';
import { toggleLogin } from '../../../store/loginSlice';

const SignInPage = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch()

    //Alert control
    const [open, setOpen] = useState(false);
    const [alertInfo, setAlertInfo] = useState({
        title: "",
        content: ""
    })

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    // Visiability of loading screen control
    const blockerDisplayOption = {
        visable: {
            display: "flex"
        },
        hidden:  {
            display: "none"
        }
    }
    const [isBlockerOut, setIsBLockerOut] = useState(blockerDisplayOption.hidden)

    // textfields styles 
    const styleForTextFields = { 
        width: "20vw",
        '& .MuiFormLabel-root': {
            color: '#00C9C7'
        },
        '& .MuiInputBase-input': {
            color: 'white',
        },
        '&:hover .MuiFormLabel-root': {
            color: 'white',
            },
            '& .MuiOutlinedInput-root': {
                '& fieldset': {
                    borderColor: '#00C9C7',
                    borderWidth: '2px',
                },
                '&:hover fieldset': {
                    borderColor: 'white',
                    borderWidth: '2px',
                },
                '&.Mui-focused fieldset': {
                    borderColor: 'white',
                    borderWidth: '2px',
                },
              },
        '& label.Mui-focused': {
            color: 'white',
            },
        }

    // text field control
    const [formValues, setFormValues] = useState({
        login: "",
        password: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
        ...formValues,
        [name]: value,
        });
    };

    // Handle Registration
    const SignInSettled = (response) => {
        console.log("Logowanie powidło się")
        if( response.data.password === formValues.password ){
            dispatch(toggleLogin (formValues.login))
            navigate("/app/chat");
        } else SignInRejected()
    }

    const SignInRejected = () => {
        console.log("Logowanie nie powidło się")
        setAlertInfo({
            title: "Logowanie nie powiodło się",
            content: ""
        })
        handleClickOpen();
    }

    const LogIn = async () => {
        setIsBLockerOut(blockerDisplayOption.visable)

        await UserRequests.RequestUserCredintionals(
            formValues.login,
            SignInSettled,
            SignInRejected,
        )

        setIsBLockerOut(blockerDisplayOption.hidden)
    }


    return (
        <div>
            <div className='sign_in_formBox'>
                <FormControl>
                    <TextField
                        required
                        id="login"
                        name="login"
                        label="Login"
                        sx={styleForTextFields} 
                        margin="normal"
                        value={formValues.login}
                        onChange={handleInputChange}
                        />
                    <TextField
                        type="password"
                        required
                        id="password"
                        name="password"
                        label="Password"
                        sx={styleForTextFields}
                        margin="normal"
                        value={formValues.password}
                        onChange={handleInputChange}
                        />

                    <div className='formControlButtons'>
                        <Button 
                            variant="contained" 
                            color="primary" 
                            type="submit" 
                            sx={{backgroundColor: "#00C9C7", color: "black"}} 
                            onClick={() => LogIn()}>
                            Log In
                        </Button>
                    </div>
                </FormControl>
            <div className='loadingBlocker' style={isBlockerOut}>
                <CircularProgress />
            </div>
        </div>
            <SimpleAlert
                open={open}
                onClose={handleClose}
                info={alertInfo}
            />
    </div>
    );
}

export default SignInPage;