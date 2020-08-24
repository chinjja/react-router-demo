import React from 'react';
import axios from 'axios';
import { Typography, Button, Paper } from '@material-ui/core';
import {} from '@material-ui/icons';
import ws from 'websocket';
import { DeleteDialog, CreateDialog } from '../dialogs';

const apiUrl = 'http://localhost:8888';
const wsUrl = 'ws://localhost:8888/rooms';

const api = axios.create({
    baseURL: apiUrl,
    timeout: 1000
});

export interface RoomData {
    id: string;
    title: string;
}
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

    async fetchData() {
        return api.get<RoomData[]>('/rooms');
    }

    async updateData() {
        const res = await this.fetchData();
        this.setState({
            status: res.status,
            rooms: res.data,
        });
    }

    async deleteData(id: string) {
        return api.delete('/rooms/'+id);
    }

    async createData(title: string) {
        return api.post('/rooms', {
            title: title
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
        await this.deleteData(room.id);
        await this.updateData();
        this.setOpenDelete(false);
    }

    async handleCreate(title: string) {
        console.log('handle create ' + title);
        await this.createData(title);
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