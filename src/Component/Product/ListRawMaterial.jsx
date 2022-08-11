import React from 'react';
// import FlipMove from 'react-flip-move';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { Autocomplete, Box, IconButton, InputAdornment, Paper, Stack, TableBody, TableCell, TableRow, TextField } from '@mui/material';
import './listrawmaterial.scss';
import { withStyles } from '@material-ui/core/styles';
import {GET_RAW_MATERAIL_PAGINATION} from "../../Schema/rawmaterial";
import {useQuery} from "@apollo/client"


function ListRawMaterial(props) {

    // get Raw Material
    const [rawMaterial,setRawMaterial] = React.useState([])
    const { data, refetch } = useQuery(GET_RAW_MATERAIL_PAGINATION, {
      variables: {       
        keyword: "",
        pagination: false,
      },
      pollInterval: 500,    
    });
    // console.log(data?.getRawMaterialPagination?.rawMaterial,"data")

    React.useEffect( () => {
        if (data?.getRawMaterialPagination?.rawMaterial) {
            let rows = [];
            data?.getRawMaterialPagination?.rawMaterial?.forEach((element) => {
                const allrow = {
                  label: element?.materialName,
                  _id: element?._id,
                  unit: element?.unit,
                };
                rows.push(allrow);
            });
            setRawMaterial(rows);
        }
    },[data?.getRawMaterialPagination?.rawMaterial])
    // End Get Raw Materila

    
    // Handle Message Error TextField
    const [errorMessage, setErrorMessage] = React.useState(["Can't input 0" , "Invalid Value" , "Material is required!" , "Over Percentage!"]);
    const [touched, setTouched] = React.useState(false);
    const handleTouch = () =>  setTouched(true);


    const items = props.items;
    const listItems = items.map(item => {
        return  <TableBody key={item?.key}  component={Paper} className="body-list-material" >                        
                    <TableRow  className="body-row">                                
                        <TableCell className="body-title" component="th" scope="row" >                           
                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                options={rawMaterial}                                
                                onChange={(e, value) => {
                                    props.setUpdateText( value?._id , item.key ) 
                                    props.setUpdateRawName( value?.label , item.key )
                                    props.setUpdateUnitRawMaterial(value?.unit , item.key)
                                }}
                                renderInput={(params) => 
                                    <TextField 
                                        {...params} size="small" className='text-field' 
                                        placeholder='Raw Material'
                                        onFocus={handleTouch}
                                        error={ touched && item?.rawName === undefined }
                                        helperText={ item?.rawName === undefined && errorMessage[2] }   
                                    />
                                }
                            />
                        </TableCell>   
                         
                        <TableCell className="body-title" width="30%" align='center'>
                            <TextField  
                                className='text-field'
                                fullWidth
                                type="number" 
                                id={item?.key} 
                                size='small' 
                                value={item?.percentage} 
                                onChange={ (e) => {
                                    props.setUpdateQty(e.target.value/100, item.key)
                                    props.setUpdatePercent(e.target.value, item.key)                                    
                                }}
                                InputProps={{                                  
                                    endAdornment: (
                                        <InputAdornment position="end">                                             
                                            %                                       
                                        </InputAdornment>
                                    ),
                                    inputProps: { min: 1 },
                                }}
                                onFocus={handleTouch}
                                error={ 
                                    touched && item?.amount < 0 || 
                                    touched && isNaN(item?.amount) ||
                                    touched && props.checkPercent
                                }
                                helperText={ 
                                    item?.amount < 0 && errorMessage[0] || 
                                    isNaN(item?.amount) && errorMessage[1] ||
                                    props.checkPercent && errorMessage[3]
                                }     
                            />
                        </TableCell>  
                         
                        <TableCell className="body-title" align='right' width="10%" >
                            <IconButton onClick={() => { props.deleteItem(item.key) }}>
                                <DeleteRoundedIcon  sx={{color:"red"}}/>
                            </IconButton>    
                        </TableCell>                                                   
                    </TableRow>
            </TableBody>
    })
    // return <FlipMove duration={300} easing="ease-in-out"> 
    //     {listItems} 
    // </FlipMove>;
    return  listItems;
   
}

export default ListRawMaterial;