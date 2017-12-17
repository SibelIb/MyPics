import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Photos} from '../resources/data/photos';
import { AuthService } from 'aurelia-auth';

@inject(Router, Photos, AuthService)
export class PhotoGallery {
  constructor(router, photo, auth) {
    this.photo = photo;
    this.router = router;
    this.auth = auth;
    this.gallery = JSON.parse(sessionStorage.getItem('gallery'));
    this.editPhoto2 = JSON.parse(sessionStorage.getItem('photo'));
    this.showPhotos = true;
    this.PHOTO_SERVICE = 'photos'
  }

  async savePhoto() { {
    this.photoObj = {
      _id: this.photo._id,
      galleryId: this.gallery._id
    };
  }   
    if (this.photoObj) {
      let response = await this.photo.save(this.photoObj);
      if (response.error) {
        alert('There was an error uploading the photo');
      } else {
        var photoId = response._id;
        var galleryId = response.galleryId;
        if (this.filesToUpload && this.filesToUpload.length) {
          await this.photo.uploadFile(this.filesToUpload, galleryId,  photoId);
          this.filesToUpload = [];
        }
      }
    }
    this.showPhotos = true;
    this.photo.getUserPhoto(this.gallery._id);
  }

  /*async uploadFile(files, userId, photoId) {
    let formData = new FormData();
    files.forEach((item, index) => {
      formData.append("file" + index, item);
    });
    let response = await this.data.uploadFiles(formData, this.PHOTO_SERVICE + "/upload/" + userId + "/" + photoId);
    return response;
  }


 async save(todo) {
    if (photo) {
      if (!photo._id) {
        let response = await this.data.post(photo, this.PHOTO_SERVICE);
        if (!response.error) {
          this.todosArray.push(response);
        }
        return response;
      } else {
        let response = await this.data.put(photo, this.PHOTO_SERVICE + "/" + photo._id);
        if (!response.error) {
//this.updateArray(response);
        }
        return response;
      }
    }
  }*/

  async activate() {
    await this.photo.getUserPhoto(this.gallery._id);
  }

  changeFiles() {
    this.filesToUpload = new Array();
    this.filesToUpload.push(this.files[0]);
  }

  removeFile(index) {
    this.filesToUpload.splice(index, 1);
  }

  deletePhoto(photo) {
      this.photo.deletePhoto(photo._id);
  }

  editPhoto(photo) {
    this.photoObj2 = photo;
    this.showPhotos = false;
  }

  async saveEditedPhoto() {
    if (this.photoObj2) {
      let response = await this.photo.saveEdited(this.photoObj2);
      if (response.error) {
        alert('There was an error updating the photo details');
      } else {
              }
    }
    this.showPhotos = true;
  }
  back() {
    this.router.navigate('gallery');
  }

  back2() {
    this.showPhotos = true;
  }
}
