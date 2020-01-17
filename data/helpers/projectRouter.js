const express = require( "express" );
const router = express.Router();
const Projects = require( "./projectModel" );
router.use( express.json() );

//! POST REQUEST -- ADDS A NEW PROJECT =================================
router.post( "/", ( req, res ) => {
  Projects.insert( req.body )
    .then( ( project ) => {
      console.log( project );
      res.status( 201 ).json( project );
    } )
    .catch( ( error ) => {
      // log error to server
      console.log( error );
      res.status( 500 ).json( {
        message: "Error adding the Project",
      } );
    } );
} );
//! GET REQUEST -- GETS ALL PROJECTS ================================
router.get( "/", ( req, res ) => {
  Projects.get()
    .then( ( projects ) => {
      console.log( projects );
      res.status( 200 ).json( projects );
    } )
    .catch( ( error ) => {
      // log error to server
      console.log( error );
      res.status( 500 ).json( {
        message: "Error retrieving the Projects",
      } );
    } );
} );
//! GET REQUEST -- GETS A PROJECT BY A CERTAIN ID =======================
router.get( "/:id", validateProjectId, ( req, res ) => {
  Projects.get( req.params.id )
    .then( ( project ) => {
      res.status( 200 ).json( project );
    } )
    .catch( ( error ) => {
      // log error to server
      console.log( error );
      res.status( 500 ).json( {
        message: "Error retrieving the Project",
      } );
    } );
} );
//! GET REQUEST -- GETS A PROJECTS ACTIONS BY THEIR ID ======================
router.get( "/:id/actions", validateProjectId, ( req, res ) => {
  Projects.getProjectActions( req.params.id )
    .then( ( actions ) => {
      res.status( 200 ).json( actions );
    } )
    .catch( ( error ) => {
      // log error to server
      console.log( error );
      res.status( 500 ).json( {
        message: "Error getting the Actions for the Project",
      } );
    } );
} );
//! DELETE REQUEST -- NUKES A PROJECT ====================================
router.delete( "/:id", validateProjectId, ( req, res ) => {
  Projects.remove( req.params.id )
    .then( ( deleted ) => {
      res.status( 200 ).json( deleted );
    } )
    .catch( ( error ) => {
      // log error to server
      console.log( error );
      res.status( 500 ).json( {
        message: "Error removing the Project",
      } );
    } );
} );
//! PUT REQUEST -- CAN EDIT A PROJECTS INFO ===============================
router.put( "/:id", validateProjectId, validateProject, ( req, res ) => {
  Projects.update( req.params.id, req.body )
    .then( ( project ) => {
      res.status( 200 ).json( project );
    } )
    .catch( ( error ) => {
      // log error to server
      console.log( error );
      res.status( 500 ).json( {
        message: "Error updating the Project",
      } );
    } );
} );
//! ===================================================================

//! CUSTOM MIDDLEWARE =================================================

function validateProjectId ( req, res, next ) {
  Projects.get( req.params.id ).then( ( project ) => {
    if ( project ) {
      next();
    } else {
      res.status( 400 ).json( { errorMessage: "That Project Id does not exist" } );
    }
  } );
}

function validateProject ( req, res, next ) {
  if ( Object.entries( req.body ).length > 0 ) {
    if ( !req.body.name ) {
      res.status( 400 ).json( {
        message: "Missing the Name field.",
      } );
    } else if ( !req.body.description ) {
      res.status( 400 ).json( {
        message: "Missing the description field.",
      } );
    } else {
      next();
    }
  } else {
    res.status( 400 ).json( {
      message: "Missing project data.",
    } );
  }
}

module.exports = router;
