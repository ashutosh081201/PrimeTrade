import { useState, useEffect } from 'react';
import {
  Button,
  TextField,
  Typography,
  Container,
  Avatar,
  Box,
  Paper,
  CircularProgress,
  Grid,
  CardActions
} from '@mui/material';
import axios from 'axios';
import { PhotoCamera } from '@mui/icons-material';
import { jwtDecode } from 'jwt-decode';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    bio: '',
    location: '',
    website: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfileData = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          // Decode user info from token
          const decodedToken = jwtDecode(token);
          setUser(decodedToken.user);

          // Fetch existing profile data
          const res = await axios.get('/api/profile/me', {
            headers: { 'x-auth-token': token },
          });

          if (res.data && res.data.profile) {
            setFormData({
              bio: res.data.profile.bio || '',
              location: res.data.profile.location || '',
              website: res.data.profile.website || '',
            });
          }
        } catch (err) {
          // If profile fetch fails, we assume one doesn't exist and the user can create one.
          // The form will be empty.
          console.error("Couldn't fetch profile data. It might not exist yet.", err.message);
        } finally {
          setLoading(false);
        }
      } else {
          setLoading(false);
      }
    };

    loadProfileData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('/api/profile', formData, {
        headers: { 'x-auth-token': token },
      });
      alert('Profile Updated');
    } catch (err) {
      console.error('Error updating profile:', err);
      alert('Failed to update profile.');
    }
  };

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (!user) {
    return (
      <Typography sx={{ textAlign: 'center', mt: 5 }}>
        You must be logged in to view this page.
      </Typography>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Avatar
                        sx={{ width: 150, height: 150, mb: 2 }}
                        src={user.profileImage || '/default-avatar.png'}
                    />
                     <input
                        accept="image/*"
                        style={{ display: 'none' }}
                        id="raised-button-file"
                        multiple
                        type="file"
                      />
                      <label htmlFor="raised-button-file">
                        <Button variant="text" component="span" startIcon={<PhotoCamera />}>
                          Upload
                        </Button>
                      </label>
                    <Typography variant="h5" component="h1" gutterBottom>
                        {user.name}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        {user.email}
                    </Typography>
                </Paper>
            </Grid>
            <Grid item xs={12} md={8}>
                <Paper sx={{ p: 2 }}>
                    <Typography variant="h6" component="h2" gutterBottom>
                        Edit Profile
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Bio"
                            name="bio"
                            value={formData.bio}
                            onChange={handleChange}
                            fullWidth
                            multiline
                            rows={4}
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            label="Location"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            fullWidth
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            label="Website"
                            name="website"
                            value={formData.website}
                            onChange={handleChange}
                            fullWidth
                            sx={{ mb: 2 }}
                        />
                        <CardActions>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                            >
                                Save Changes
                            </Button>
                        </CardActions>
                    </form>
                </Paper>
            </Grid>
        </Grid>
    </Container>
  );
};

export default Profile;
