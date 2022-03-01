import { DesktopDatePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import {
  Checkbox,
  CircularProgress,
  FilledInput,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  Stack,
  TextField,
  useMediaQuery,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useTheme } from '@mui/system';
import IconComponent from 'components/utils/icon';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  inputLabel: {
    ...{
      '&.MuiInputLabel-shrink': {
        marginTop: theme.spacing(2),
      },
    },
  },
}));

const years = ['2016', '2017', '2018', '2019', '2020', '2021', '2022'];

const levels = ['Senior High School', 'College'];

const FilterComponent = ({ variables, functions }) => {
  const classes = useStyles();
  const theme = useTheme();

  const mdUp = useMediaQuery(theme.breakpoints.up('md'));

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

      <Grid container sx={{ width: '100%' }}>
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            paddingRight: mdUp && theme.spacing(1),
            paddingBottom: theme.spacing(1),
          }}
        >
          <FormControl fullWidth>
            <InputLabel
              className={classes.inputLabel}
              margin='dense'
              id='year-checkbox-label'
            >
              Year created
            </InputLabel>
            <Select
              labelId='year-checkbox-label'
              id='year-checkbox'
              multiple
              value={variables.filterYear}
              onChange={functions.handleYearChange}
              input={<FilledInput />}
              renderValue={(selected) => selected.join(', ')}
              disableUnderline
            >
              {years.map((year, index) => (
                <MenuItem key={index} value={year}>
                  <Checkbox checked={variables.filterYear.indexOf(year) > -1} />
                  <ListItemText primary={year} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid
          item
          xs={12}
          md={6}
          sx={{
            paddingBottom: theme.spacing(1),
            paddingLeft: mdUp && theme.spacing(1),
            paddingTop: !mdUp && theme.spacing(1),
          }}
        >
          <FormControl fullWidth>
            <InputLabel
              className={classes.inputLabel}
              margin='dense'
              id='level-checkbox-label'
            >
              Level
            </InputLabel>
            <Select
              labelId='level-checkbox-label'
              id='level-checkbox'
              multiple
              value={variables.filterLevel}
              onChange={functions.handleLevelChange}
              input={<FilledInput />}
              renderValue={(selected) => selected.join(', ')}
              disableUnderline
            >
              {levels.map((level, index) => (
                <MenuItem key={index} value={level}>
                  <Checkbox
                    checked={variables.filterLevel.indexOf(level) > -1}
                  />
                  <ListItemText primary={level} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid
          item
          xs={12}
          md={6}
          sx={{
            paddingTop: theme.spacing(1),
            paddingRight: mdUp && theme.spacing(1),
            paddingBottom: !mdUp && theme.spacing(1),
          }}
        >
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDatePicker
              label='Submitted from'
              mask='____-__-__'
              inputFormat='yyyy-MM-dd'
              InputProps={{ disableUnderline: true }}
              renderInput={(params) => (
                <TextField variant='filled' {...params} />
              )}
              components={{
                OpenPickerIcon: () => (
                  <IconComponent
                    icon='calendar'
                    iconType='phosphor'
                    weight='duotone'
                  />
                ),
              }}
              onChange={functions.handleDateFromChange}
              value={variables.filterDateFrom}
            />
          </LocalizationProvider>
        </Grid>

        <Grid
          item
          xs={12}
          md={6}
          sx={{
            paddingLeft: mdUp && theme.spacing(1),
            paddingTop: theme.spacing(1),
          }}
        >
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDatePicker
              label='Submitted to'
              mask='____-__-__'
              inputFormat='yyyy-MM-dd'
              InputProps={{ disableUnderline: true }}
              renderInput={(params) => (
                <TextField variant='filled' {...params} />
              )}
              components={{
                OpenPickerIcon: () => (
                  <IconComponent
                    icon='calendar'
                    iconType='phosphor'
                    weight='duotone'
                  />
                ),
              }}
              onChange={functions.handleDateToChange}
              value={variables.filterDateTo}
            />
          </LocalizationProvider>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default FilterComponent;
