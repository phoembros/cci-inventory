import * as React from 'react';
// import FlipMove from 'react-flip-move';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { Autocomplete, Box, IconButton, Paper, Stack, TableBody, TableCell, TableRow, TextField } from '@mui/material';
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
                };
                rows.push(allrow);
            });
            setRawMaterial(rows);
        }
    },[data?.getRawMaterialPagination?.rawMaterial])
    // End Get Raw Materila

    const items = props.items;
    const listItems = items.map((item,index) => {
      
        // console.log(item ,"item",index)

        return  <TableBody key={index}  component={Paper} className="body-list-material" >                        
                    <TableRow  className="body-row">                                
                        <TableCell className="body-title" component="th" scope="row" >

                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                value={{ label: item?.rawName , _id: item?.rawMaterialId }}
                                options={rawMaterial}    
                                getOptionSelected={(option, value) => option._id === value._id }      
                                onChange={(e, value) => {
                                    props.setUpdateText( value?._id , item.key )
                                    props.setUpdateRawName( value?.label , item.key)
                                }}
                                renderInput={(params) => <TextField {...params} size="small" className='text-field' />}
                            />

                        </TableCell>
                        <TableCell className="header-title" width="3%"></TableCell>
                        <TableCell className="body-title" width="15%" align='center'>
                            <TextField  
                                className='text-field'
                                fullWidth
                                type="number" 
                                id={item?.key} 
                                size='small' 
                                value={item?.amount} 
                                onChange={(e) => props.setUpdateQty(e.target.value, item.key)}
                            />
                        </TableCell>   
                        <TableCell className="header-title" width="3%"></TableCell> 
                        <TableCell className="body-title" align='right'>
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
