import React from 'react';
import clsx from 'clsx';
import { Button, Paper, Card, CardContent, Typography, CardActions, CardHeader, Avatar, IconButton, CardMedia, Collapse, Menu, MenuItem, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';
import { MoreVert, Favorite, Share, ExpandMore } from '@material-ui/icons';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

export default class Home extends React.Component {
    render() {
        return (
            <div>
                <RecipeReviewCard/>
            </div>
        );
    }
};
const useStyles = makeStyles({
    root: {
      minWidth: 275,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  });
function SimpleCard() {
    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;

    return (
        <Card variant='outlined'>
            <CardContent>
                <Typography color='textSecondary' gutterBottom>
                    Word of the Day
                </Typography>
                <Typography variant='h5' component='h2'>
                    be{bull}nev{bull}o{bull}lent
                </Typography>
                <Typography color='textSecondary'>
                    adjective
                </Typography>
                <Typography variant='body2' component='p'>
                    well meaning and kindly.
                    <br />
                    {'"a benevolent smile"'}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size='small'>Learn More</Button>
            </CardActions>
        </Card>
    );
}

const recipeStyle = makeStyles((theme) => 
    createStyles({
        root: {
            maxWidth: 345,
        },
        media: {
            height: 0,
            paddingTop: '56.25%',
        },
        expand: {
            transform: 'rotate(0deg)',
            marginLeft: 'auto',
            transition: theme.transitions.create('transform', {
                duration: theme.transitions.duration.shortest,
            }),
        },
        expandOpen: {
            transform: 'rotate(180deg)',
        },
        avatar: {
            backgroundColor: red[500],
        }
    })
)

function RecipeReviewCard() {
    const classes = recipeStyle();
    const [expanded, setExpanded] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState<null|HTMLElement>(null);
    const [open, setOpen] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null);
    }

    const handleDialogOpen = () => {
        setOpen(true);
    }

    const handleDialogClose = () => {
        setOpen(false);
    }

    return (
        <Card className={classes.root} variant='outlined'>
            <Menu
                id='simple-menu'
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
            <Dialog
            open={open}
            onClose={handleDialogClose}>
                <DialogTitle>Use Google's location service?</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Let Google help apps determine location. This means sending anonymous location data to
                        Google, even when no apps are running.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} color='primary'>Disagree</Button>
                    <Button onClick={handleDialogClose} color='primary'>Agree</Button>
                </DialogActions>
            </Dialog>
            <CardHeader
                avatar={
                    <Avatar className={classes.avatar} aria-label='recipe'>R</Avatar>
                }
                action={
                    <IconButton aria-label='settings' aria-controls='simple-menu' aria-haspopup='true' onClick={handleMenuClick}>
                        <MoreVert />
                    </IconButton>
                }
                title='Shrimp and Chorizo Paella'
                subheader='September 14, 2016'
            />
            <CardMedia
                className={classes.media}
                image='/images/cards/pealla.jpg'
                title='Pealla dish'
            />
            <CardContent>
                <Typography variant='body2' color='textSecondary' component='p'>
                    This impressive pealla is a perfect party dish and a fun meal to cook together with your
                    guests. Add 1 cup lf frozen peas along with the mussels, if you like.
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label='add to favorites' onClick={handleDialogOpen}>
                    <Favorite />
                </IconButton>
                <IconButton aria-label='share'>
                    <Share />
                </IconButton>
                <IconButton
                    className={clsx(classes.expand,
                        expanded && classes.expandOpen
                    )}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label='show more'
                >
                    <ExpandMore />
                </IconButton>
            </CardActions>
            <Collapse in={expanded} timeout='auto' unmountOnExit>
                <CardContent>
                    <Typography paragraph>Method:</Typography>
                    <Typography paragraph>
                        Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10
                        minutes.
                    </Typography>
                    <Typography paragraph>
                        Heat oil in a (14- to 16-inch) pealla pan or a large, deep skillet over medium-high
                        heat. Add chicken, shrimp and chorizo, and cook, strring occasionally until lightly
                        browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving chicken
                        and chorizo in the pan. Add pimenton, bay leaves, garlic, tomatoes, onion, salt and
                        saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
                    </Typography>
                    <Typography paragraph>
                        Add rice and stir very gently to distribute. Top with artichokes and peppers, and cook
                        without stirring, until most of the liquid is absorbed, 15 to 18 minutes. Reduce heat to
                        medium-low, add reserved shrimp and mussels, tucking them down into the rice, and cook
                        again without stirring, until mussels have opened and rice is just tender, 5 to 7
                        minutes more. (Discard any mussels that don't open.)
                    </Typography>
                    <Typography>
                        Set aside off of the heat to let rest for 10 minutes, and then serve.
                    </Typography>
                </CardContent>
            </Collapse>
        </Card>
    )
}
