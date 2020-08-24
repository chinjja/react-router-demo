import React from 'react';
import axios from 'axios';
import { Typography, Button, Paper, Dialog, DialogActions, DialogTitle, DialogContent } from '@material-ui/core';
import {} from '@material-ui/icons';
import ws from 'websocket';

const apiUrl = 'http://localhost:8888';
const wsUrl = 'ws://localhost:8888/rooms';

const api = axios.create({
    baseURL: apiUrl,
    timeout: 1000
});

interface RoomData {
    id?: string;
    title?: string;
}
interface RoomState {
    status?: number;
    rooms?: RoomData[];
    open?: boolean;
    selectedRoom?: RoomData;
}

export default class Room extends React.Component<{}, RoomState> {
    client?: ws.w3cwebsocket;

    componentDidMount() {
        this.updateData();
        this.client = new ws.w3cwebsocket(wsUrl);
        this.client.onmessage = (e) => {
            this.updateData();
        }
    }

    componentWillUnmount() {
        this.client?.close(1000, `Room's component will unmount`);
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

    deleteRoom(id: string) {
        console.log('id? ' + id);
        api.delete('/rooms/'+id).then(() => {
            this.updateData();
        })
    }

    setOpen(visible = false) {
        this.setState({
            open: visible
        });
    }

    render() {
        const { status, rooms, open, selectedRoom } = this.state || {};
        const items = rooms?.map((room)=>(
            <Paper key={room.id} variant='outlined' onClick={()=>{
                this.setState({
                    selectedRoom: room
                });
            }}>
                <Typography>ID: {room.id}</Typography>
                <Typography>Title: {room.title}</Typography>
                <Button
                    variant='outlined'
                    onClick={()=>this.setOpen(true)}
                >
                    Delete
                </Button>
            </Paper>
        ));
        return (
            <Paper variant='outlined'>
                <Typography>Status: {status}</Typography>
                <Button
                    variant='outlined'
                    onClick={()=>this.updateData()}
                >
                    Refresh
                </Button>
                {items}
                <Dialog open={open || false} onClose={()=>this.setOpen(false)}>
                    <DialogTitle>Deleting the room</DialogTitle>
                    <DialogContent>Do you want to delete a {selectedRoom?.title} [{selectedRoom?.id}]</DialogContent>
                    <DialogActions>
                        <Button onClick={()=>{
                            this.deleteRoom(selectedRoom?.id!);
                            this.setOpen(false);
                        }}>
                            YES
                        </Button>
                        <Button onClick={()=>this.setOpen(false)}>NO</Button>
                    </DialogActions>
                </Dialog>
            </Paper>
        );
    }
}