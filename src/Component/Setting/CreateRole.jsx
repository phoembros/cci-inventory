import * as React from "react";
import { Box, Button, IconButton, Stack, TextField, Typography } from '@mui/material';
import DoDisturbOnOutlinedIcon from '@mui/icons-material/DoDisturbOnOutlined';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import "./createrole.scss";

import * as Yup from "yup";
import { useFormik, Form, FormikProvider } from "formik";
import { useMutation } from "@apollo/client";
import { CREATE_ROLE } from "../../Schema/role";


export default function CreateRoleUser({ open , handleClose , btnTitle , setRefetch}) {

    const [ createRole ] = useMutation(CREATE_ROLE , {
        onCompleted: ({createRole}) => {
            console.log(createRole)
            if(createRole?.success){
                handleClose();
                setRefetch();
            } else {
                console.log(createRole?.message)
            }
        },
        onError: (error) => {
            console.log(error.message)
        }
    }) 


    // Formik
    const CreateRoles = Yup.object().shape({
        Role: Yup.string().required("Role is required!"),

    });

    const formik = useFormik({
        initialValues: {
            Role: "",
        },

        validationSchema: CreateRoles,
        onSubmit: async (values, { setSubmitting, resetForm }) => {

            // console.log(values)
            
            createRole({
                variables: {
                    newRole: {
                        role: values?.Role,
                    }                    
                }
            })

        },
    });
    const { errors, touched, values, isSubmitting, checkProp, handleSubmit, getFieldProps, setFieldValue, resetForm,} = formik;
    // End Formik


    return(
        <>
            <Dialog open={open} className="dialog-create-role">
                <DialogTitle id="alert-dialog-title">
                    <Stack direction="row" spacing={2}>
                        <Stack direction="column" justifyContent="center" spacing={2}>
                            <Typography className='header-title' variant="h6" >
                                Create Role
                            </Typography>
                        </Stack>                
                        <Box sx={{flexGrow:1}}></Box>
                        <IconButton onClick={handleClose} >
                            <DoDisturbOnOutlinedIcon sx={{color:'red'}} />
                        </IconButton>
                    </Stack>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">  

                        <FormikProvider value={formik}>
                            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>         
                                    <Stack>
                                        <Typography className='header-title' variant="body1" >
                                        Role: 
                                        </Typography>
                                        <TextField
                                            size="small"
                                            fullWidth
                                            placeholder="role"    
                                            {...getFieldProps("Role")}
                                            error={Boolean(touched.Role && errors.Role)}
                                            helperText={touched.Role && errors.Role}
                                        />                          
                                    </Stack>

                                    <Stack direction="column" spacing={1} sx={{ mt: 4 }}>
                                        <Button sx={{boxShadow: "none"}} type="submit" className="btn-submit">
                                            {btnTitle}
                                        </Button>
                                    </Stack>
                            </Form>
                        </FormikProvider>

                    </DialogContentText>
                </DialogContent>       
            </Dialog>  

        </>
    )
}