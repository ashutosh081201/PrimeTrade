
import { Typography, Container, Grid, Paper, Box } from '@mui/material';
import { jwtDecode } from "jwt-decode";
import Notes from '../components/Notes';

const Dashboard = () => {
  const token = localStorage.getItem('token');
  let userName = 'User';

  if (token) {
    const decodedToken = jwtDecode(token);
    userName = decodedToken.user.name;
  }

  return (
    <Box sx={{ flexGrow: 1, backgroundColor: '#f4f6f8', minHeight: 'calc(100vh - 64px)', p: 3 }}>
      <Container maxWidth="lg">
        {/* Welcome Section */}
        <Paper 
          elevation={3}
          sx={{
            p: 4, 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
            color: 'white',
            mb: 4
          }}
        >
          <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
            Welcome, {userName}!
          </Typography>
          <Typography variant="subtitle1">
            Here are your latest notes. Stay organized and productive.
          </Typography>
        </Paper>

        {/* Notes Section */}
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Typography variant="h4" component="h2" sx={{ fontWeight: 'bold', color: '#333', display: 'inline-block' }}>
            My Notes
          </Typography>
        </Box>
        
        <Notes />
      </Container>
    </Box>
  );
};

export default Dashboard;
