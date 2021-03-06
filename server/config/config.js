// Define the variables
var path = require('path');  
var rootPath = path.normalize(__dirname + '/..');   
var env = process.env.NODE_ENV || 'development';         

var config = {  
development: {    
            root: rootPath,    
            app: {name:'MyPics'},    
            port: 5000,
            db: 'mongodb://127.0.0.1/mypics-dev',
            uploads: rootPath + "/public/uploads/",
            secret: "cayennedlikedhistreats"            
 },  
 production: {    
            root: rootPath,    
            app: {name: 'MyPics'},    
            port: 80, 
            db: 'mongodb://127.0.0.1/mypics',
            secret: "cayennedlikedhistreats"            
 },
 test: {
       root: rootPath,
       app: {name: 'MyPics'},
       port: 4000,
       db: 'mongodb://127.0.0.1/mypics-test',
       secret: "cayennedlikedhistreats"       
}
  };

// Exports the config determined by the env variable
module.exports = config[env];                            

