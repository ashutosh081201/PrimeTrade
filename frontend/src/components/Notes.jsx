
import { useState, useEffect } from 'react';
import { 
    Grid, 
    Card, 
    CardContent, 
    CardActions, 
    Typography, 
    Button, 
    IconButton, 
    TextField, 
    Collapse, 
    Box,
    Paper
} from '@mui/material';
import { Edit, Delete, Add } from '@mui/icons-material';
import axios from 'axios';

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [currentNoteId, setCurrentNoteId] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('/api/notes', {
          headers: { 'x-auth-token': token }
        });
        setNotes(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchNotes();
  }, []);

  const handleAddNote = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post('/api/notes', { title, content }, {
        headers: { 'x-auth-token': token }
      });
      setNotes([...notes, res.data]);
      setTitle('');
      setContent('');
      setOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateNote = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.put(`/api/notes/${currentNoteId}`, { title, content }, {
        headers: { 'x-auth-token': token }
      });
      setNotes(notes.map(note => (note._id === currentNoteId ? res.data : note)));
      setTitle('');
      setContent('');
      setEditMode(false);
      setCurrentNoteId(null);
      setOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteNote = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/notes/${id}`, {
        headers: { 'x-auth-token': token }
      });
      setNotes(notes.filter(note => note._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (note) => {
    setEditMode(true);
    setCurrentNoteId(note._id);
    setTitle(note.title);
    setContent(note.content);
    setOpen(true);
  };

  const handleCancel = () => {
    setTitle('');
    setContent('');
    setEditMode(false);
    setCurrentNoteId(null);
    setOpen(false);
  };

  return (
    <>
        <Box sx={{ mb: 3 }}>
            <Button 
                variant="contained"
                startIcon={<Add />} 
                onClick={() => setOpen(!open)}
                sx={{ 
                    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
                    color: 'white',
                    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
                    borderRadius: 3,
                    p: '10px 20px'
                }}
            >
                {open ? 'Cancel' : 'Add a New Note'}
            </Button>
            <Collapse in={open}>
                <Paper elevation={4} sx={{ mt: 2, p: 3 }}>
                    <TextField
                        label="Title"
                        variant="outlined"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        fullWidth
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="Content"
                        variant="outlined"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        fullWidth
                        multiline
                        rows={4}
                        sx={{ mb: 2 }}
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button onClick={handleCancel} sx={{ mr: 1 }}>Cancel</Button>
                        <Button onClick={editMode ? handleUpdateNote : handleAddNote} variant="contained">{editMode ? 'Update Note' : 'Add Note'}</Button>
                    </Box>
                </Paper>
            </Collapse>
        </Box>
        <Grid container spacing={4}>
            {notes.map(note => (
                <Grid item key={note._id} xs={12} sm={6} md={4}>
                    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', borderRadius: 2, boxShadow: 3 }}>
                        <CardContent sx={{ flexGrow: 1 }}>
                            <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold', mb: 1 }}>
                                {note.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                                {note.content}
                            </Typography>
                        </CardContent>
                        <CardActions sx={{ justifyContent: 'flex-end' }}>
                            <IconButton size="small" onClick={() => handleEdit(note)} color="primary"><Edit /></IconButton>
                            <IconButton size="small" onClick={() => handleDeleteNote(note._id)} color="error"><Delete /></IconButton>
                        </CardActions>
                    </Card>
                </Grid>
            ))}
        </Grid>
    </>
  );
};

export default Notes;
