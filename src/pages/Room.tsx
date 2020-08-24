import React from 'react';
import { Typography, Button, Paper } from '@material-ui/core';
import {} from '@material-ui/icons';
import ws from 'websocket';
import { DeleteDialog, CreateDialog } from '../dialogs';
import api, { RoomData } from '../api/rooms';
 
const wsUrl = 'ws://localhost:8888/rooms';

interface RoomState {
    status?: number;
    rooms?: RoomData[];
    openDelete?: boolean;
    openCreate?: boolean;
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

    async updateData() {
        const res = await api.load();
        this.setState({
            status: res.status,
            rooms: res.data,
        });
    }

    setOpenDelete(visible = false) {
        this.setState({
            openDelete: visible
        });
    }

    setOpenCreate(visible = false) {
        this.setState({
            openCreate: visible
        });
    }

    async handleDelete(room: RoomData) {
        await api.remove(room.id);
        await this.updateData();
        this.setOpenDelete(false);
    }

    async handleCreate(title: string) {
        console.log('handle create ' + title);
        await api.create(title);
        await this.updateData();
        this.setOpenCreate(false);
    }

    render() {
        const { status, rooms, openDelete, openCreate, selectedRoom } = this.state || {};
        const items = rooms?.map((room)=>(
            <Paper
                key={room.id}
                variant='outlined'
                onClick={()=>{
                    this.setState({
                        selectedRoom: room
                    });
                }}
                style={{
                    margin: 8,
                    padding: 8
                }}
            >
                <Typography>ID: {room.id}</Typography>
                <Typography>Title: {room.title}</Typography>
                <Button
                    variant='outlined'
                    onClick={()=>this.setOpenDelete(true)}
                >
                    Delete
                </Button>
            </Paper>
        ));
        return (
            <Paper
                style={{
                    margin: 8,
                    padding: 8
                }}
            >
                <Typography>Status: {status}</Typography>
                <Button
                    variant='outlined'
                    onClick={()=>this.updateData()}
                >
                    Refresh
                </Button>
                <Button
                    variant='outlined'
                    onClick={()=>this.setOpenCreate(true)}
                >
                    Create
                </Button>
                {items}
                <DeleteDialog
                    open={openDelete || false}
                    onCommit={(room)=>this.handleDelete(room)}
                    onClose={()=>this.setOpenDelete(false)}
                    selected={selectedRoom}
                />
                <CreateDialog
                    open={openCreate || false}
                    onCommit={(title)=>this.handleCreate(title)}
                    onClose={()=>this.setOpenCreate(false)}
                />
            </Paper>
        );
    }
}