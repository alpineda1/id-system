import React from "react"
//import { useState, useEffect} from "react";
import { Button, Typography , Stack, TextField} from '@mui/material';
//import {db} from 'firebase.app'
//import FilterResults from 'react-filter-search';
//import SearchInput, {createFilter} from 'react-search-input'
//import { SearchIcon, CloseIcon} from "@mui/material"

const HistoryList = () => {

    return (
    <Stack spacing={2} >
      <Stack spacing={2}>
      <Stack spacing={2}>
           <Typography variant='h6' align="center">ID  Histroy List</Typography>
      </Stack>

      <div className="search">
        <TextField
          id="outlined-basic"
          variant="outlined"
          fullWidth
          label="Search"
        />
        </div>
        </Stack>
      <Button  variant="contained" >sample</Button>
          </Stack>
         
  ); 
}
export default HistoryList;