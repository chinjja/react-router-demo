import React from 'react';
import { Typography, Button, Paper } from '@material-ui/core';
import {} from '@material-ui/icons';
import ws from 'websocket';
import { DeleteDialog, InputDialog } from '../dialogs';
import api, { RoomData } from '../api/rooms';
 
const wsUrl = 'ws://localhost:8888/rooms';

interface RoomState {
    status?: number;
    rooms?: RoomData[];
    openDelete?: boolean;
    openCreate?: boolean;
    openEdit?: boolean;
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

    setOpenEdit(visible = false) {
        this.setState({
            openEdit: visible
        });
    }

    async handleDelete(room: RoomData) {
        await api.remove(room.id);
        await this.updateData();
        this.setOpenDelete(false);
    }

    async handleCreate(title: string) {
        await api.create(title);
        await this.updateData();
        this.setOpenCreate(false);
    }

    async handleEdit(title: string) {
        const selected = this.state.selectedRoom;
        if(!selected) return;

        await api.update(selected.id, title);
        await this.updateData();
        this.setOpenEdit(false);
    }

    render() {
        const { status, rooms, openDelete, openCreate, openEdit, selectedRoom } = this.state || {};
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
                <Button
                    variant='outlined'
                    onClick={()=>this.setOpenEdit(true)}
                >
                    Edit
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
                <InputDialog
                    title='Creating the room'
                    content='Enter title of room'
                    commitText='Create'
                    hint='Title'
                    open={openCreate || false}
                    onCommit={(title)=>this.handleCreate(title)}
                    onCancel={()=>this.setOpenCreate(false)}
                />
                <InputDialog
                    title='Editing the room'
                    content='Edit title of room'
                    commitText='Rename'
                    hint='Title'
                    open={openEdit || false}
                    onCommit={(title)=>this.handleEdit(title)}
                    onCancel={()=>this.setOpenEdit(false)}
                />
            </Paper>
        );
    }
}