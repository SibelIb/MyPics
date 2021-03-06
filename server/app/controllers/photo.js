var express = require('express');
var router = express.Router();
var logger = require('../../config/logger');
var mongoose = require('mongoose'),
Photo = mongoose.model('Photo');
var multer = require('multer');
var mkdirp = require('mkdirp');



module.exports = function (app, config) {
    app.use('/api', router);


// Post a photo
router.post('/gallery/photo/', function (req, res, next) {
        console.log('Create a Photo', 'verbose');
        var photo = new Photo(req.body);
        photo.save()
            .then(result => {
                res.status(201).json(result);
            })
            .catch(err => {
                return next(err);
            });
    });


// Upload a photo
var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            var path = config.uploads + "/" + req.params.galleryId + "/";
            mkdirp(path, function (err) {
                if (err) {
                    res.status(500).json(err);
                } else {
                    cb(null, path);
                }
            });
        },
        filename: function (req, file, cb) {
            let fileName = file.originalname.split('.');
            cb(null, fileName[0] + new Date().getTime() + "." + fileName[fileName.length - 1]);
        }
    });

var upload = multer({ storage: storage });

router.post('/gallery/upload/:galleryId/:photoId', upload.any(), function (req, res, next) {
        logger.log('Upload a photo ' + req.params.photoId, 'verbose');
Photo.findById(req.params.photoId, function (err, photo) {
            if (err) {
                return next(err);
            } else {
                console.log(photo);
                if (req.files) {
                    photo.file = {
                        filename: req.files[0].filename,
                        originalName: req.files[0].originalname,
                        dateUploaded: new Date()
                    };
                }
                photo.save()
                    .then(photo => {
                        res.status(200).json(photo);
                    })
                    .catch(error => {
                        return next(error);
                    });
            }
        });
    });


// Get all photos in a gallery for a user
router.get('/users/gallery/:galleryId', function (req, res, next) {
        logger.log('Get Photos in Gallery ' + req.params.galleryId, 'verbose');
        Photo.find({ galleryId: req.params.galleryId })
            .then(photo => {
                if (photo) {
                    res.status(200).json(photo);
                } else {
                    res.status(404).json({ message: "No Photo found" });
                }
            })
            .catch(error => {
                return next(error);
            });
    });


// GET a Photo Handler - Get a photo with id = photoId
router.get('/gallery/photo/:photoId', function(req, res, next){
        logger.log('Get photo ' + req.params.photoId, 'verbose');
        Todo.findById(req.params.photoId)                   // findById search for a document with an _id equal to the supplied value 
          .then(photo => {
            if(photo){
              res.status(200).json(photo);
            } else {
              res.status(404).json({message: "No photo found"});
            }
          })
         .catch(error => {
           return next(error);
          });
      }); 



// Update a photo
router.put('/gallery/photo/:photoId', function (req, res, next) {
        logger.log('Update Photo', + req.params.photoId, 'verbose');

        Photo.findOneAndUpdate({ _id: req.params.photoId }, req.body, { new: true, multi: false })
            .then(photo => {
                res.status(200).json(photo);
            })
            .catch(error => {
                return next(error);
            });
    });


// Delete a photo
router.delete('/photo/:photoId', function (req, res, next) {
        logger.log('Delete Photo ', + req.params.photoId, 'verbose');

        Photo.remove({ _id: req.params.photoId })
            .then(photo => {
                res.status(200).json({ msg: "Photo Deleted" });
            })
            .catch(error => {
                return next(error);
            });
    });

// Get all photos
/*router.get('/photo', function (req, res, next) {
    Photo.find()
        .then(results => {
            res.status(200).json(results);
        });
});  */


};

