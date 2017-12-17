define('app',['exports', 'aurelia-auth'], function (exports, _aureliaAuth) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.App = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var App = exports.App = function () {
    function App() {
      _classCallCheck(this, App);
    }

    App.prototype.configureRouter = function configureRouter(config, router) {
      this.router = router;
      config.addPipelineStep('authorize', _aureliaAuth.AuthorizeStep);
      config.map([{
        route: ['', 'home'],
        moduleId: './modules/home',
        name: 'Home'
      }, {
        route: 'gallery',
        moduleId: './modules/gallery',
        name: 'Gallery',
        auth: true
      }, {
        route: 'photos',
        moduleId: './modules/photos',
        name: 'Photos',
        auth: true
      }]);
    };

    return App;
  }();
});
define('auth-config',['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    var authConfig = {
        baseUrl: "http://localhost:5000/api",
        loginUrl: '/users/login',
        tokenName: 'token',
        authHeader: 'Authorization',
        authToken: '',
        logoutRedirect: '#/home'
    };

    exports.default = authConfig;
});
define('environment',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    debug: true,
    testing: true
  };
});
define('main',['exports', './environment', 'regenerator-runtime', './auth-config'], function (exports, _environment, _regeneratorRuntime, _authConfig) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;

  var _environment2 = _interopRequireDefault(_environment);

  var _regeneratorRuntime2 = _interopRequireDefault(_regeneratorRuntime);

  var _authConfig2 = _interopRequireDefault(_authConfig);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  window.regeneratorRuntime = _regeneratorRuntime2.default;

  function configure(aurelia) {
    aurelia.use.standardConfiguration().plugin('aurelia-auth', function (baseConfig) {
      baseConfig.configure(_authConfig2.default);
    }).feature('resources');

    if (_environment2.default.debug) {
      aurelia.use.developmentLogging();
    }

    if (_environment2.default.testing) {
      aurelia.use.plugin('aurelia-testing');
    }

    aurelia.start().then(function () {
      return aurelia.setRoot();
    });
  }
});
define('modules/gallery',['exports', 'aurelia-framework', 'aurelia-router', '../resources/data/gallery', 'aurelia-auth'], function (exports, _aureliaFramework, _aureliaRouter, _gallery, _aureliaAuth) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.GalleryList = undefined;

  function _asyncToGenerator(fn) {
    return function () {
      var gen = fn.apply(this, arguments);
      return new Promise(function (resolve, reject) {
        function step(key, arg) {
          try {
            var info = gen[key](arg);
            var value = info.value;
          } catch (error) {
            reject(error);
            return;
          }

          if (info.done) {
            resolve(value);
          } else {
            return Promise.resolve(value).then(function (value) {
              step("next", value);
            }, function (err) {
              step("throw", err);
            });
          }
        }

        return step("next");
      });
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var GalleryList = exports.GalleryList = (_dec = (0, _aureliaFramework.inject)(_aureliaRouter.Router, _gallery.Gallery, _aureliaAuth.AuthService), _dec(_class = function () {
    function GalleryList(router, gallery, auth) {
      _classCallCheck(this, GalleryList);

      this.gallery = gallery;
      this.router = router;
      this.auth = auth;
      this.user = JSON.parse(sessionStorage.getItem('user'));
      this.title = "These are the galleries!";
      this.showGallery = true;
    }

    GalleryList.prototype.logout = function logout() {
      sessionStorage.removeItem('user');
      this.auth.logout();
      this.router.navigate('home');
    };

    GalleryList.prototype.createGallery = function createGallery() {
      this.galleryObj = {
        gallery: '',
        description: '',
        userId: this.user._id
      };
      this.showGallery = false;
    };

    GalleryList.prototype.saveGallery = function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        var response;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!this.galleryObj) {
                  _context.next = 5;
                  break;
                }

                _context.next = 3;
                return this.gallery.save(this.galleryObj);

              case 3:
                response = _context.sent;

                if (response.error) {
                  alert('There was an error creating the Gallery');
                } else {}

              case 5:
                this.showGallery = true;
                this.gallery.getUserGallery(this.user._id);

              case 7:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function saveGallery() {
        return _ref.apply(this, arguments);
      }

      return saveGallery;
    }();

    GalleryList.prototype.activate = function () {
      var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.gallery.getUserGallery(this.user._id);

              case 2:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function activate() {
        return _ref2.apply(this, arguments);
      }

      return activate;
    }();

    GalleryList.prototype.editGallery = function editGallery(gallery) {
      this.galleryObj = gallery;
      this.showGallery = false;
    };

    GalleryList.prototype.deleteGallery = function deleteGallery(gallery) {
      this.gallery.deleteGallery(gallery._id);
    };

    GalleryList.prototype.back = function back() {
      this.showGallery = true;
    };

    GalleryList.prototype.showGalleryOrAdd = function showGalleryOrAdd(gallery) {
      sessionStorage.setItem("gallery", JSON.stringify(gallery));
      this.router.navigate('photos');
    };

    return GalleryList;
  }()) || _class);
});
define('modules/home',['exports', 'aurelia-framework', 'aurelia-router', '../resources/data/users', 'aurelia-auth'], function (exports, _aureliaFramework, _aureliaRouter, _users, _aureliaAuth) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Home = undefined;

  function _asyncToGenerator(fn) {
    return function () {
      var gen = fn.apply(this, arguments);
      return new Promise(function (resolve, reject) {
        function step(key, arg) {
          try {
            var info = gen[key](arg);
            var value = info.value;
          } catch (error) {
            reject(error);
            return;
          }

          if (info.done) {
            resolve(value);
          } else {
            return Promise.resolve(value).then(function (value) {
              step("next", value);
            }, function (err) {
              step("throw", err);
            });
          }
        }

        return step("next");
      });
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Home = exports.Home = (_dec = (0, _aureliaFramework.inject)(_aureliaRouter.Router, _users.Users, _aureliaAuth.AuthService), _dec(_class = function () {
    function Home(router, users, auth) {
      _classCallCheck(this, Home);

      this.router = router;
      this.auth = auth;
      this.loginError = '';
      this.title = "Here are your photo galleries!";
      this.users = users;
      this.message = 'Home';
      this.showLogin = true;
    }

    Home.prototype.login = function login() {
      var _this = this;

      return this.auth.login(this.email, this.password).then(function (response) {
        sessionStorage.setItem("user", JSON.stringify(response.user));
        _this.loginError = "";
        _this.router.navigate('gallery');
      }).catch(function (error) {
        console.log(error);
        _this.loginError = "Invalid credentials.";
      });
    };

    Home.prototype.showRegister = function showRegister() {
      this.user = {
        firstName: "",
        lastName: "",
        email: "",
        password: ""
      };
      this.registerError = "";
      this.showLogin = false;
    };

    Home.prototype.save = function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        var serverResponse;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.users.save(this.user);

              case 2:
                serverResponse = _context.sent;

                if (!serverResponse.error) {
                  this.showLogin = true;
                } else {
                  this.registerError = "There was a problem registering the user.";
                  this.showLogin = false;
                }

              case 4:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function save() {
        return _ref.apply(this, arguments);
      }

      return save;
    }();

    Home.prototype.goback = function goback() {
      this.showLogin = true;
    };

    return Home;
  }()) || _class);
});
define('modules/photos',['exports', 'aurelia-framework', 'aurelia-router', '../resources/data/photos', 'aurelia-auth'], function (exports, _aureliaFramework, _aureliaRouter, _photos, _aureliaAuth) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.PhotoGallery = undefined;

  function _asyncToGenerator(fn) {
    return function () {
      var gen = fn.apply(this, arguments);
      return new Promise(function (resolve, reject) {
        function step(key, arg) {
          try {
            var info = gen[key](arg);
            var value = info.value;
          } catch (error) {
            reject(error);
            return;
          }

          if (info.done) {
            resolve(value);
          } else {
            return Promise.resolve(value).then(function (value) {
              step("next", value);
            }, function (err) {
              step("throw", err);
            });
          }
        }

        return step("next");
      });
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var PhotoGallery = exports.PhotoGallery = (_dec = (0, _aureliaFramework.inject)(_aureliaRouter.Router, _photos.Photos, _aureliaAuth.AuthService), _dec(_class = function () {
    function PhotoGallery(router, photo, auth) {
      _classCallCheck(this, PhotoGallery);

      this.photo = photo;
      this.router = router;
      this.auth = auth;
      this.gallery = JSON.parse(sessionStorage.getItem('gallery'));
      this.editPhoto2 = JSON.parse(sessionStorage.getItem('photo'));
      this.showPhotos = true;
      this.PHOTO_SERVICE = 'photos';
    }

    PhotoGallery.prototype.savePhoto = function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        var response, photoId, galleryId;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.photoObj = {
                  _id: this.photo._id,
                  galleryId: this.gallery._id
                };

                if (!this.photoObj) {
                  _context.next = 15;
                  break;
                }

                _context.next = 4;
                return this.photo.save(this.photoObj);

              case 4:
                response = _context.sent;

                if (!response.error) {
                  _context.next = 9;
                  break;
                }

                alert('There was an error uploading the photo');
                _context.next = 15;
                break;

              case 9:
                photoId = response._id;
                galleryId = response.galleryId;

                if (!(this.filesToUpload && this.filesToUpload.length)) {
                  _context.next = 15;
                  break;
                }

                _context.next = 14;
                return this.photo.uploadFile(this.filesToUpload, galleryId, photoId);

              case 14:
                this.filesToUpload = [];

              case 15:
                this.showPhotos = true;
                this.photo.getUserPhoto(this.gallery._id);

              case 17:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function savePhoto() {
        return _ref.apply(this, arguments);
      }

      return savePhoto;
    }();

    PhotoGallery.prototype.activate = function () {
      var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.photo.getUserPhoto(this.gallery._id);

              case 2:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function activate() {
        return _ref2.apply(this, arguments);
      }

      return activate;
    }();

    PhotoGallery.prototype.changeFiles = function changeFiles() {
      this.filesToUpload = new Array();
      this.filesToUpload.push(this.files[0]);
    };

    PhotoGallery.prototype.removeFile = function removeFile(index) {
      this.filesToUpload.splice(index, 1);
    };

    PhotoGallery.prototype.deletePhoto = function deletePhoto(photo) {
      this.photo.deletePhoto(photo._id);
    };

    PhotoGallery.prototype.editPhoto = function editPhoto(photo) {
      this.photoObj2 = photo;
      this.showPhotos = false;
    };

    PhotoGallery.prototype.saveEditedPhoto = function () {
      var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
        var response;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!this.photoObj2) {
                  _context3.next = 5;
                  break;
                }

                _context3.next = 3;
                return this.photo.saveEdited(this.photoObj2);

              case 3:
                response = _context3.sent;

                if (response.error) {
                  alert('There was an error updating the photo details');
                } else {}

              case 5:
                this.showPhotos = true;

              case 6:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function saveEditedPhoto() {
        return _ref3.apply(this, arguments);
      }

      return saveEditedPhoto;
    }();

    PhotoGallery.prototype.back = function back() {
      this.router.navigate('gallery');
    };

    PhotoGallery.prototype.back2 = function back2() {
      this.showPhotos = true;
    };

    return PhotoGallery;
  }()) || _class);
});
define('resources/index',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;
  function configure(config) {
    config.globalResources(['./value-converters/date-format', './elements/flatpickr']);
  }
});
define('resources/data/data-services',['exports', 'aurelia-framework', 'aurelia-fetch-client'], function (exports, _aureliaFramework, _aureliaFetchClient) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.DataServices = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var DataServices = exports.DataServices = (_dec = (0, _aureliaFramework.inject)(_aureliaFetchClient.HttpClient), _dec(_class = function () {
    function DataServices(http) {
      var _this = this;

      _classCallCheck(this, DataServices);

      this.httpClient = http;
      this.BASE_URL = "http://localhost:5000/api/";
      this.httpClient.configure(function (config) {
        config.withBaseUrl(_this.BASE_URL).withDefaults({
          credentials: 'same-origin',
          headers: {
            'Accept': 'application/json',
            'X-Requested-With': 'Fetch'
          }
        }).withInterceptor({
          request: function request(_request) {
            var authHeader = 'Bearer ' + localStorage.getItem('aurelia_token');
            _request.headers.append('Authorization', authHeader);
            console.log('Requesting ' + _request.method + ' ' + _request.url);
            return _request;
          },
          response: function response(_response) {
            console.log('Received ' + _response.status + ' ' + _response.url);
            return _response;
          }
        });
      });
    }

    DataServices.prototype.get = function get(url) {
      return this.httpClient.fetch(url).then(function (response) {
        return response.json();
      }).then(function (data) {
        return data;
      }).catch(function (error) {
        return error;
      });
    };

    DataServices.prototype.post = function post(content, url) {
      return this.httpClient.fetch(url, {
        method: 'post',
        body: (0, _aureliaFetchClient.json)(content)
      }).then(function (response) {
        return response.json();
      }).then(function (object) {
        return object;
      }).catch(function (error) {
        return error;
      });
    };

    DataServices.prototype.put = function put(content, url) {
      return this.httpClient.fetch(url, {
        method: 'put',
        body: (0, _aureliaFetchClient.json)(content)
      }).then(function (response) {
        return response.json();
      }).then(function (object) {
        return object;
      }).catch(function (error) {
        return error;
      });
    };

    DataServices.prototype.delete = function _delete(url) {
      return this.httpClient.fetch(url, {
        method: 'delete'
      }).then(function (response) {
        return response.json();
      }).then(function (object) {
        return object;
      }).catch(function (error) {
        return error;
      });
    };

    DataServices.prototype.uploadFiles = function uploadFiles(files, url) {
      return this.httpClient.fetch(url, {
        method: 'post',
        body: files
      }).then(function (response) {
        return response.json();
      }).then(function (object) {
        return object;
      }).catch(function (error) {
        return error;
      });
    };

    return DataServices;
  }()) || _class);
});
define('resources/data/gallery',['exports', 'aurelia-framework', './data-services'], function (exports, _aureliaFramework, _dataServices) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Gallery = undefined;

  function _asyncToGenerator(fn) {
    return function () {
      var gen = fn.apply(this, arguments);
      return new Promise(function (resolve, reject) {
        function step(key, arg) {
          try {
            var info = gen[key](arg);
            var value = info.value;
          } catch (error) {
            reject(error);
            return;
          }

          if (info.done) {
            resolve(value);
          } else {
            return Promise.resolve(value).then(function (value) {
              step("next", value);
            }, function (err) {
              step("throw", err);
            });
          }
        }

        return step("next");
      });
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Gallery = exports.Gallery = (_dec = (0, _aureliaFramework.inject)(_dataServices.DataServices), _dec(_class = function () {
    function Gallery(data) {
      _classCallCheck(this, Gallery);

      this.data = data;
      this.GALLERY_SERVICE = 'gallery';
      this.galleryArray = [];
    }

    Gallery.prototype.save = function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(gallery) {
        var response, _response;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!gallery) {
                  _context.next = 14;
                  break;
                }

                if (gallery._id) {
                  _context.next = 9;
                  break;
                }

                _context.next = 4;
                return this.data.post(gallery, this.GALLERY_SERVICE);

              case 4:
                response = _context.sent;

                if (!response.error) {
                  this.galleryArray.push(response);
                }
                return _context.abrupt('return', response);

              case 9:
                _context.next = 11;
                return this.data.put(gallery, this.GALLERY_SERVICE + "/" + gallery._id);

              case 11:
                _response = _context.sent;

                if (!_response.error) {}
                return _context.abrupt('return', _response);

              case 14:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function save(_x) {
        return _ref.apply(this, arguments);
      }

      return save;
    }();

    Gallery.prototype.deleteGallery = function () {
      var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(id) {
        var response, i;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.data.delete(this.GALLERY_SERVICE + "/" + id);

              case 2:
                response = _context2.sent;

                if (!response.error) {
                  for (i = 0; i < this.galleryArray.length; i++) {
                    if (this.galleryArray[i]._id === id) {
                      this.galleryArray.splice(i, 1);
                    }
                  }
                }

              case 4:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function deleteGallery(_x2) {
        return _ref2.apply(this, arguments);
      }

      return deleteGallery;
    }();

    Gallery.prototype.getUserGallery = function () {
      var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(id) {
        var response;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this.data.get(this.GALLERY_SERVICE + "/" + id);

              case 2:
                response = _context3.sent;

                if (!response.error && !response.message) {
                  this.galleryArray = response;
                }

              case 4:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function getUserGallery(_x3) {
        return _ref3.apply(this, arguments);
      }

      return getUserGallery;
    }();

    return Gallery;
  }()) || _class);
});
define('resources/data/photos',['exports', 'aurelia-framework', './data-services'], function (exports, _aureliaFramework, _dataServices) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Photos = undefined;

  function _asyncToGenerator(fn) {
    return function () {
      var gen = fn.apply(this, arguments);
      return new Promise(function (resolve, reject) {
        function step(key, arg) {
          try {
            var info = gen[key](arg);
            var value = info.value;
          } catch (error) {
            reject(error);
            return;
          }

          if (info.done) {
            resolve(value);
          } else {
            return Promise.resolve(value).then(function (value) {
              step("next", value);
            }, function (err) {
              step("throw", err);
            });
          }
        }

        return step("next");
      });
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Photos = exports.Photos = (_dec = (0, _aureliaFramework.inject)(_dataServices.DataServices), _dec(_class = function () {
    function Photos(data) {
      _classCallCheck(this, Photos);

      this.data = data;
      this.PHOTO_SERVICE = 'photo';
      this.GALLERY_SERVICE = 'gallery';
      this.photoArray = [];
    }

    Photos.prototype.save = function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(photo) {
        var response, _response;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!photo) {
                  _context.next = 14;
                  break;
                }

                if (photo._id) {
                  _context.next = 9;
                  break;
                }

                _context.next = 4;
                return this.data.post(photo, this.GALLERY_SERVICE + "/" + this.PHOTO_SERVICE);

              case 4:
                response = _context.sent;

                if (!response.error) {
                  this.photoArray.push(response);
                }
                return _context.abrupt('return', response);

              case 9:
                _context.next = 11;
                return this.data.put(photo, this.GALLERY_SERVICE + "/" + this.PHOTO_SERVICE + "/" + photo._id);

              case 11:
                _response = _context.sent;

                if (!_response.error) {}
                return _context.abrupt('return', _response);

              case 14:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function save(_x) {
        return _ref.apply(this, arguments);
      }

      return save;
    }();

    Photos.prototype.uploadFile = function () {
      var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(files, galleryId, photoId) {
        var formData, response;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                formData = new FormData();

                files.forEach(function (item, index) {
                  formData.append("file" + index, item);
                });
                _context2.next = 4;
                return this.data.uploadFiles(formData, this.GALLERY_SERVICE + "/upload/" + galleryId + "/" + photoId);

              case 4:
                response = _context2.sent;
                return _context2.abrupt('return', response);

              case 6:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function uploadFile(_x2, _x3, _x4) {
        return _ref2.apply(this, arguments);
      }

      return uploadFile;
    }();

    Photos.prototype.getUserPhoto = function () {
      var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(galleryId) {
        var response;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this.data.get("users/" + this.GALLERY_SERVICE + "/" + galleryId);

              case 2:
                response = _context3.sent;

                if (!response.error && !response.message) {
                  this.photoArray = response;
                }

              case 4:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function getUserPhoto(_x5) {
        return _ref3.apply(this, arguments);
      }

      return getUserPhoto;
    }();

    Photos.prototype.deletePhoto = function () {
      var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(id) {
        var response, i;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return this.data.delete("photo" + "/" + id);

              case 2:
                response = _context4.sent;

                if (!response.error) {
                  for (i = 0; i < this.photoArray.length; i++) {
                    if (this.photoArray[i]._id === id) {
                      this.photoArray.splice(i, 1);
                    }
                  }
                }

              case 4:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function deletePhoto(_x6) {
        return _ref4.apply(this, arguments);
      }

      return deletePhoto;
    }();

    Photos.prototype.saveEdited = function () {
      var _ref5 = _asyncToGenerator(regeneratorRuntime.mark(function _callee5(photo) {
        var response;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if (!photo) {
                  _context5.next = 6;
                  break;
                }

                _context5.next = 3;
                return this.data.put(photo, this.GALLERY_SERVICE + "/" + this.PHOTO_SERVICE + "/" + photo._id);

              case 3:
                response = _context5.sent;

                if (!response.error) {}
                return _context5.abrupt('return', response);

              case 6:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function saveEdited(_x7) {
        return _ref5.apply(this, arguments);
      }

      return saveEdited;
    }();

    return Photos;
  }()) || _class);
});
define('resources/data/users',['exports', 'aurelia-framework', './data-services'], function (exports, _aureliaFramework, _dataServices) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Users = undefined;

  function _asyncToGenerator(fn) {
    return function () {
      var gen = fn.apply(this, arguments);
      return new Promise(function (resolve, reject) {
        function step(key, arg) {
          try {
            var info = gen[key](arg);
            var value = info.value;
          } catch (error) {
            reject(error);
            return;
          }

          if (info.done) {
            resolve(value);
          } else {
            return Promise.resolve(value).then(function (value) {
              step("next", value);
            }, function (err) {
              step("throw", err);
            });
          }
        }

        return step("next");
      });
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Users = exports.Users = (_dec = (0, _aureliaFramework.inject)(_dataServices.DataServices), _dec(_class = function () {
    function Users(data) {
      _classCallCheck(this, Users);

      this.data = data;
      this.USER_SERVICE = 'users';
    }

    Users.prototype.save = function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(user) {
        var serverResponse;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!user) {
                  _context.next = 5;
                  break;
                }

                _context.next = 3;
                return this.data.post(user, this.USER_SERVICE);

              case 3:
                serverResponse = _context.sent;
                return _context.abrupt('return', serverResponse);

              case 5:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function save(_x) {
        return _ref.apply(this, arguments);
      }

      return save;
    }();

    return Users;
  }()) || _class);
});
define('resources/elements/flatpickr',['exports', 'aurelia-framework', 'flatpickr'], function (exports, _aureliaFramework, _flatpickr) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.FlatPickerCustomElement = undefined;

    var _flatpickr2 = _interopRequireDefault(_flatpickr);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    function _initDefineProp(target, property, descriptor, context) {
        if (!descriptor) return;
        Object.defineProperty(target, property, {
            enumerable: descriptor.enumerable,
            configurable: descriptor.configurable,
            writable: descriptor.writable,
            value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
        });
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
        var desc = {};
        Object['ke' + 'ys'](descriptor).forEach(function (key) {
            desc[key] = descriptor[key];
        });
        desc.enumerable = !!desc.enumerable;
        desc.configurable = !!desc.configurable;

        if ('value' in desc || desc.initializer) {
            desc.writable = true;
        }

        desc = decorators.slice().reverse().reduce(function (desc, decorator) {
            return decorator(target, property, desc) || desc;
        }, desc);

        if (context && desc.initializer !== void 0) {
            desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
            desc.initializer = undefined;
        }

        if (desc.initializer === void 0) {
            Object['define' + 'Property'](target, property, desc);
            desc = null;
        }

        return desc;
    }

    function _initializerWarningHelper(descriptor, context) {
        throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
    }

    var _dec, _dec2, _class, _desc, _value, _class2, _descriptor;

    var FlatPickerCustomElement = exports.FlatPickerCustomElement = (_dec = (0, _aureliaFramework.inject)(Element), _dec2 = (0, _aureliaFramework.bindable)({ defaultBindingMode: _aureliaFramework.bindingMode.twoWay }), _dec(_class = (_class2 = function () {
        function FlatPickerCustomElement(element) {
            _classCallCheck(this, FlatPickerCustomElement);

            _initDefineProp(this, 'value', _descriptor, this);

            this.element = element;
        }

        FlatPickerCustomElement.prototype.bind = function bind() {
            var defaultConfig = {
                altInput: true,
                altFormat: "F j, Y",
                wrap: true
            };
            this._config = Object.assign({}, defaultConfig);
            this._config.onChange = this._config.onMonthChange = this._config.onYearChange = this.onChange.bind(this);
        };

        FlatPickerCustomElement.prototype.attached = function attached() {
            this.flatpickr = new _flatpickr2.default(this.element.querySelector('.aurelia-flatpickr'), this._config);
        };

        FlatPickerCustomElement.prototype.onChange = function onChange(selectedDates, dateStr, instance) {
            this.value = selectedDates[0];
        };

        FlatPickerCustomElement.prototype.valueChanged = function valueChanged() {
            if (!this.flatpickr) {
                return;
            }
            if (this.value === this.flatpickr.selectedDates[0]) {
                return;
            }
            var newDate = this.value ? this.value : undefined;
            this.flatpickr.setDate(newDate);
        };

        return FlatPickerCustomElement;
    }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'value', [_dec2], {
        enumerable: true,
        initializer: null
    })), _class2)) || _class);
});
define('resources/value-converters/date-format',['exports', 'moment'], function (exports, _moment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.DateFormatValueConverter = undefined;

  var _moment2 = _interopRequireDefault(_moment);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var DateFormatValueConverter = exports.DateFormatValueConverter = function () {
    function DateFormatValueConverter() {
      _classCallCheck(this, DateFormatValueConverter);
    }

    DateFormatValueConverter.prototype.toView = function toView(value) {
      if (value === undefined || value === null) {
        return;
      }

      return (0, _moment2.default)(value).format('MMM Do YYYY');
    };

    return DateFormatValueConverter;
  }();
});
define('text!app.html', ['module'], function(module) { module.exports = "<template><require from=\"resources/css/styles.css\"></require><router-view></router-view></template>"; });
define('text!resources/css/styles.css', ['module'], function(module) { module.exports = "@charset \"UTF-8\";\n/* CSS Document */\n\n.jumbotron {\n    height: 150px;\n    font-size: 17px;\n    font-weight: bold;\n    text-align: center;\n    font-family: 'Roboto', sans-serif;\n    background: hsl(311, 24%, 67%);\n  }\n\n.left {\n    float: leftt;\n}\n\n.right {\n    float: right;\n}\n\n.wrapper {\n    width: 500px;\n    margin: auto;\n    padding: auto;\n    overflow: auto;\n}\n\n.button {\n    background-color: #4CAF50; /* Green */\n    border: none;\n    color: white;\n    padding: 15px 32px;\n    text-align: center;\n    text-decoration: none;\n    display: inline-block;\n    font-size: 16px;\n} "; });
define('text!modules/gallery.html', ['module'], function(module) { module.exports = "<template><div class=\"jumbotron\"><h2> ${user.firstName}'s Photo Galleries</h2></div><compose show.bind=\"showGallery\" view=\"./components/galleryList.html\"></compose><compose show.bind=\"!showGallery\" view=\"./components/createGallery.html\"></compose></template>"; });
define('text!modules/home.html', ['module'], function(module) { module.exports = "<template><div class=\"jumbotron\"><center><h2>Welcome! Please login to access your Photo Galleries.</h2></center><br><br>    <compose show.bind=\"showLogin\" view=\"./components/login.html\"></compose>    <compose show.bind=\"!showLogin\" view=\"./components/register.html\"></compose></div></template>"; });
define('text!modules/photos.html', ['module'], function(module) { module.exports = "<template><compose show.bind=\"showPhotos\" view=\"./components/photoList.html\"></compose><compose show.bind=\"!showPhotos\" view=\"./components/editPhotos.html\"></compose></template>"; });
define('text!modules/components/createGallery.html', ['module'], function(module) { module.exports = "<template><center><div class=\"card\" style=\"width:800px\"><div class=\"card-body\"><label for=\"galleryInput\">Gallery Name *</label><input value.bind=\"galleryObj.gallery\" type=\"text\" class=\"form-control\" id=\"galleryInput\" aria-describedby=\"galleryHelp\" placeholder=\"Enter gallery name\"> <small id=\"galleryHelp\" class=\"form-text text-muted\">A short name for your photo gallery</small></div>        <div>            <label for=\"descriptionInput\">Description</label>            <textarea value.bind=\"galleryObj.description\" type=\"text\" class=\"form-control\" id=\"descriptionInput\" aria-describedby=\"descriptionHelp\" placeholder=\"Enter description\"></textarea><small id=\"galleryHelp\" class=\"form-text text-muted\">A description for your photo gallery</small>         </div><center></center></div><br><button click.trigger=\"saveGallery()\" class=\"btn btn-primary\">Save Gallery</button> <button click.trigger=\"back()\" type=\"button\" class=\"btn btn-primary\"><span class=\"glyphicon glyphicon-arrow-left\"></span> Back to Gallery List</button></center></template>"; });
define('text!modules/components/editPhotos.html', ['module'], function(module) { module.exports = "<template><div class=\"jumbotron\"><center><h2>Edit the Photo ${photoObj2.photoName}</h2></center><center><br><br><br><div class=\"card\" style=\"width:800px\"><div class=\"card-body\"><label for=\"photoInput\">Photo Name *</label><input value.bind=\"photoObj2.photoName\" type=\"text\" class=\"form-control\" id=\"photoNameInput\" aria-describedby=\"photoHelp\" placeholder=\"Enter photo name\"></div>        <div>            <label for=\"descriptionInput\">Description</label>            <textarea value.bind=\"photoObj2.photoDes\" type=\"text\" class=\"form-control\" id=\"photoDesInput\" aria-describedby=\"photoDescriptionHelp\" placeholder=\"Enter Description for Photo\"></textarea>        </div><center></center></div><br>  <button click.trigger=\"saveEditedPhoto()\" class=\"btn btn-primary topMargin\">Save</button> <button click.trigger=\"back2()\" type=\"button\" class=\"btn btn-primary\"><span class=\"glyphicon glyphicon-arrow-left\"></span> Back to Photo List</button></center></div></template>"; });
define('text!modules/components/galleryList.html', ['module'], function(module) { module.exports = "<template><center><div class=\"container\"><div show.bind=\"!gallery.galleryArray.length\"><h3>You don't have any photo galleries</h3></div><span class=\"lefttMargin pull-left\"><button type=\"button\" class=\"btn-outline-primary btn-lg\" click.trigger=\"createGallery()\">+ Add a Gallery</button></span><br></div></center>      <center><div class=\"container\"><div show.bind=\"gallery.galleryArray.length\"></div><div class=\"table-responsive\"><table class=\"table\"><thead><tr><th>Gallery</th> <th>Description</th><th>Date Created</th><th>Edit | Delete</th></tr></thead><tbody><tr class repeat.for=\"gallery of gallery.galleryArray\"><th><button click.trigger=\"showGalleryOrAdd(gallery)\" class=\"btn btn-link\">${gallery.gallery}</button></th><td>${gallery.description}</td><td>${gallery.dateCreated | dateFormat}</td><td><i click.trigger=\"editGallery(gallery)\" class=\"fa fa-pencil rightMargin\" aria-hidden=\"true\"></i> | <i click.trigger=\"deleteGallery(gallery)\" class=\"fa fa-trash rightMargin\" aria-hidden=\"true\"></i></td></tr></tbody></table></div><br><br><span class=\"centertMargin pull-center\"><button type=\"button\" class=\"btn btn-primary btn-md\" click.trigger=\"logout()\">Logout</button></span></div></center></template>"; });
define('text!modules/components/login.html', ['module'], function(module) { module.exports = "<template>    <div id=\"errorMsg\" innerhtml.bind=\"loginError\"></div><center><div class=\"card\" style=\"width:1000px\"><div class=\"card-body\"><h2 class=\"card-title\">Login</h2><br><br><div class=\"form-group col\"><div class=\"col-lg-6 col-lg-offset-6\">    <label for=\"email\">Email:</label>    <input value.bind=\"email\" type=\"email\" class=\"form-control\" id=\"email\" placeholder=\"Email\"><br>    <label for=\"password\">Password:</label>    <input value.bind=\"password\" type=\"password\" class=\"form-control\" id=\"password\" placeholder=\"Password\"><br><button type=\"button\" class=\"btn btn-primary\" click.trigger=\"login()\">Login</button>       <button type=\"button\" class=\"btn btn-primary\" click.trigger=\"showRegister()\">Register</button></div></div></div>    </div></center></template>"; });
define('text!modules/components/photoList.html', ['module'], function(module) { module.exports = "<template><div class=\"jumbotron\"><center><h2>Photos in the ${gallery.gallery} Gallery</h2></center><br><br><br><center><div class=\"container\"><div show.bind=\"!photo.photoArray.length\"><h3>You don't have any photos in this gallery</h3></div><div show.bind=\"gallery.galleryArray.length\"></div><div class=\"table-responsive\"><table class=\"table\"><thead><tr><th>Photo</th><th>Name</th><th>Description</th> <th>File</th><th>Date Uploaded</th><th>Edit | Delete</th></tr></thead><tbody><div show.bind=\"photo.photoArray.length\"><tr class repeat.for=\"photo of photo.photoArray\"><th><a href=\"/uploads/${photo.galleryId}/${photo.file.filename}\" target=\"_blank\"><img src=\"/uploads/${photo.galleryId}/${photo.file.filename}\" style=\"width:100px;height:100px\"></a></th><td>${photo.photoName}</td><td>${photo.photoDes}</td><td>${photo.file.originalName}</td><td> ${photo.dateUploaded | dateFormat}</td><td><i click.trigger=\"editPhoto(photo)\" class=\"fa fa-pencil rightMargin\" aria-hidden=\"true\"></i> | <i click.trigger=\"deletePhoto(photo)\" class=\"fa fa-trash rightMargin\" aria-hidden=\"true\"></i>         </td></tr></div></tbody></table><ul><li repeat.for=\"file of filesToUpload\" class=\"list-group-item\"> ${file.name}<span click.delegate=\"removeFile($index)\" class=\"pull-right\"><i class=\"fa fa-trash\" aria-hidden=\"true\"></i></span></li></ul><br><label class=\"btn btn-secondary\">Upload Photos&hellip; <input type=\"file\" style=\"display:none\" change.delegate=\"changeFiles()\" files.bind=\"files\"></label></div></div></center><br><button type=\"button\" class=\"btn btn-primary btn-md\" click.trigger=\"savePhoto()\" class=\"btn btn-primary topMargin\">Save</button> <button click.trigger=\"back()\" type=\"button\" class=\"btn btn-primary\"><span class=\"glyphicon glyphicon-arrow-left\"></span> Back to Gallery List</button><br><br><br><br><br></div></template>"; });
define('text!modules/components/register.html', ['module'], function(module) { module.exports = "<template><div id=\"errorMsg\" innerhtml.bind=\"registerError\"></div><center><div class=\"card\" style=\"width:1000px\"><div class=\"card-body\"><h2 class=\"card-title\">Register</h2><center><div class=\"container\" style=\"max-width:600px;margin:60px auto\"><form role=\"form\"><div class=\"form-group\">First Name: <input value.bind=\"user.firstName\" class=\"form-control\" id=\"firstName\" placeholder=\"First Name\"></div></form><p>Last Name: <input value.bind=\"user.lastName\" class=\"form-control\" id=\"lastName\" placeholder=\"Last Name\"></p><p>Email: <input value.bind=\"user.email\" type=\"email\" class=\"form-control\" id=\"user.email\" placeholder=\"Email\"></p><p>Password: <input value.bind=\"user.password\" type=\"password\" class=\"form-control\" id=\"user.password\" placeholder=\"Password\"></p><button type=\"button\" class=\"btn btn-primary\" click.trigger=\"save()\">Register</button> <button type=\"button\" class=\"btn btn-primary\" click.trigger=\"goback()\">Back to Login</button></div></center></div></div></center></template>"; });
define('text!resources/elements/flatpickr.html', ['module'], function(module) { module.exports = "<template>    <require from=\"flatpickr/flatpickr.css\"></require>    <div class=\"input-group aurelia-flatpickr\">        <input type=\"text\" class=\"aurelia-flatpickr form-control flatPicker\" data-input>     </div></template>"; });
//# sourceMappingURL=app-bundle.js.map