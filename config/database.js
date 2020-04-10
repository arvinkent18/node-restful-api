const mongoose = require('mongoose');

const database = process.env.MONGO_ATLAS_URL;

const connectToDatabase = async () => {
  try {
    await mongoose.connect(database, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error(err.stack);
    process.exit();
  }
};

module.exports = connectToDatabase;
