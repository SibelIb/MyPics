import {inject} from 'aurelia-framework';
import {DataServices} from './data-services';
@inject(DataServices)
export class Photos {
  constructor(data) {
    this.data = data;
    this.PHOTO_SERVICE = 'photo';
    this.GALLERY_SERVICE = 'gallery';
    this.photoArray = [];
  }

  async save(photo) {
    if (photo) {
      if (!photo._id) {
        let response = await this.data.post(photo, this.GALLERY_SERVICE + "/" + this.PHOTO_SERVICE);
        if (!response.error) {
          this.photoArray.push(response);
        }
        return response;
      } else {
        let response = await this.data.put(photo, this.GALLERY_SERVICE + "/" + this.PHOTO_SERVICE + "/" + photo._id);
        if (!response.error) {
        }
        return response;
      }
    }
  }

  async uploadFile(files, galleryId, photoId) {
    let formData = new FormData();
    files.forEach((item, index) => {
      formData.append("file" + index, item);
    });
    let response = await this.data.uploadFiles(formData, this.GALLERY_SERVICE + "/upload/" + galleryId + "/" + photoId);
    return response;
  }

  async getUserPhoto(galleryId) {
    let response = await this.data.get("users/" + this.GALLERY_SERVICE + "/" + galleryId);
    if (!response.error && !response.message) {
      this.photoArray = response;
    }
  }

  async deletePhoto(id) {
    let response = await this.data.delete("photo" + "/" + id);
    if (!response.error) {
      for (let i = 0; i < this.photoArray.length; i++) {
        if (this.photoArray[i]._id === id) {
          this.photoArray.splice(i, 1);
        }
      }
    }
  }

  async saveEdited(photo) {
    if (photo) {
      let response = await this.data.put(photo, this.GALLERY_SERVICE + "/" + this.PHOTO_SERVICE + "/" + photo._id);
      if (!response.error) {
      }
      return response;
    }
  }
}
