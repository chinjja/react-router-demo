import React from 'react';
import { RoomData } from '../api/rooms';
import { Dialog, DialogProps, DialogTitle, DialogActions, DialogContent, Button } from '@material-ui/core';

interface DeleteDialogProps extends DialogProps {
    selected?: RoomData;
    onCommit(room: RoomData): void;
    onClose(): void;
}

export default class DeleteDialog extends React.Component<DeleteDialogProps> {
    render() {
        const { selected } = this.props;
        return (
            <Dialog {...this.props}>
                <DialogTitle>Deleting the room</DialogTitle>
                <DialogContent>Do you want to delete a {selected?.title} [{selected?.id}]</DialogContent>
                <DialogActions>
                    <Button onClick={()=> selected && this.props.onCommit(selected)}>
                        YES
                    </Button>
                    <Button onClick={() =>this.props.onClose()}>
                        NO
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}