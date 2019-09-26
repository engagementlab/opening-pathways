const keystone = global.keystone;
const express = require('express');
var router = express.Router();
var middleware = require('./middleware');
var importRoutes = keystone.importer(__dirname);

// Common Middleware
keystone.pre('routes', middleware.initErrorHandlers);
keystone.pre('render', middleware.initLocals);
keystone.pre('render', middleware.flashMessages);

// Import Route Controllers
var routes = {
    api: importRoutes('./api')
};
let routeIncludes = [keystone.middleware.api, keystone.middleware.cors];

// Setup Route Bindings 
// CORS
router.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, HEAD, PUT');
    res.header('Access-Control-Expose-Headers', 'Content-Length');
    res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method");
    
    if(req.method === 'OPTIONS')
        res.sendStatus(200);
    else
        next();

});

router.get('/api/data/get/:type/:key?', routeIncludes, routes.api.data.get);

router.get('/api/quiz/get', routeIncludes, routes.api.quiz.get);
router.get('/api/quiz/get/results/:key', routeIncludes, routes.api.quiz.getResults);
router.post('/api/quiz/save', routeIncludes, routes.api.quiz.save);

router.get('/api/narrative/get', routeIncludes, routes.api.narrative.all);
router.get('/api/narrative/get/:id', routeIncludes, routes.api.narrative.get);
router.get('/api/narrative/featured', routeIncludes, routes.api.narrative.featured);
router.all('/api/narrative/create', routeIncludes, routes.api.narrative.create);

router.get('/api/story/get', routeIncludes, routes.api.story.all);
router.get('/api/story/get/:id', routeIncludes, routes.api.story.get);
router.get('/api/story/get/:id/:pathway', routeIncludes, routes.api.story.pathway);
router.get('/api/story/fields', routeIncludes, routes.api.story.fields);
router.post('/api/story/create', routeIncludes, routes.api.story.create);

router.get('/api/pathway/all', routeIncludes, routes.api.pathway.all);
router.get('/api/pathway/limit/:limit', routeIncludes, routes.api.pathway.limit);
router.get('/api/pathway/get/:id', routeIncludes, routes.api.pathway.get);

router.get('/api/text/get/:ids', routeIncludes, routes.api.text.get);

module.exports = router;