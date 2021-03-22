import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getLaunches, selectLaunches } from './launchSlice'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Toolbar } from '@material-ui/core';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    card: {
        maxWidth: 300,
    },
    media: {
        height: 300,
        width: 300
    },
    gridItem: {
        alignContent: 'centre'
    }
}));

export function Launch() {
    const launches = useSelector(selectLaunches);
    const dispatch = useDispatch();
    const years = [2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020]
    const [queryStringYear, setqueryStringYear] = useState('');
    const [queryStringLaunch, setqueryStringLaunch] = useState();
    const [queryStringLand, setqueryStringLand] = useState();


    useEffect(() => {
        dispatch(getLaunches(queryStringYear, queryStringLaunch, queryStringLand))
    }, [queryStringYear, queryStringLaunch, queryStringLand])

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Toolbar><b>SpaceX Launch Programs</b></Toolbar>
            <Grid container
                alignItems="center"
                spacing={1}
            >
                <Grid item xs={12} sm={3} lg={3} xl={2}>
                    <Card className={classes.card}>
                        <Toolbar><b>Filters</b></Toolbar>
                        <Toolbar>Launch Year</Toolbar>
                        {years.map((year, index) => {
                            return (
                                <Button key={index} onClick={() => {
                                    setqueryStringYear(`&launch_year=${year}`)
                                }} variant="contained" color="primary">{year}</Button>
                            )
                        })}
                        <Toolbar>Successful Launch</Toolbar>
                        <Button onClick={() => {
                            setqueryStringLaunch(`&launch_success=true`)
                        }} variant="contained" color="primary">True</Button>
                        <Button onClick={() => {
                            setqueryStringLaunch(`&launch_success=false`)
                        }} variant="contained" color="primary">False</Button>
                        <Toolbar>Successful Landing</Toolbar>
                        <Button onClick={() => {
                            setqueryStringLand(`&land_success=true`)
                        }} variant="contained" color="primary">True</Button>
                        <Button onClick={() => {
                            setqueryStringLand(`&land_success=false`)
                        }} variant="contained" color="primary">False</Button>
                    </Card>
                </Grid>

                {launches && launches.map((item, index) => {
                    return (
                        <Grid item xs={12} sm={6} lg={3} xl={2} key={index}>
                            <Card className={classes.card}>
                                <CardActionArea>
                                    <CardMedia
                                        className={classes.media}
                                        image={item.links.mission_patch_small}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h4" component="h4">{item.mission_name}</Typography>
                                        <Typography gutterBottom variant="h6" component="h6">Mission Id : {item.mission_name}</Typography>
                                        <Typography gutterBottom variant="h6" component="h6">Launch Year : {new Date(item.launch_date_local).getFullYear()}</Typography>
                                        <Typography gutterBottom variant="h6" component="h6">Launch Success : {item.launch_success? 'TRUE' : 'FALSE'}</Typography>
                                        <Typography gutterBottom variant="h6" component="h6">Land Success : {item.rocket.first_stage.cores[0].land_success? 'TRUE' : 'FALSE'}</Typography>
                                    
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    )
                })
                }
            </Grid>
        </div >
    );
}
