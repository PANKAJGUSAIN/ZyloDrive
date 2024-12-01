const mongoose = require('mongoose');

// Schema for blacklisting token with TTL (Time-To-Live) of 24 hours
const blacklistTokenSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
      unique: true, // Ensures each token is unique in the collection
    },
    createdAt: {
      type: Date,
      default: Date.now, // Default to current time
    },
  },
  { timestamps: true }
);

// Create a TTL index to automatically delete documents after 24 hours (86400 seconds)
blacklistTokenSchema.index({ createdAt: 1 }, { expireAfterSeconds: 86400 });

const blacklistTokenModel = mongoose.model('BlacklistToken', blacklistTokenSchema , 'blacklistedtokens');

module.exports = blacklistTokenModel;