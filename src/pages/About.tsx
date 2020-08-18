import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import queryString from 'query-string'

interface Args {
    name?: string
}

export default class About extends React.Component<RouteComponentProps<Args>> {
    render() {
        const { location, match } = this.props;
        const query = queryString.parse(location.search);
        const detail = query.detail === 'true';
        
        return (
            <div>
                <h2>About {match.params.name}</h2>
                {detail && 'detail: blahblah'}
            </div>
        );
    }
}
// const About: React.FC<RouteComponentProps<Args>> = ({location, match}) => {
//     const query = queryString.parse(location.search);
//     const detail = query.detail === 'true';

//     return (
//         <div>
//             <h2>About {match.params.name}</h2>
//             {detail && 'detail: blahblah'}
//         </div>
//     );
// };

// export default About;