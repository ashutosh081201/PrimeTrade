const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');
const Profile = require('../models/Profile');

// @route   GET api/profile/me
// @desc    Get current user's profile
// @access  Private
router.get('/me', auth, async (req, res) => {
  try {
    console.log('User ID:', req.user.id);
    // Fetch user and profile in parallel
    const [user, profile] = await Promise.all([
      User.findById(req.user.id).select('-password'),
      Profile.findOne({ user: req.user.id })
    ]);

    console.log('User:', user);
    console.log('Profile:', profile);

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Always return a consistent object shape
    res.json({ user, profile: profile || null });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/profile
// @desc    Create or update user's profile
// @access  Private
router.post('/', auth, async (req, res) => {
    const { bio, location, website } = req.body;

    const profileFields = {};
    profileFields.user = req.user.id;
    if (bio) profileFields.bio = bio;
    if (location) profileFields.location = location;
    if (website) profileFields.website = website;

    try {
        let profile = await Profile.findOne({ user: req.user.id });

        if (profile) {
            // Update
            profile = await Profile.findOneAndUpdate(
                { user: req.user.id },
                { $set: profileFields },
                { new: true }
            );
        } else {
            // Create
            profile = new Profile(profileFields);
            await profile.save();
        }
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
