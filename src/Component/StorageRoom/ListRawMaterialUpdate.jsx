import React from 'react';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { Autocomplete, Box, IconButton, Paper, Stack, TableBody, TableCell, TableRow, TextField } from '@mui/material';
import './listrawmaterial.scss';
import { useQuery } from '@apollo/client';
// Schema 
import { GET_SUPPLIERS_BY_PAGINATION } from "../../Schema/supplies";
import { GET_RAW_MATERAIL_PAGINATION } from "../../Schema/rawmaterial";


function ListRawMaterialUpdate(props) {

    // Get RawMaterial
    const [rawMaterial,setRawMaterial] = React.useState([]);
    const { data: rawmaterialData} = useQuery(GET_RAW_MATERAIL_PAGINATION, {
        variables: {
          keyword: "",
          pagination: false,
        }
    })

    React.useEffect(() => {
        if (rawmaterialData) {
            let rows = [];            
            rawmaterialData?.getRawMaterialPagination?.rawMaterial?.forEach((element) => {
                const allrow = { 
                  label: element?.materialName, 
                  _id: element?._id 
                };
                rows.push(allrow);
            });
            setRawMaterial(rows);
        }
    }, [rawmaterialData]);
    // End Get


    //End Get Supplies
    const [suppliers, setSuppliers] = React.useState([]);
    const {data: suppliesData} = useQuery(GET_SUPPLIERS_BY_PAGINATION,{
        variables: {
            keyword: "",
            pagination: false,
        },
    })

    React.useEffect(() => {
        if (suppliesData) {
            let rows = [];
            suppliesData?.getSuppliersPagination?.suppliers.forEach((element) => {
                const allrow = { label: element?.name, _id: element?._id };
                rows.push(allrow);
            });
            setSuppliers(rows);
        }
    }, [suppliesData]);
    //End Get Supplies


    const items = props.items;
    const listItems = items?.map((item) => {        
        return  <TableBody key={item.key}  component={Paper} className="body-list-materiales" >                        
                    <TableRow  className="body-row">                                
                        <TableCell className="body-title" component="th" scope="row" >                          
                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                value={{ label:item?.rawName, _id: item?.rawMaterialId }}                                
                                options={rawMaterial}     
                                getOptionSelected={(option, value) => option?._id === value?._id }
                                onChange={(e, value) => {
                                    props.setUpdateRawId( value?._id , item.key ) 
                                    props.setUpdateRawName( value?.label , item.key )
                                }}
                                renderInput={(params) => <TextField {...params} size="small" className='text-field' />}
                            />
                        </TableCell>
                        
                        <TableCell className="body-title" width="15%" align='center'>
                            <TextField  
                                className="text-field"
                                fullWidth
                                type="number" 
                                id={item.key} 
                                size='small' 
                                value={item.newQty} 
                                onChange={(e) => props.setUpdateQty(parseFloat(e.target.value), item.key)}
                            />
                        </TableCell>   
                       
                        <TableCell className="body-title" width="15%" align='center'>
                            <TextField  
                                className="text-field"
                                fullWidth
                                type="number" 
                                id={item.key} 
                                size='small' 
                                value={item.unitPrice} 
                                onChange={(e) => props.setUpdateUnitPrice(parseFloat(e.target.value), item.key)}
                            />
                        </TableCell>   
                         
                        <TableCell className="body-title" align='center'>                             
                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                value={{ label:item?.suppliersName , _id: item?.suppliersId }}
                                options={suppliers}   
                                getOptionSelected={(option, value) => option._id === value._id }                             
                                onChange={(e, value) => {
                                    props.setUpdateSuppliesId( value?._id , item.key ) 
                                    props.setUpdateSuppliersName( value?.label , item.key )
                                }}
                                renderInput={(params) => <TextField {...params} size="small" className='text-field' />}
                            />
                        </TableCell>
                        <TableCell className="body-title" align='right'  width="5%">
                            <IconButton onClick={() => { props.deleteItem(item.key) }}>
                                <DeleteRoundedIcon  sx={{color:"red"}}/>
                            </IconButton>    
                        </TableCell>                                                   
                    </TableRow>
            </TableBody>
    })
   
    return  listItems;
   
}

export default ListRawMaterialUpdate;