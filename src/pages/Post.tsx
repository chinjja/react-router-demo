import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

interface Params {
    id?: string;
}
export default class Post extends React.Component<RouteComponentProps<Params>> {
    render() {
        const { match } = this.props;
        return (
            <div>
                포스트 {match.params.id}
            </div>
        )
    }
}