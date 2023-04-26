import { Container, Box, Paper } from "@mui/material";
import './Layout.css';


const Layout = (props) => {
    return (
        <Box className="bg">
            <Container>
                <Paper elevation={3} className="bg-section">
                    {props.children}
                </Paper>
            </Container>
        </Box>
    )
}

export default Layout;