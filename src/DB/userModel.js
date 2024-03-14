const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema (
    {
        email: {
            type: String,
            required: true
        },

        password: {
            type: String,
            required: true,
        }
    }
)


// Pre-save hook to hash the password
userSchema.pre('save', function(next) {
    const user = this;
  
    // Only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();
  
    // Generate a salt
    bcrypt.genSalt(10, (err, salt) => {
      if (err) return next(err);
  
      // Hash the password using the salt
      bcrypt.hash(user.password, salt, (err, hash) => {
        if (err) return next(err);
  
        // Override the plaintext password with the hashed one
        user.password = hash;
        next();
      });
    });
  });
  
  // Method to compare password for login
  userSchema.methods.comparePassword = async function(candidatePassword) {
    try {
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
      return isMatch;
    } catch (err) {
      throw err;
    }
  };
  

const User = mongoose.model('User', userSchema)

module.exports = User;
