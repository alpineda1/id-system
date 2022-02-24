import React from "react"
//import { useState, useEffect} from "react";
import { Button, Typography , Stack, TextField} from '@mui/material';
//import {db} from 'firebase.app'
//import FilterResults from 'react-filter-search';
//import SearchInput, {createFilter} from 'react-search-input'
//import { SearchIcon, CloseIcon} from "@mui/material"

const HistoryList = () => {

    return (
    <Stack spacing={3} >
      <Stack spacing={3}>
      <Stack spacing={1}>

           <Typography variant='h3' align="center">ID Application History List</Typography>
      </Stack>

      <div className="search" sx={{ flexDirection: 'row-reverse' }}  style={{ height: 90 , width: "100%"}}>
        <TextField
          id="outlined-basic"
          variant="outlined"
          direction="row"
          justify="flex-end"
          label="Search"
          alignItems ='flex-start'
        />
        </div>
</Stack>

<Button  variant="contained"   alignItems ='flex-start'
        style={{ width: "120%" ,fontSize: '20px' }} >Dela Cerna, Jerome D || 2018-100003</Button>
      <Button  variant="contained" alignItems ='flex-start'  style={{ width: "120%",fontSize: '20px' }}>Pineda, Angelika L || 2018-100100</Button>
      <Button  variant="contained" alignItems ='flex-start' style={{ width: "120%",fontSize: '20px' }}>Rianzares, Kervin R || 2018-100242</Button>
      <Button  variant="contained" alignItems ='flex-start' style={{ width: "120%" ,fontSize: '20px'}}>Sarte, Neil Y || 2018-100241</Button>
      <Button  variant="contained" alignItems ='flex-start' style={{ width: "120%",fontSize: '20px' }}>Veluz, Sage S || 2018-100263</Button>
      <Button  variant="contained"  alignItems ='flex-start' style={{ width: "120%" ,fontSize: '20px'}}>Ylagan, Lala L || 2019-100300</Button>
               </Stack>
         
  ); 
}
export default HistoryList;