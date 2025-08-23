const { themeModel } = require('../models');
const { editPost } = require('./postController');

function getThemes(req, res, next) {
    themeModel.find()
        .populate('userId')
        .then(themes => res.json(themes))
        .catch(next);
}

function getTheme(req, res, next) {
    const { themeId } = req.params;

    themeModel.findById(themeId)
        .populate({
            path : 'posts',
            populate : {
              path : 'userId'
            }
          })
        .then(theme => res.json(theme))
        .catch(next);
}

function createTheme(req, res, next) {
    const { title,author,description,imageUrl,creatorId } = req.body;
    

    themeModel.create({ title,author,description,imageUrl,creatorId })
        .then(theme => {
            res.send(theme)
        })
        .catch(next);
}

function subscribe(req, res, next) {
    const themeId = req.params.themeId;
    const { _id: userId } = req.user;
    themeModel.findByIdAndUpdate({ _id: themeId }, { $addToSet: { subscribers: userId } }, { new: true })
        .then(updatedTheme => {
            res.status(200).json(updatedTheme)
        })
        .catch(next);
}
function deleteTheme(req, res, next) {
    const {bookId} = req.body;
    themeModel.findByIdAndDelete(bookId)
        .then(deletedTheme => {
            if (!deletedTheme) {
                return res.status(404).json({ message: 'Theme not found' });
            }
            res.status(200).json({ message: 'Theme deleted successfully' });
        })
        .catch(next);
    
}

async function detailsTheme(req, res, next) {
    const { bookId } = req.params;
  
    if (!bookId) {
      return res.status(400).json({ message: 'Missing bookId parameter' });
    }
  
    try {
      const theme = await themeModel.findById(bookId);
  
      if (!theme) {
        return res.status(404).json({ message: 'Theme not found' });
      }
  
      res.status(200).json(theme);
    } catch (err) {
      next(err);
    }
  }
  


module.exports = {
    getThemes,
    createTheme,
    getTheme,
    editPost,
    subscribe,
    deleteTheme,
    detailsTheme
}
