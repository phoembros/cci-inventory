import { Autocomplete, Button, FormControl, FormControlLabel, FormGroup, Grid, MenuItem, Paper, Select, Stack, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import * as React from "react";
import RawMaterialRole from "./RawMaterialRole";
import './role.scss';
import StorageRoomRole from "./StorageRoomRole";
import { Link } from 'react-router-dom';

import ProductRole from "./ProductRole";
import ProdcutionRole from "./ProductionRole";
import CustomerRole from "./CustomerRole";
import ReportRole from "./ReportRole";
import SalesRole from "./SalesRole";
import SupplierRole from "./SupplierRole";
import UserRole from "./UserRole";
import ProductionRole from "./ProductionRole";
import RolePermission from "./RolePermission";

import AddIcon from '@mui/icons-material/Add';
import CreateRole from "./CreateRole";

import { GET_ROLE_BYID, GET_ROLE_PERMISSION } from "../../Schema/role";
import { useLazyQuery, useQuery } from "@apollo/client";
import DashboardRole from "./DashboardRole";
 
export default function Role () {

    const [menuRole,setMenuRole] = React.useState("");

    const [activateButton,setActivateButton] = React.useState(false)
    // 
    const [openCreateRole, setOpenCreateRole] = React.useState(false);
    const handleOpenCreateRole = () => setOpenCreateRole(true);
    const handleCloseCreateRole = () => setOpenCreateRole(false);


    // get Data
    const [roleDataAuto,setRoleDataAuto] = React.useState([])
    const { data: RoleData} = useQuery(GET_ROLE_PERMISSION)
        
    React.useEffect( () => {
        // console.log(RoleData?.getRoleAndPermission);
        if(RoleData?.getRoleAndPermission) {
            let row = [];
            RoleData?.getRoleAndPermission?.forEach((element) => {
                const allRow = {
                    _id : element?._id,
                    label: element?.role,
                }
                row.push(allRow);
            });
            setRoleDataAuto(row)
        }
    },[RoleData?.getRoleAndPermission])

       
    // get Data By ID
    const [dataRolePermission,setDataRolePermission] = React.useState()
    const [roleDataByID, { data , refetch}] = useLazyQuery(GET_ROLE_BYID);
  
    React.useEffect( () => {      
        if(data?.getRoleAndPermissionById) {
            setDataRolePermission(data?.getRoleAndPermissionById)
        }        
    },[data?.getRoleAndPermissionById])

    return(
        <div className="system-page-role">
            <Stack direction="row" spacing={2}>
                <Box className="slash" />
                <Stack direction="column" justifyContent="center">
                    <Link to="/system-setting" style={{ textDecoration: "none"}}>
                        <Typography className="color">System Setting</Typography>
                    </Link>
                </Stack>
                <Stack direction="column" justifyContent="center">
                    <Typography className="color">/ Role</Typography>
                </Stack>
                <Box sx={{flexGrow: 1}} />  
                <Stack direction="row" className="stack-btn"  justifyContent="right" spacing={1}>                       
                    <Button onClick={handleOpenCreateRole} startIcon={<AddIcon/>} className="btn-add">
                        <Typography className="btn-text">ADD</Typography>
                    </Button>                    
                    <CreateRole  
                        open={openCreateRole}
                        handleClose={handleCloseCreateRole} 
                        btnTitle={"Create"}
                        // setAlert={setAlert}
                        // setMessage={setMessage}
                        // setCheckMessage={setCheckMessage}
                        // setRefetch={refetch}
                    />                     
                </Stack>
            </Stack>

            <Box sx={{mt:3 , mb:3}}>
                <Stack direction="row" spacing={2}>                   
                    <Stack direction="row" spacing={1} width="375px">
                        <Stack direction="column" justifyContent="center" sx={{width:"200px"}}>
                            <Typography className="title-filter" variant="body1">Choose Role :</Typography>
                        </Stack>                    
                        <Autocomplete                      
                            disablePortal
                            sx={{ width: 300 }}
                            options={roleDataAuto}   
                            getOptionLabel={ (option) => option?.label ? option?.label : "" }                                             
                            onChange={(event, value) => {    
                                setMenuRole("")   
                                setActivateButton(true)                                                 
                                roleDataByID({
                                    variables: {
                                        id: value?._id,
                                    }
                                })
                            }}
                            renderInput={(params) => 
                                <TextField 
                                    {...params} placeholder='choose name' size="small"                                     
                                /> 
                            }
                        /> 
                    </Stack>
                </Stack>
            </Box>
            
            <Grid container spacing={5} >
                    <Grid item xs={3}>
                        <Stack direction="column" justifyContent="center" spacing={2} sx={{mt:1}}>

                            <Button fullWidth                                 
                                onClick={ () => activateButton ? setMenuRole("dashboard") : setMenuRole("") }
                                className={ menuRole === "dashboard" ? "btn-permission-active" : "btn-permission"}                                
                            >
                                Dashboard
                            </Button>

                            <Button fullWidth                                 
                                onClick={ () => activateButton ? setMenuRole("storageRoom") : setMenuRole("") }
                                className={ menuRole === "storageRoom" ? "btn-permission-active" : "btn-permission"}                                
                            >
                                Storage Room
                            </Button>

                            <Button fullWidth 
                                onClick={ () => activateButton ? setMenuRole("rawMaterils") : setMenuRole("") }
                                className={ menuRole === "rawMaterils" ? "btn-permission-active" : "btn-permission"}  
                            >
                                Raw Materials
                            </Button>

                            <Button fullWidth 
                                onClick={ () => activateButton ? setMenuRole("product") : setMenuRole("") }
                                className={ menuRole === "product" ? "btn-permission-active" : "btn-permission"}
                            >   
                                Product
                            </Button>

                            <Button fullWidth 
                                onClick={ () => activateButton ?  setMenuRole("production") : setMenuRole("")}
                                className={ menuRole === "production" ? "btn-permission-active" : "btn-permission"}
                            >   
                                Production
                            </Button>

                            <Button fullWidth 
                                onClick={ () => activateButton ?  setMenuRole("sales") : setMenuRole("")}
                                className={ menuRole === "sales" ? "btn-permission-active" : "btn-permission"}
                            >
                                Sales
                            </Button>

                            <Button fullWidth 
                                onClick={ () => activateButton ?  setMenuRole("customer") : setMenuRole("")}
                                className={ menuRole === "customer" ? "btn-permission-active" : "btn-permission"}
                            >
                                Customer
                            </Button>
                            <Button fullWidth 
                                onClick={ () => activateButton ?  setMenuRole("supplier") : setMenuRole("")}
                                className={ menuRole === "supplier" ? "btn-permission-active" : "btn-permission"}
                            >
                                Supplier
                            </Button>
                            <Button fullWidth 
                                onClick={ () => activateButton ?  setMenuRole("user") : setMenuRole("")}
                                className={ menuRole === "user" ? "btn-permission-active" : "btn-permission"}
                            >
                                User
                            </Button>
                            <Button fullWidth 
                                onClick={ () => activateButton ?  setMenuRole("report") : setMenuRole("") }
                                className={ menuRole === "report" ? "btn-permission-active" : "btn-permission"}
                            >
                                Report
                            </Button>

                            {/* <Button fullWidth 
                                onClick={ () => activateButton ?  setMenuRole("role-permission") : setMenuRole("") }
                                className={ menuRole === "role-permission" ? "btn-permission-active" : "btn-permission"}
                            >
                                Role & Permission
                            </Button> */}


                        </Stack>
                    </Grid>
                    <Grid item xs={9}>
                            <TableContainer className="table-container">
                                <Table className="table" aria-label="simple table">
                                    <TableHead>
                                        <TableRow className="head-row">
                                            <TableCell width="50%" align="center" className="header-title">ACTION</TableCell>
                                            <TableCell width="50%" align="center" className="header-title">PERMISSION</TableCell>                                            
                                        </TableRow>
                                    </TableHead>

                                    { menuRole === "dashboard" ? <DashboardRole setRefetch={refetch}  dataRole={dataRolePermission}  /> : null  }
                                    { menuRole === "storageRoom" ? <StorageRoomRole setRefetch={refetch}  dataRole={dataRolePermission}  /> : null  }
                                    { menuRole === "rawMaterils" ? <RawMaterialRole setRefetch={refetch}    dataRole={dataRolePermission} /> : null  }
                                    { menuRole === "product" ? <ProductRole setRefetch={refetch}  dataRole={dataRolePermission} /> : null  }
                                    { menuRole === "production" ? <ProductionRole setRefetch={refetch}   dataRole={dataRolePermission} /> : null  }
                                    { menuRole === "sales" ? <SalesRole setRefetch={refetch}   dataRole={dataRolePermission} /> : null  }
                                    { menuRole === "customer" ? <CustomerRole  setRefetch={refetch}  dataRole={dataRolePermission} /> : null  }
                                    { menuRole === "supplier" ? <SupplierRole setRefetch={refetch}  dataRole={dataRolePermission} /> : null  }
                                    { menuRole === "user" ? <UserRole setRefetch={refetch}  dataRole={dataRolePermission} /> : null  }
                                    { menuRole === "report" ? <ReportRole setRefetch={refetch}  dataRole={dataRolePermission} /> : null  }
                                    { menuRole === "role-permission" ? <RolePermission setRefetch={refetch}  dataRole={dataRolePermission} /> : null  }


                                </Table>
                            </TableContainer>
                    </Grid>
            </Grid>

        </div>
    );
}