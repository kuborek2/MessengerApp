import './RegisterPage.css'
import CircularProgress from '@mui/material/CircularProgress';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import { FormControl, Button } from '@mui/material';
import { useNavigate } from "react-router-dom";
import SimpleAlert from '../../reusable/simple_alert/SimpleAlert';
import UserRequests from '../../reusable/UserRequests';

const RegisterPage = () => {

    const navigate = useNavigate();

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

    // Values of the from control
    const [formValues, setFormValues] = useState({
        login: "",
        password: "",
        confirmPassword: "",
        imageSrc: "",
    });

    const handleInputChange = (e) => {
            const { name, value } = e.target;
            setFormValues({
            ...formValues,
            [name]: value,
            });
        };

    // Textinputs stlye control
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

    const ValidateForm = () => {
        let invalidInputColor = "red"
        let defaultColor = "internal-light-dark(rgb(118, 118, 118), rgb(133, 133, 133));"
        let returnValue = true;
        //login
        if( formValues.login === "" ){ 
            returnValue = false;
        }

        //password
        if( formValues.password === "" ){ 
            returnValue = false;
        }

        //confirm password
        if( formValues.confirmPassword === "" || formValues.password !== formValues.confirmPassword ){ 
            returnValue = false;
        }

        return returnValue
    }

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

    //Registration
    const registrationSettled = () => {
        setAlertInfo({
            title: "Rejestracja powidła się",
            content: "Można powrócić do strony głównej i się z tamtąd zalogować"
        })
        handleClickOpen();
        // navigate("/home");
    }

    const registrationRejected = (response) => {
        if(response.response.status === 500)
            setAlertInfo({
                title: "Rejestracja nie powidła się",
                content: "Kod błędu 500: Problem z serwerem"
            })
        else if(response.response.status === 409)
            setAlertInfo({
                title: "Rejestracja nie powidła się",
                content: "Kod błędu 409: Login już zajęty"
            })
        else setAlertInfo({
                title: "Rejestracja nie powidła się",
                content: "Kod błędu "+response.code+" : Nieznany błąd"
            })

        handleClickOpen();
    }

    const registerUser = async () => {
        setIsBLockerOut(blockerDisplayOption.visable)

        if( ValidateForm() === true){
            await UserRequests.RequestUserRegistration(
                {
                    userName: formValues.login,
                    password: String(formValues.password),
                    imageSrc: formValues.imageSrc,
                },
                registrationSettled,
                registrationRejected,
            )
        }

        setIsBLockerOut(blockerDisplayOption.hidden)
    }

    const clearForm = () => {
        setFormValues({
            login: "",
            password: "",
            confirmPassword: ""
        });
    }

    return (
        <div>
            <div className='register_formBox'>
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
                    
                    <TextField
                        type="password"
                        required
                        id="confirmPassword"
                        name="confirmPassword"
                        label="Confirm Password"
                        sx={styleForTextFields}
                        margin="normal"
                        value={formValues.confirmPassword}
                        onChange={handleInputChange}
                        />

                    <TextField
                        required
                        id="imageSrc"
                        name="imageSrc"
                        label="Profile Picture link"
                        sx={styleForTextFields}
                        margin="normal"
                        value={formValues.imageSrc}
                        onChange={handleInputChange}
                        />

                    <div className='formControlButtons'>
                        <Button 
                            variant="contained" 
                            color="primary" 
                            type="submit" 
                            sx={{backgroundColor: "#00C9C7", color: "black"}} 
                            onClick={() => registerUser()}>
                            Submit
                        </Button>
                        <Button 
                            variant="contained" 
                            color="primary" 
                            type="reset" 
                            sx={{backgroundColor: "#00C9C7", color: "black"}}
                            onClick={() => clearForm()}>
                            Reset
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

export default RegisterPage;