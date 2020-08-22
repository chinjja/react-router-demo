import React from 'react';
import { withRouter, Link as RouterLink } from 'react-router-dom';
import { Breadcrumbs, makeStyles, Theme, createStyles, Chip, Link, Typography, LinkProps } from '@material-ui/core';
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

interface LinkRouterProps extends LinkProps {
    to: string;
    replace?: boolean;
}

const LinkRouter = (props: LinkRouterProps) => <Link {...props} component={RouterLink}/>;

const ShowPageInfo = withRouter(({ match, location }) => {
    const classes = useStyles();
    const paths = location.pathname.split('/').filter(x => x);
    return (
        <Breadcrumbs aria-label='breadcrumb' separator={<NavigateNext />} className={classes.breacrumb}>
            <LinkRouter color='inherit' to='/'>
                Home
            </LinkRouter>
            {paths.map((value, index) => {
                const last = paths.length - 1 === index;
                const to = '/' + paths.slice(0, index + 1).join('/');

                return last ? (
                    <Typography color='textPrimary' key={to}>
                        {value}
                    </Typography>
                ) : (
                        <LinkRouter color='inherit' to={to} key={to}>
                            {value}
                        </LinkRouter>
                    )
            })}
        </Breadcrumbs>
    )
});

export default ShowPageInfo;