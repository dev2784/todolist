import { Box, Collapse, IconButton, Alert } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useEffect } from "react";
const AlertBox = (props) => {
    useEffect(() => {
        if(props.open){
            setTimeout(() => {
                props.setOpen(false)
            },3000);
        }
    },[props])
    return (
        <Box sx={{ width: '100%' }}>
            <Collapse in={props.open}>
                <Alert
                action={
                    <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                        props.setOpen(false);
                    }}
                    >
                    <CloseIcon fontSize="inherit" />
                    </IconButton>
                }
                sx={{ mb: 2 }}
                severity={props.severity}
                >
                {props.message}
            </Alert>
        </Collapse>
        </Box>
    )
}
export default AlertBox;