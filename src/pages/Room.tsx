import React from 'react';
import axios from 'axios';
import { Typography, Button, Paper } from '@material-ui/core';
import {} from '@material-ui/icons';

const api = axios.create({
    baseURL: 'http://localhost:8888',
    timeout: 1000
});

interface RoomData {
    id?: string;
    title?: string;
}
interface RoomState {
    status?: number;
    rooms?: RoomData[];
}

export default class Room extends React.Component<{}, RoomState> {
    componentDidMount() {
        this.updateData();
    }

    async fetchData() {
        return api.get<RoomData[]>('/rooms');
    }

    updateData() {
        this.fetchData().then((res) => {
            console.log(res.data);
            this.setState({
                status: res.status,
                rooms: res.data,
            });
        });
    }

    render() {
        const { status, rooms } = this.state || {};
        const items = rooms?.map((room)=>(
            <Paper key={room.id} variant='outlined'>
                <Typography>ID: {room.id}</Typography>
                <Typography>Title: {room.title}</Typography>
            </Paper>
        ));
        return (
            <Paper variant='outlined'>
                <Typography>Status: {status}</Typography>
                <Button onClick={()=>this.updateData()}>Refresh</Button>
                {items}
            </Paper>
        );
    }
}