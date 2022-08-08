import React from 'react';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { Autocomplete, Box, IconButton, InputAdornment, Paper, Stack, TableBody, TableCell, TableRow, TextField } from '@mui/material';
import './listcreatesales.scss';
import { withStyles } from '@material-ui/core/styles';
import {GET_STORAGE_ROOM_PAGINATION} from "../../Schema/starageroom";
import { GET_PRODUCT_GROUP_PAGINATION, GET_PRODUCT_WITH_PAGINATION } from "../../Schema/product";
import {useQuery} from "@apollo/client"


function ListCreateSales(props) {

    // get Storage room
    const [products, setProducts] = React.useState([])
    const { data, refetch } = useQuery(GET_PRODUCT_WITH_PAGINATION, {
      variables: {       
        keyword: "",
        pagination: false,
      },
    });
   
    React.useEffect( () => {
        if (data?.getProductPagination?.products) {
            let rows = [];
            data?.getProductPagination?.products?.forEach((element) => {
                const allrow = {
                  label: element?.productName,
                  _id: element?._id,
                  unitPrice: element?.unitPrice,
                };
                rows.push(allrow);
            });
            setProducts(rows);
        }
    },[data?.getProductPagination?.products])
    // End Get Storage room



    // getProduct Group ====================================================
    const [productGroup,setProductGroup] = React.useState([]);

    const { data : productGroupData } = useQuery(GET_PRODUCT_GROUP_PAGINATION, {
        variables: {           
            keyword: "",
            pagination: false,
        },
        onError: (error) => {
            console.log(error.message)
        }
    })

    // console.log(productGroupData?.getProductGroupPagination?.productGroups);
    React.useEffect( () => {
        if (productGroupData?.getProductGroupPagination?.productGroups) {
            let rows = [];
            productGroupData?.getProductGroupPagination?.productGroups?.forEach( (element) => {
                const allrow = {
                  label: element?.name,
                  _id: element?._id,
                  unitPrice: element?.unitPrice,
                };
                rows.push(allrow);
            });
            setProductGroup(rows);
        }
    },[productGroupData?.getProductGroupPagination?.productGroups]);

    console.log("productGroup ::" , productGroup)



   // Handle Message Error TextField
   const [errorMessage, setErrorMessage] = React.useState(["Can't input 0" , "Invalid Value" , "Material is required!"]);
   const [touched, setTouched] = React.useState(false);
   const handleTouch = () =>  setTouched(true);


    const items = props.items;
    const listItems = items.map(item => {
        return  <TableBody key={item?.key}  component={Paper} className="body-list-material" >                        
                    <TableRow  className="body-row"> 

                        <TableCell className="body-title" component="th" scope="row" width="50%">                           
                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                options={productGroup}                                
                                onChange={(e, value) => {
                                    props.setUpdateProductId( value?._id , item.key ) 
                                    props.setUpdateItemName( value?.label , item.key )
                                    props.setUpdateRate( value?.unitPrice , item.key);
                                }}
                                renderInput={(params) => <TextField {...params} size="small" className='text-field' />}
                            />
                        </TableCell>
                      
                        <TableCell className="body-title" width="30%" align='center'>
                            <TextField  
                                className='text-field'
                                fullWidth
                                type="number" 
                                id={item?.key} 
                                size='small' 
                                value={item?.qty} 
                                onChange={(e) => {
                                    props.setUpdateQty(e.target.value, item.key)
                                    props.setUpdateAmount(e.target.value*item?.unitPrice, item.key);
                                }}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            U/M
                                        </InputAdornment>
                                    ),
                                    inputProps: { min: 1 },
                                }}
                                onFocus={handleTouch}
                                error={ touched && item?.qty < 0.01 || touched && isNaN(item?.qty) }
                                helperText={ item?.qty < 0.01 && errorMessage[0] || isNaN(item?.qty) && errorMessage[1] }
                            />
                        </TableCell>   

                        <TableCell className="body-title" width="20%" align='center'>
                            <TextField  
                                className='text-field'
                                fullWidth
                                type="number" 
                                id={item?.key} 
                                size='small' 
                                value={item?.unitPrice} 
                                onChange={(e) => {
                                    props.setUpdateRate(e.target.value, item.key);
                                    props.setUpdateAmount(e.target.value*item?.qty, item.key);
                                }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            $
                                        </InputAdornment>
                                    ),
                                    inputProps: { min: 1 },
                                }}
                                onFocus={handleTouch}
                                error={ touched && item?.unitPrice < 0.01 || touched && isNaN(item?.unitPrice) }
                                helperText={ item?.unitPrice < 0.01 && errorMessage[0] || isNaN(item?.unitPrice) && errorMessage[1] }
                            />
                        </TableCell>   
                        
                        <TableCell className="body-title" width="20%" align='center'>
                            <TextField  
                                // disabled
                                className='text-field'
                                fullWidth
                                type="text" 
                                id={item?.key} 
                                size='small' 
                                value={item?.amount?.toFixed(2)}
                            />                            
                        </TableCell>   
                        {/* <TableCell className="header-title" width='3%'></TableCell>  */}
                        <TableCell className="body-title" align='center'>
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

export default ListCreateSales;