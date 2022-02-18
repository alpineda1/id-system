
import React, { useState, useEffect, useRef } from "react"
import { Alert, Container, Card, CardMedia, CardContent, Typography, Grid } from '@mui/material';
import { db, storage } from 'firebase.app';
import logo from 'assets/nu-apc.png';

    const IDPreview = () => {

        useEffect (() => {
            const getImage = async () => {
                let result = await storage.ref("photo").list();
                let urlPromises = result.items.map((image))
                image.getDownloadURL()
        
        return Promise.all(urlPromises)
            };
        const loadImage = async () => {
            const urls = await getImage();
            setFiles(urls);
        };
        loadImage();
        }, []);

        console.log(files)


  return (
    <Container maxWidth='m' sx={{ width: '100%' }}>
      <Typography variant='h6' align = "center">
      ID Preview
         </Typography>
    
         <CardContent>
         <Card sx={{ maxWidth: 455 }}>
         <Grid container spacing={2}>
           <grid item xs={4}>  

  <CardMedia
    component="img"
    alt="ID-photo"
    height="170"
    image={getImage}
  />
</grid>
</Grid>
<grid item xs = {4}>
        <Typography gutterBottom variant="h5" component="div">
          Name  
        </Typography>
        <Typography variant="body2" color="text.secondary">
         idnumber
        </Typography>
        <Typography variant="body2" color="text.secondary">
         cousre
        </Typography>
        </grid>
        </Card>
      </CardContent>
  

{/*ID back*/}
<CardContent>  
  <Card sx={{ maxWidth: 455 }}>


<Grid container spacing={3}>
  <Grid item xs>
     <Paper   align="center"> image signature </Paper>
      
        </Grid>
        <Grid item xs>
     <Paper  align="center" > image signature </Paper>
      
        </Grid>
      
        <CardMedia
    component="img"
    alt="apc-nu logo"
    height="140"
    img src = {logo}
  />
  </Grid>
  
        </Card>
  
      </CardContent>
  

  </Container>
  )
}

export default IDPreview;