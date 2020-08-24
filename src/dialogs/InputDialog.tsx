import React from 'react';
import { Dialog, DialogProps, DialogTitle, DialogActions, DialogContent, Button, DialogContentText, TextField, InputProps } from '@material-ui/core';

interface InputDialogProps extends DialogProps {
    title?: string;
    content?: string;
    hint?: string;
    initValue?: string;
    commitText?: string;
    cancelText?: string;
    onCommit(value: string): void;
    onCancel(): void;
}

export default class InputDialog extends React.Component<InputDialogProps> {
    title = React.createRef<InputProps>();
    
    render() {
        const { title, content, hint, commitText, cancelText, initValue} = this.props;
        return (
            <Dialog {...this.props}>
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {content}
                    </DialogContentText>
                    <TextField
                        label={hint}
                        inputRef={this.title}
                        value={initValue}
                        fullWidth
                        autoFocus
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={()=>this.props.onCommit((this.title.current?.value as string).trim())}>
                        {commitText || 'Commit'}
                    </Button>
                    <Button onClick={()=>this.props.onCancel()}>
                        {cancelText || 'Cancel'}
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}