import React, { useState } from "react";
//import Webcam from "react-webcam";
import { Grid, Container, Button,  TextField, Typography, Box } from '@mui/material';
import logo from 'assets/nu-apc.png'; 

const defaultValues = {
  name: "",
  nickname: "",
  course: "",
  idnumber:""
};

const Form = () => {
  const [formValues, setFormValues] = useState(defaultValues);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formValues);
  };
  
// camera open cam

// upload image

  return (
    <Container maxWidth='sm' sx={{ width: '100%' }}>
      <form onSubmit={handleSubmit}>

            <Typography variant='h6' >
             ID System Form
            </Typography>
          
    <form onSubmit={handleSubmit}>
      <Grid container  justify="center" direction="column">
        <Grid item>
          <Typography>

          <Box sx={{ fontSize: 'h6.fontSize', m: 1, lineHeight: 2.5 }}>Name: </Box>
          </Typography>
          <TextField
            id="name-input"
            name="name"
            label="Name"
            type="text"
            value={formValues.name}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item>
        <Typography>

<Box sx={{ fontSize: 'h6.fontSize', m: 1, lineHeight: 2.5 }}>ID Number: </Box>
</Typography>
        <TextField
            id="idnumber-input"
            name="idnumber"
            label="ID number"
            type="text"
            value={formValues.idnumber}
            onChange={handleInputChange}
          />
         
        </Grid>
        <Grid item>
        <Typography>

<Box sx={{ fontSize: 'h6.fontSize', m: 1, lineHeight: 2.5 }}>Course: </Box>
</Typography>
          <TextField
            id="course-input"
            name="course"
            label="Course"
            type="text"
            value={formValues.course}
            onChange={handleInputChange}
          />
        </Grid>
         
        <Grid item>
        <Typography>

          <Box sx={{ fontSize: 'h6.fontSize', m: 1, lineHeight: 2.5 }}>Nickname: </Box>
          </Typography>
          <TextField
            id="nickname-input"
            name="Nickname"
            label="Nickname"
            type="text"
            value={formValues.nickname}
            onChange={handleInputChange}
          />
        </Grid>
  
        <Grid item>
          <div style={{ width: "400px" }}>
        
          </div>
{/*will change */}
          <Box sx={{ fontSize: 'h6.fontSize', m: 1, lineHeight: 2.5 }}> </Box>
        </Grid>
        <Typography>

        <Box sx={{ fontSize: 'h6.fontSize', m: 1, lineHeight: 2.5 }}>Picture: </Box>
{/**will change stack spacing supposedly but got confused */}
<Box sx={{ fontSize: 'h6.fontSize', m: 1, lineHeight: 2.5 }}> </Box>

        </Typography>
        <Button variant="contained" color="primary" type="submit">
          upload
        </Button>
 {/**will change */}
        <Box sx={{ fontSize: 'h6.fontSize', m: 1, lineHeight: 2.5 }}> </Box>
        <Button variant="contained" color="primary" type="submit">
          open camera
        </Button>
{/**will change */}
           <Box sx={{ fontSize: 'h6.fontSize', m: 1, lineHeight: 2.5 }}> </Box>
        <Typography>

<Box sx={{ fontSize: 'h6.fontSize', m: 1, lineHeight: 2.5 }}>Signature: </Box>
</Typography>
        <Button variant="contained" color="primary" type="submit">
             {/**will change */}
             <Box sx={{ fontSize: 'h6.fontSize', m: 1, lineHeight: 2.5 }}> </Box>
          upload 
        </Button>
   {/**will change */}
   <LoadingButton loading={loading} type='submit' variant='contained'>
            SUBMIT
          </LoadingButton>
      </Grid>
    </form>
      </form>
    </Container>
  );
};

export default IDForm;