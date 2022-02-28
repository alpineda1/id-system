import {
  CircularProgress,
  InputAdornment,
  Stack,
  TextField,
} from '@mui/material';
import IconComponent from 'components/utils/icon';
import React from 'react';

const FilterComponent = ({ variables, functions }) => {
  return (
    <Stack spacing={2}>
      <TextField
        variant='filled'
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              {variables.filterLoading ? (
                <CircularProgress size={25} />
              ) : (
                <IconComponent icon='funnel' />
              )}
            </InputAdornment>
          ),
          disableUnderline: true,
        }}
        label='Filter'
        onChange={functions.handleFilterChange}
      />
    </Stack>
  );
};

export default FilterComponent;
