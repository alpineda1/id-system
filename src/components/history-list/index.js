import React from "react"
import { useState, useEffect} from "react";
import { Button, Typography , Stack} from '@mui/material';
import {db} from 'firebase.app'
//import FilterResults from 'react-filter-search';
//import SearchInput, {createFilter} from 'react-search-input'
//import { SearchIcon, CloseIcon} from "@mui/material"

const HistoryList = () => {

  const [search, setSearch] = useState([]);
  const [name, SetName] = useState([]);
  const[NameData, setNameData] = useState(name);

  const changeSearch = (val) => {
    setSearch(val)
    if(val !=' ') {
      setNameData(name.filter(  name => {
        name.first.includes (val) ||
        name.last.includes(val)
        
      }))
    }
    else{
      setNameData(name)
    }
  }
  useEffect(() => {
    const fetchData = async () => {
      const data = await db.collection ("name").get();
      SetName(data.docs.map((doc) => ({ ...doc.data(), id: doc.id})));

        };
        fetchData();
      }, []);


    return (
    <Stack spacing={2} >
      <Stack spacing={2}>
           <Typography variant='h6' align="center">ID  Histroy List</Typography>
      </Stack>
          {/*  <Typography >Search: <input type="text" value={search} onChange={handleSearchChange} /></Typography>
     
      <Button value={data.idNumber}></Button>

      
     */}
<input type='text' onChange={(e)=> changeSearch(e.target.value)}></input>
<input
          type="text"
          placeholder="Search"
          onChange={(e) => setSearch(e.target.value)}
        />
    <Button  variant="contained" >sample</Button>
          </Stack>
         
  ); 
}
export default HistoryList;