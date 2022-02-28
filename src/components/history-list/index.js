//import StaticDateRangePicker from '@mui/lab/StaticDateRangePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
//import { useState} from "react";
import { Button, Stack, TextField, Typography } from '@mui/material';
import React from 'react';

//import {db} from 'firebase.app'
//import FilterResults from 'react-filter-search';
//import SearchInput, {createFilter} from 'react-search-input'
//import { SearchIcon, CloseIcon} from "@mui/material"

const HistoryList = () => {
  const [value, setValue] = React.useState([null, null]);

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  return (
    <Stack spacing={3}>
      <Stack spacing={3}>
        <Stack spacing={1}>
          <Typography variant='h3' align='center'>
            ID Application History List
          </Typography>
        </Stack>

        <div className='search'>
          <TextField
            id='outlined-basic'
            variant='outlined'
            direction='row'
            justify='flex-end'
            label='Search'
            alignItems='flex-start'
          />
        </div>

        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DesktopDatePicker
            label='Date'
            inputFormat='MM/dd/yyyy'
            value={value}
            onChange={handleChange}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </Stack>

      <Button
        variant='contained'
        alignItems='flex-start'
        m={5}
        style={{ width: '100%', fontSize: '20px' }}
      >
        Dela Cerna, Jerome D || 2018-100003
      </Button>
      <Button
        variant='contained'
        alignItems='flex-start'
        style={{ width: '100%', fontSize: '20px' }}
      >
        Pineda, Angelika L || 2018-100100
      </Button>
      <Button
        variant='contained'
        alignItems='flex-start'
        style={{ width: '100%', fontSize: '20px' }}
      >
        Rianzares, Kervin R || 2018-100242
      </Button>
      <Button
        variant='contained'
        alignItems='flex-start'
        style={{ width: '100%', fontSize: '20px' }}
      >
        Sarte, Neil Y || 2018-100241
      </Button>
      <Button
        variant='contained'
        alignItems='flex-start'
        style={{ width: '100%', fontSize: '20px' }}
      >
        Veluz, Sage S || 2018-100263
      </Button>
      <Button
        variant='contained'
        alignItems='flex-start'
        style={{ width: '100%', fontSize: '20px' }}
      >
        Ylagan, Lala Jamei L || 2019-100300
      </Button>
    </Stack>
  );
};
export default HistoryList;
