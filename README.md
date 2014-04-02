genie
=====

[![Build Status](https://travis-ci.org/teyosh/genie.png?branch=master)](https://travis-ci.org/teyosh/genie)

Genie is framework for [Express3.x](http://expressjs.com/) based to [Klass](https://github.com/ded/klass).

Installation
=====
### Get the CLI
  $ npm install genie-express -g

Quick Start
=====
### Create an app
  $ genie create my-app  
  $ cd my-app $$ npm install genie-express  

### Start your app
  $ node server.js

# Scaffold

  $ genie controller [name]  
  $ genie model [name]  
  $ genie service [name]  
  $ genie factory [name]  

Examples
=====
### Controller

```js
module.exports = function (app, config) {
  var ApplicationController = app.getController("Application", true);
  var IndexController = ApplicationController.extend(function(){
    this.routes = {
      "index" : "/"
    };
    this.addBeforeAction("action", function(res, req, next){
      var CheckFactory = app.getFactory("Check");
      CheckFactory.start(res, req, next);
    });
    this.addBeforeAction("get", function(res, req, next){
      var CheckFactory = app.getFactory("Check");
      CheckFactory.start(res, req, next);
    });
    this.addBeforeAction("get", function(res, req, next){
      var CheckService = app.getService("Check");
      CheckService.start(res, req, next);
    });
  }).methods({
    getIndex : function(req, res){
      res.render("index", {
        title : "Hello, Genie"
      });
    },
  });
  return IndexController;
}
```

### Model

```js
'use strict';
module.exports = function(app){
  var ApplicationModel = app.getModel('Application', true);
  var CheckModel = ApplicationModel.extend(function(){
    this.app = app;
    this.modelName = "Check";
    this.rooms = ['Apple', 'Orange', 'Grape'];
  }).methods({
    getRoom : function(id){
      console.log(this.rooms);
      return this.rooms[id];
    }
  });
  return CheckModel;
};
```

### Service

```js
'use strict';
module.exports = function(app){
  var ApplicationService = app.getService('Application', true);
  var CheckService = ApplicationService.extend(function(app){
    this.app = app;
    this.serviceName = "Check";
    this.config = this.Config();
    this.num = this.config.num;
  }).methods({
    start : function(req, res, next){
      this.supr();
      console.log("service: "+ this.num++);
      next();
    }
  });
  return CheckService;
};
```

### Factory

```js
'use strict';
module.exports = function(app){
  var ApplicationFactory = app.getFactory('Application', true);
  var CheckFactory = ApplicationFactory.extend(function(){
    this.factoryName = "Check";
    this.num = 0;
  }).methods({
    start : function(req, res, next){
      this.supr();
      console.log("factory: "+ this.num++);
      next();
    }
  });
  return CheckFactory;
};
```

### View

Uses [Twig](https://github.com/justjohn/twig.js) to render Template

```html
<div id="title">{% block content %}{% endblock %}</div>
```

``` html
{% extends "layout.twig" %}
{% block content %}
{{ title }}
{% endblock %}
```

### Routing

Routings are extract from method of controller.  
Extract methods are GET, POST, PUT and DELETE.  

#### get /index

```js
getIndex : function(req, res){
  res.render("index", {
    title : "Get index"
  });
}
```

#### post /create
```js
postCreate : function(req, res){
  res.render("index", {
    title : "Post create"
  });
}
```

Params are extract from property of controller.

#### get /test/member/:id

```js
// controllers/test/TestController.js

module.exports = function (app, config) {
  var ApplicationController = app.getController("Application", true);
  var TestController = ApplicationController.extend(function(){
    this.params = {
      "member" : [":id"]
    };
  }).methods({
    getMember : function(req, res){
      res.render("index", {
        title : "Genie is "+req.params.id
      });
    },
  });
  return TestController;
}

```

In the case of a different method?

```js
this.params = {
  "member" : {
    get : [":id"],
    post: [":test"]
  }
};

```

Routes change extract from property of controller.

### get /test/

```js
// controllers/test/TestController.js

module.exports = function (app, config) {
  var ApplicationController = app.getController("Application", true);
  var TestController = ApplicationController.extend(function(){
    this.routes = {
      "index": "/test/"
    };
  }).methods({
    getIndex : function(req, res){
      res.render("index", {
        title : "Genie is test"
      });
    },
  });
  return TestController;
}

```
### Service and Factory

Service will create an instance for each call.

```js
module.exports = function (app, config) {
  var ApplicationController = app.getController("Application", true);
  var TestController = ApplicationController.extend(function(){
    this.TestService = this.app.getService("Test");
  })
}
```

Factory will call the same instance.

```js
module.exports = function (app, config) {
  var ApplicationController = app.getController("Application", true);
  var TestController = ApplicationController.extend(function(){
    this.TestFactory = this.app.getFactory("Test");
  })
}
```
