import React from 'react';
import { withRouter } from 'react-router-dom';
import { Breadcrumbs, makeStyles, Theme, createStyles, Chip } from '@material-ui/core';
import { NavigateNext, Home } from '@material-ui/icons';

const useStyles = makeStyles((theme: Theme) => 
    createStyles({
        link: {
            display: 'flex'
        },
        icon: {
            marginRight: theme.spacing(0.5),
            width: 20,
            height: 20,
        },
        breacrumb: {
            padding: 5,
        }
    })
);
const ShowPageInfo = withRouter(({ match, location }) => {
    const classes = useStyles();
    const paths = "Home" + location.pathname;
    const contents = paths.split('/').map((value, index) => (
        value ? <Chip key={index} label={value} onDelete={()=>{}} icon={<Home className={classes.icon}/>}/> : null
    ));
    return (
        <Breadcrumbs aria-label='breadcrumb' separator={<NavigateNext/>} className={classes.breacrumb}>
            {contents}
        </Breadcrumbs>
    )
});

export default ShowPageInfo;