import React from "react"
//import { useState, useEffect} from "react";
import { Button, Typography , Stack, TextField,Divider} from '@mui/material';
//import {db} from 'firebase.app'
//import FilterResults from 'react-filter-search';
//import SearchInput, {createFilter} from 'react-search-input'
//import { SearchIcon, CloseIcon} from "@mui/material"

const HistoryList = () => {

    return (
    <Stack spacing={2} >
      <Stack spacing={2}>
      <Stack spacing={2}>
      <Stack spacing={2}>
           <Typography variant='h6' align="center">ID Application Histroy List</Typography>
      </Stack>

      <Datepicker 
    controls={['date']}
    min="1989-01-01"
    max="2050-12-31"
/>
</Stack>
      <div className="search">
        <TextField
          id="outlined-basic"
          variant="outlined"
          fullWidth
          label="Search"
          direction="row"
          alignItems = "center"
          justify="flex-end"
        />
        </div>
</Stack>


<Divider/>
      <Button  variant="contained" maxWidth='50px' >Dela Cerna, Jerome D || 2018-100003</Button>
      <Button  variant="contained" >Pineda, Angelika L || 2018-100100</Button>
      <Button  variant="contained" >Rianzares, Kervin R || 2018-100242</Button>
      <Button  variant="contained" >Sarte, Neil Y || 2018-100241</Button>
      <Button  variant="contained" >Veluz, Sage S || 2018-100263</Button>
      <Button  variant="contained" >Ylagan, Lala L || 2019-100300</Button>
          </Stack>
         
  ); 
}
export default HistoryList;