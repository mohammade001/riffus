const axios = require('axios');
const Song = require('../models/Song');
const User = require('../models/User');
const Order = require('../models/Order');

// @desc    Get all songs
// @route   GET /api/songs
// @access  Public
const getSongs = async (req, res) => {
    try {
        const songs = await Song.find({});
        res.json(songs);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get recently played songs
// @route   GET /api/songs/recent
// @access  Public
const getRecentlyPlayed = async (req, res) => {
    try {
        const songs = await Song.find().sort({ lastPlayed: -1 }).limit(10);
        res.json(songs);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch recent songs' });
    }
};

// @desc    Get recommended songs
// @route   GET /api/songs/recommended
// @access  Public
const getRecommended = async (req, res) => {
    try {
        // For now, recommendation is based on most played songs.
        // A better approach would be to recommend based on user's listening history.
        const songs = await Song.find().sort({ playCount: -1 }).limit(10);
        res.json(songs);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch recommended songs' });
    }
}

module.exports = {
    getSongs,
    getRecentlyPlayed,
    getRecommended,
};
