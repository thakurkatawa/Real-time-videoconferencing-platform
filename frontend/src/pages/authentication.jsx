import * as React from "react";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Snackbar } from "@mui/material";

import { AuthContext } from "../contexts/AuthContext";


const defaultTheme = createTheme();


export default function Authentication() {


    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [name, setName] = React.useState("");

    const [error, setError] = React.useState("");
    const [message, setMessage] = React.useState("");

    const [formState, setFormState] = React.useState(0);

    const [open, setOpen] = React.useState(false);



    const { handleRegister, handleLogin } = React.useContext(AuthContext);



    const handleAuth = async () => {

        try {

            if(formState === 0){

                let result = await handleLogin(
                    username,
                    password
                );

                console.log(result);

            }


            if(formState === 1){

                let result = await handleRegister(
                    name,
                    username,
                    password
                );


                console.log(result);


                setUsername("");
                setPassword("");
                setName("");

                setMessage(result);

                setOpen(true);

                setError("");

                setFormState(0);

            }


        } catch(err){

            console.log(err);

            if(err.response){
                setError(err.response.data.message);
            }
            else{
                setError("Something went wrong");
            }

        }

    };





    return (

        <ThemeProvider theme={defaultTheme}>


            <Grid
                container
                sx={{
                    height:"100vh"
                }}
            >


                <CssBaseline />



                {/* LEFT IMAGE */}

                <Grid

                    size={{xs:0, md:7}}

                    sx={{

                        display:{
                            xs:"none",
                            md:"block"
                        },


                        backgroundImage:
                        "url(https://images.unsplash.com/photo-1497366754035-f200968a6e72)",


                        backgroundSize:"cover",


                        backgroundPosition:"center",

                    }}

                />




                {/* RIGHT LOGIN */}


                <Grid

                    size={{xs:12, md:5}}

                    component={Paper}

                    elevation={6}

                    square

                >


                    <Box

                        sx={{

                            my:8,

                            mx:4,

                            display:"flex",

                            flexDirection:"column",

                            alignItems:"center"

                        }}

                    >



                        <Avatar

                            sx={{
                                m:1,
                                bgcolor:"secondary.main"
                            }}

                        >

                            <LockOutlinedIcon/>

                        </Avatar>




                        <Box>


                            <Button

                                variant={
                                    formState===0
                                    ?
                                    "contained"
                                    :
                                    "text"
                                }

                                onClick={()=>{
                                    setFormState(0)
                                }}

                            >

                                Sign In

                            </Button>



                            <Button

                                variant={
                                    formState===1
                                    ?
                                    "contained"
                                    :
                                    "text"
                                }


                                onClick={()=>{
                                    setFormState(1)
                                }}

                            >

                                Sign Up

                            </Button>



                        </Box>





                        <Box

                            component="form"

                            sx={{
                                mt:2,
                                width:"100%"
                            }}

                        >



                        {
                            formState===1 &&

                            <TextField

                                margin="normal"

                                required

                                fullWidth

                                label="Full Name"

                                value={name}

                                onChange={(e)=>
                                    setName(e.target.value)
                                }

                            />

                        }




                        <TextField

                            margin="normal"

                            required

                            fullWidth

                            label="Username"

                            value={username}

                            onChange={(e)=>
                                setUsername(e.target.value)
                            }

                        />





                        <TextField

                            margin="normal"

                            required

                            fullWidth

                            label="Password"

                            type="password"

                            value={password}

                            onChange={(e)=>
                                setPassword(e.target.value)
                            }

                        />




                        <p style={{color:"red"}}>

                            {error}

                        </p>




                        <Button

                            fullWidth

                            variant="contained"

                            sx={{
                                mt:3,
                                mb:2
                            }}

                            onClick={handleAuth}

                        >

                            {
                                formState===0
                                ?
                                "Login"
                                :
                                "Register"
                            }

                        </Button>



                        </Box>



                    </Box>


                </Grid>



            </Grid>



            <Snackbar

                open={open}

                autoHideDuration={4000}

                message={message}

                onClose={()=>{
                    setOpen(false)
                }}

            />


        </ThemeProvider>

    );

}