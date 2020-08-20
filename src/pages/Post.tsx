import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Paper } from '@material-ui/core';

interface Params {
    id?: string;
}
export default class Post extends React.Component<RouteComponentProps<Params>> {
    render() {
        const { match } = this.props;
        return (
            <Paper variant='outlined'>
                포스트 {match.params.id}
            </Paper>
        )
    }
}