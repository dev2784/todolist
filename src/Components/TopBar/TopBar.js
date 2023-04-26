import { AppBar, Toolbar } from '@mui/material';
import { styled } from '@mui/material/styles';
const TopBar = (props) => {
    const StyledToolbar = styled(Toolbar)(({ theme }) => ({
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
      }));
    return (
        <AppBar position="static" color="transparent">
                <StyledToolbar>
                    {props.children}
                </StyledToolbar>
        </AppBar>
    )
}

export default TopBar;