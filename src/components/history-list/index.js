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
      <Stack spacing={2}>

           <Typography variant='h3' align="center">ID Application History List</Typography>
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
          style={{ height: 28 , width: "80%"}}
        />
        </div>
</Stack>

      <Button  variant="contained"  style={{ width: "100%" }} >Dela Cerna, Jerome D || 2018-100003</Button>
      <Button  variant="contained"  style={{ width: "100%" }}>Pineda, Angelika L || 2018-100100</Button>
      <Button  variant="contained"  style={{ width: "100%" }}>Rianzares, Kervin R || 2018-100242</Button>
      <Button  variant="contained"  style={{ width: "100%" }}>Sarte, Neil Y || 2018-100241</Button>
      <Button  variant="contained"  style={{ width: "100%" }}>Veluz, Sage S || 2018-100263</Button>
      <Button  variant="contained"  style={{ width: "100%" }}>Ylagan, Lala L || 2019-100300</Button>
          </Stack>
         
  ); 
}
export default HistoryList;