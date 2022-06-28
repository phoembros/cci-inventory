import * as React from 'react';
// import FlipMove from 'react-flip-move';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { Autocomplete, Box, IconButton, InputAdornment, Paper, Stack, TableBody, TableCell, TableRow, TextField } from '@mui/material';
import './listrawmaterial.scss';
import { withStyles } from '@material-ui/core/styles';
import {GET_RAW_MATERAIL_PAGINATION} from "../../Schema/rawmaterial";
import {useQuery} from "@apollo/client"


export default function ListRawMaterial(props) {

    // get Raw Material
    const [rawMaterial,setRawMaterial] = React.useState([])

    const { data, refetch } = useQuery(GET_RAW_MATERAIL_PAGINATION, {
        variables: {       
            keyword: "",
            pagination: false,
        },
    });
    
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
    const [errorMessage, setErrorMessage] = React.useState(["Can't input 0" , "Invalid Value" , "Material is required!"]);
    const [touched, setTouched] = React.useState(false);
    const handleTouch = () =>  setTouched(true);


    const items = props.items;
    const listItems = items.map((item,index) => {      
        return  <TableBody key={index}  component={Paper} className="body-list-material" >                        
                    <TableRow  className="body-row">                                
                        <TableCell className="body-title" component="th" scope="row" >

                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                value={{ label: item?.rawName , _id: item?.rawMaterialId }}
                                options={rawMaterial}    
                                getOptionSelected={(option, value) => option._id === value._id }  
                                getOptionLabel={ (option) => option?.label ? option?.label : " " }    
                                onChange={(e, value) => {
                                    props.setUpdateText( value?._id , item.key )
                                    props.setUpdateRawName( value?.label , item.key)
                                    props.setUpdateUnitRawMaterial(value?.unit , item.key)
                                }}
                                renderInput={(params) => 
                                    <TextField 
                                        {...params} size="small" className='text-field' 
                                        onFocus={handleTouch}
                                        error={ touched && item?.rawName === undefined }
                                        helperText={ item?.rawName === undefined && errorMessage[2] }  
                                    />
                                }
                            />

                        </TableCell>
                         
                        <TableCell className="body-title" width="27%" align='center'>
                            <TextField  
                                className='text-field'
                                fullWidth
                                type="number" 
                                id={item?.key} 
                                size='small' 
                                value={item?.amount} 
                                onChange={(e) => props.setUpdateQty(e.target.value, item.key)}
                                InputProps={{                                  
                                    endAdornment: (
                                        <InputAdornment position="end">                                             
                                            {item?.unitRawMaterial}                                           
                                        </InputAdornment>
                                    ),
                                    inputProps: { min: 1 },
                                }}
                                onFocus={handleTouch}
                                error={ touched && item?.amount < 0.01 || touched && isNaN(item?.amount) }
                                helperText={ item?.amount < 0.01 && errorMessage[0] || isNaN(item?.amount) && errorMessage[1] }  
                            />
                        </TableCell>   
                        
                        <TableCell className="body-title" align='right' width="10%">
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
