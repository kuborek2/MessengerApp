import './RegisterPage.css'
import CircularProgress from '@mui/material/CircularProgress';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import { FormControl, Button } from '@mui/material';
import { useNavigate } from "react-router-dom";
import SimpleAlert from '../../reusable/simple_alert/SimpleAlert';

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
        confirmPassword: ""
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
    const [formStyleValues, setFormStyleValues] = useState({
        login: {},
        email: {},
        confirmEmail: {},
        password: {},
        confirmPassword: {}
    });

    const handleStyleValues = (name, value) => {
            setFormStyleValues({
            ...formStyleValues,
            [name]:  {fieldset: {borderColor: value}},
            });
        };

    const ValidateForm = () => {
        let invalidInputColor = "red"
        let defaultColor = "internal-light-dark(rgb(118, 118, 118), rgb(133, 133, 133));"
        let returnValue = true;
        //login
        if( formValues.login === "" ){ 
            handleStyleValues("login", invalidInputColor)
            returnValue = false;
        } else handleStyleValues("login", defaultColor)

        //email
        if( formValues.email === "" || !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formValues.email) ){ 
            handleStyleValues("email", invalidInputColor)
            returnValue = false;
        } else handleStyleValues("email", defaultColor)

        //confirm email
        if( formValues.confirmEmail === "" || formValues.email !== formValues.confirmEmail ){ 
            handleStyleValues("confirmEmail", invalidInputColor)
            returnValue = false;
        } else handleStyleValues("confirmEmail", defaultColor)

        //password
        if( formValues.password === "" ){ 
            handleStyleValues("password", invalidInputColor)
            returnValue = false;
        } else handleStyleValues("password", defaultColor)

        //confirm password
        if( formValues.confirmPassword === "" || formValues.password !== formValues.confirmPassword ){ 
            handleStyleValues("confirmPassword", invalidInputColor)
            returnValue = false;
        } else handleStyleValues("confirmPassword", defaultColor)

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
        console.log("Rejestracja powiodła się")
        setAlertInfo({
            title: "Rejestracja powidła się",
            content: "Można powrócić do strony głównej i się z tamtąd zalogować"
        })
        handleClickOpen();
        // navigate("/home");
    }

    const registrationRejected = () => {
        console.log("Rejestracja nie powiodła się")
        setAlertInfo({
            title: "Rejestracja nie powidła się",
            content: "Kontent"
        })
        handleClickOpen();
    }

    const registerUser = async () => {
        // setIsBLockerOut(blockerDisplayOption.visable)

        // if( ValidateForm() === true){
        //     await UserUtlis.requestUserRegistration(
        //         {
        //             login: formValues.login,
        //             email: formValues.email,
        //             password: formValues.password
        //         },
        //         registrationSettled,
        //         registrationRejected,
        //     )
        // }

        // setIsBLockerOut(blockerDisplayOption.hidden)
    }

    const clearForm = () => {
        setFormValues({
            login: "",
            email: "",
            confirmEmail: "",
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
                        required
                        id="confirmPassword"
                        name="confirmPassword"
                        label="Confirm Password"
                        sx={styleForTextFields}
                        margin="normal"
                        value={formValues.confirmPassword}
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