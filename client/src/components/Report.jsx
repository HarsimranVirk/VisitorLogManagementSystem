import React from 'react';
import { Container, Paper, Typography, TextareaAutosize, Grid, Button } from '@material-ui/core';
import axios from 'axios';
import constants from '../constants';


export default function Report(props) {
    const text = React.useRef(null);
    const result = React.useRef(null);
    React.useEffect(() => {
        if(text.current) {
            text.current.value = `(()=>{
    Faculty.find({ //Write your query here },
        (err, docs) => res.json(JSON.stringify(docs))
    )
})();`
        }
    }, []);


    const sendFunction = (event) => {
        if(text.current) {
            axios.post(constants.QUERY, {
                function: text.current.value
            }).then((res) => {
                if(result.current)
                    result.current.value = res.data;
            })
            .catch((res) => {
                if(res.status === 401) result.current.value = 'Access denied.';
                else result.current.value = 'Something went wrong!';
            })
        }
    }

    const generatePdf = (event) => {
        if(result.current) {
            axios.post(`${constants.QUERY}/pdf`, {
                data: result.current.value
            })
            .then((res) => {
                console.log(res.data);
            })
        }
    }

    return (
        <Container maxWidth='md'>
            <Paper>
                <Grid 
                    container 
                    spacing={3}
                    alignContent='space-around' 
                    direction='column'>
                    <Grid item>
                        <Typography>
                            Enter a valid MongoDB query function here:
                        </Typography>
                    </Grid>
                    <Grid item style={{width: '75%'}}>
                        <TextareaAutosize rowsMin={10} rowsMax={10} style={{width: '100%'}} ref={text} />
                    </Grid>
                    <Grid item style={{width: '75%', display: 'flex', justifyContent: 'center'}}>
                        <Button 
                            onClick={sendFunction}
                            color='secondary' 
                            variant='contained'>Submit</Button>
                    </Grid>
                    <Grid item style={{width: '75%'}}>
                        <TextareaAutosize rowsMin={10} rowsMax={10} style={{width: '100%'}} ref={result} />
                    </Grid>
                    <Grid item style={{width: '75%', display: 'flex', justifyContent: 'center'}}>
                        <Button 
                            onClick={generatePdf}
                            color='secondary' 
                            variant='contained'>Download as PDF</Button>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    )
}
