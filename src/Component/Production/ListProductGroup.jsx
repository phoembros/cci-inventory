import React from 'react';
// import FlipMove from 'react-flip-move';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { Autocomplete, Box, FormControl, IconButton, InputAdornment, InputLabel, MenuItem, Paper, Select, Stack, TableBody, TableCell, TableRow, TextField } from '@mui/material';
import './listproductgroup.scss';
import { withStyles } from '@material-ui/core/styles';
import {GET_RAW_MATERAIL_PAGINATION} from "../../Schema/rawmaterial";
import {useQuery} from "@apollo/client";
import { GET_PRODUCT_GROUP_BYPRODUCT_ID } from "../../Schema/product";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import { makeStyles } from "@material-ui/core/styles";

function ListProductGroup(props) {

    // get product group   
    const [productGroup,setProductGroup] = React.useState([]);
    const { data , refetch } = useQuery(GET_PRODUCT_GROUP_BYPRODUCT_ID,{
        variables: {
            productId: props?.productId,
        }
    })   

    React.useEffect( () => {
        if (data?.getProductGroupByProductId) {
            const row = [];
            data?.getProductGroupByProductId?.forEach(element => {
                const allRow = {
                    label: element?.name,
                    _id: element?._id,
                    unitQtyGroup : element?.quantityPerStockUM,
                }
                row.push(allRow);
            });
            setProductGroup(row)
        }
    },[data?.getProductGroupByProductId])

    // console.log(data?.getProductGroupByProductId)
    // End Get Product Group

    React.useEffect( () => {
        refetch()
    },[])

    // Placeholder Select
    const usePlaceholderStyles = makeStyles((theme) => ({
        placeholder: {
          color: "#aaa",
        },
    }));
    
    const Placeholder = ({ children }) => {
        const classes = usePlaceholderStyles();
        return <div className={classes.placeholder}>{children}</div>;
    };
    // End placeholder

    
    // Handle Message Error TextField
    const [errorMessage, setErrorMessage] = React.useState(["Can't input 0" , "Invalid Value" , "Material is required!"]);
    const [touched, setTouched] = React.useState(false);
    const handleTouch = () =>  setTouched(true);


    const items = props.items;
    const listItems = items.map(item => {
       
        return  <TableBody key={item?.key}  component={Paper} className="body-list-material" >                        
                    <TableRow  className="body-row">                                
                        <TableCell className="body-title" component="th" scope="row" >   
                            {/* <FormControl fullWidth size='small' className="form-controll-select">                               
                                <Select                                    
                                    // value={item?.productGroupId}
                                    onChange={(e) =>  props.setProductGroupId(e.target.value , item?.key) }
                                    displayEmpty
                                    renderValue={ 
                                        item?.productGroupId !== "Name"  ? undefined : () => <Placeholder>{item?.productGroupId}</Placeholder>
                                    }
                                    IconComponent={(props) => ( <KeyboardArrowDownOutlinedIcon {...props} /> )}                                    
                                >
                                    {
                                        productGroup?.map( (row,index) => (
                                            <MenuItem key={index} value={row?._id}>{row?.name}</MenuItem>
                                        ))
                                    }                                    
                                </Select>
                            </FormControl> */}
                            <Autocomplete                                
                                disablePortal   
                                value={{ label : item?.label , _id: item?.productGroupId }}                            
                                options={productGroup}  
                                getOptionSelected={(option, value) => option?._id === value?._id } 
                                getOptionLabel={ (option) => option.label ? option.label : "Name" }                              
                                onChange={(e, value) => {
                                    props.setProductGroupId( value?._id , value?.unitQtyGroup , item?.key)   
                                    props?.setProductGroupLabel(value?.label,item.key) 
                                }}
                                renderInput={(params) => 
                                    <TextField 
                                        {...params} size="small" className='text-field' fullWidth
                                        placeholder='Name'
                                        // onFocus={handleTouch}
                                        // error={ touched && props.errorAlert && item?.rawName === undefined }
                                        // helperText={ item?.rawName === undefined && errorMessage[2] }   
                                    />
                                }
                            />
                        </TableCell>   
                         
                        <TableCell className="body-title" width="35%" align='center'>
                            <TextField 
                                className='text-field'
                                fullWidth
                                type="number" 
                                id={item?.key} 
                                size='small' 
                                value={item?.qtyOfUM}
                                onChange={(e) => props.setQtyOfUM(e.target.value, item.key)}
                                InputProps={{                                  
                                    endAdornment: (
                                        <InputAdornment position="end">                                             
                                            U/M
                                        </InputAdornment>
                                    ),
                                    inputProps: { min: 1 },
                                }}
                                onFocus={props.handleTouch}
                                error={ 
                                    props.touched && props.errorAlert && props.valueOver || 
                                    props.touched && props.errorAlert && isNaN(item?.qtyOfUM) 
                                }
                                helperText={ 
                                    props.valueOver && props.errorAlert && props.errorMessage[0] || 
                                    isNaN(item?.qtyOfUM) && props.errorAlert && props.errorMessage[1] 
                                }  
                            />

                            {/* <TextField  
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
                                error={ touched && item?.amount < 0 || touched && isNaN(item?.amount) }
                                helperText={ item?.amount < 0 && errorMessage[0] || isNaN(item?.amount) && errorMessage[1] }     
                            /> */}
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

export default ListProductGroup;