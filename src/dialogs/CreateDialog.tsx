import React from 'react';
import { Dialog, DialogProps, DialogTitle, DialogActions, DialogContent, Button, DialogContentText, TextField, InputProps } from '@material-ui/core';

interface CreateDialogProps extends DialogProps {
    onCommit(title: string): void;
    onClose(): void;
}

export default class CreateDialog extends React.Component<CreateDialogProps> {
    title = React.createRef<InputProps>();

    render() {
        return (
            <Dialog {...this.props}>
                <DialogTitle>Creating the room</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Enter title of room
                    </DialogContentText>
                    <TextField label='Title' fullWidth autoFocus inputRef={this.title}/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={()=>this.props.onCommit((this.title.current?.value as string).trim())}>
                        Create
                    </Button>
                    <Button onClick={()=>this.props.onClose()}>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}