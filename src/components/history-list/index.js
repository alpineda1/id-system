import React, { useState, useEffect, useRef } from "react"
import { Button, Typography , Stack} from '@mui/material';
import { db, storage } from 'firebase.app';
import FilterResults from 'react-filter-search';
import SearchInput, {createFilter} from 'react-search-input'

const HistoryList = () => {
{/*
  const students =[

  ];

  const [search, setSearch] = useState;

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
};

const filtered =!search 
? students 
: students.filter((person) => )
*/}



  return (
    <Stack spacing={2} >
      <Stack spacing={2}>
           <Typography variant='h6' align="center">ID  Histroy List</Typography>
      </Stack>

            <Typography >Search: <input type="text" value={search} onChange={handleSearchChange} /></Typography>
      
      <Button value={data.idNumber}></Button>
    
          </Stack>
         
  ); 
}
export default HistoryList;