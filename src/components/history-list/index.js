import React, { useState, useEffect, useRef } from "react"
import { Button, Typography , Stack} from '@mui/material';
import { db, storage } from 'firebase.app';

const HistoryList = () => {
  return (
    <Stack spacing={2} >
      <Stack spacing={2}>
           <Typography variant='h6' align="center">ID  Histroy List</Typography>
      </Stack>

      
      <Button value={data.idNumber}></Button>
    
          </Stack>
         
  ); 
}
export default HistoryList;