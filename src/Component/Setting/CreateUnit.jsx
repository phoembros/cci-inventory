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
import { CREATE_UNIT , UPDATE_UNIT } from "../../Schema/unit";


export default function CreateUnit({ open , handleClose , btnTitle , setRefetch , DataUnit ,setAlert ,  setMessage, setCheckMessage}) {

    const [loading,setLoading] = React.useState(false);

    const [ createUnit ] = useMutation(CREATE_UNIT , {
        onCompleted: ({createUnit}) => {
            console.log(createUnit)
            if(createUnit?.success) {                
                setCheckMessage("success")
                setMessage(createUnit?.message)
                setAlert(true);
                handleClose();
                setRefetch();
                resetForm()
                setLoading(false)
            } else {
                setCheckMessage("error")
                setMessage(createUnit?.message)
                setAlert(true);
                setLoading(false)
            }
        },
        onError: (error) => {
            console.log(error.message)
            setCheckMessage("error")
            setMessage(error?.message)
            setAlert(true);
            setLoading(false)
        }
    }) 


    const [ updateUnit ] = useMutation(UPDATE_UNIT , {
        onCompleted: ({updateUnit}) => {
            console.log(updateUnit)
            if(updateUnit?.success){                
                setCheckMessage("success")
                setMessage(updateUnit?.message)
                setAlert(true);
                handleClose();
                setRefetch();
                resetForm()
                setLoading(false)
            } else {
                setCheckMessage("error")
                setMessage(updateUnit?.message)
                setAlert(true);
                setLoading(false)
            }
        },
        onError: (error) => {
            console.log(error.message)
            setCheckMessage("error")
            setMessage(error?.message)
            setAlert(true);
            setLoading(false)
        }
    }) 



    // Formik
    const createUnits = Yup.object().shape({
        unitName: Yup.string().required("Name is required!"),
        remark: Yup.string(),
    });

    const formik = useFormik({
        initialValues: {
            unitName: "",
            remark: ""
        },

        validationSchema: createUnits,
        onSubmit: async (values, { setSubmitting, resetForm }) => {
            
            setLoading(true)
            // console.log(values)
            if(btnTitle === "Create") {
                createUnit({
                    variables: {
                        newUnit: {
                            ...values
                        }                    
                    }
                })
            } else {
                updateUnit({
                    variables: {
                        unitId: DataUnit?._id,
                        newUnit: {
                            ...values
                        }                    
                    }
                })
            }
            

        },
    });
    const { errors, touched, values, isSubmitting, checkProp, handleSubmit, getFieldProps, setFieldValue, resetForm,} = formik;
    // End Formik

    React.useEffect( () => {
        if(DataUnit) {
            setFieldValue("unitName" , DataUnit?.unitName)
            setFieldValue("remark", DataUnit?.remark)
        }
    },[DataUnit])

    return(
        <>
            <Dialog open={open} className="dialog-create-role">
                <DialogTitle id="alert-dialog-title">
                    <Stack direction="row" spacing={2}>
                        <Stack direction="column" justifyContent="center" spacing={2}>
                            <Typography className='header-title' variant="h6" >
                                {btnTitle} Unit
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
                                            Name: 
                                        </Typography>
                                        <TextField
                                            size="small"
                                            fullWidth
                                            placeholder="Name"    
                                            {...getFieldProps("unitName")}
                                            error={Boolean(touched.unitName && errors.unitName)}
                                            helperText={touched.unitName && errors.unitName}
                                        />                          
                                    </Stack>

                                    <Stack sx={{mt:2}}>
                                        <Typography className='header-title' variant="body1" >
                                            Remark: 
                                        </Typography>
                                        <TextField
                                            multiline
                                            size="small"
                                            fullWidth
                                            placeholder="Remark"    
                                            {...getFieldProps("remark")}
                                            error={Boolean(touched.remark && errors.remark)}
                                            helperText={touched.remark && errors.remark}
                                        />                          
                                    </Stack>


                                    <Stack direction="column" spacing={1} sx={{ mt: 4 }}>

                                        {
                                            loading ?
                                                <Button sx={{boxShadow: "none", textTransform: "none"}} className="btn-submit">
                                                    Loading...
                                                </Button>
                                            :
                                                <Button sx={{boxShadow: "none"}} type="submit" className="btn-submit">
                                                    {btnTitle}
                                                </Button>
                                        }
                                       
                                    </Stack>

                            </Form>
                        </FormikProvider>

                    </DialogContentText>
                </DialogContent>       
            </Dialog>  

        </>
    )
}