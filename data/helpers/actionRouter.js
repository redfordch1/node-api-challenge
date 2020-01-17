const express = require( "express" );
const router = express.Router();
const Actions = require( "./actionModel.js" );
const Projects = require( "./projectModel.js" );
router.use( express.json() );

//! POST REQUEST -- ADDS A NEW ACTION =================================
router.post( "/:id", ( req, res ) => {
  console.log( res );
  Actions.insert( req.body )
    .then( ( action ) => {
      console.log( action );
      res.status( 201 ).json( action );
    } )
    .catch( ( error ) => {
      // log error to server
      console.log( error );
      res.status( 500 ).json( {
        message: "Error adding the Action",
      } );
    } );
} );
//! GET REQUEST -- GETS ALL ACTIONS ================================
router.get( "/", ( req, res ) => {
  Actions.get( req.query )
    .then( ( actions ) => {
      res.status( 200 ).json( actions );
    } )
    .catch( ( error ) => {
      // log error to server
      console.log( error );
      res.status( 500 ).json( {
        message: "Error retrieving the Actions",
      } );
    } );
} );
//! GET REQUEST -- GETS AN ACTION BY A CERTAIN ID =======================
router.get( "/:id", ( req, res ) => {
  Actions.get( req.params.id )
    .then( ( action ) => {
      res.status( 200 ).json( action );
    } )
    .catch( ( error ) => {
      // log error to server
      console.log( error );
      res.status( 500 ).json( {
        message: "Error retrieving the Action",
      } );
    } );
} );
//! DELETE REQUEST -- NUKES AN ACTION ====================================
router.delete( "/:id", ( req, res ) => {
  Actions.remove( req.params.id )
    .then( ( deleted ) => {
      res.status( 200 ).json( deleted );
    } )
    .catch( ( error ) => {
      // log error to server
      console.log( error );
      res.status( 500 ).json( {
        message: "Error removing the Action",
      } );
    } );
} );
//! PUT REQUEST -- CAN EDIT AN ACTIONS INFO ===============================
router.put( "/:id", ( req, res ) => {
  Actions.update( req.params.id, req.body )
    .then( ( action ) => {
      res.status( 200 ).json( action );
    } )
    .catch( ( error ) => {
      // log error to server
      console.log( error );
      res.status( 500 ).json( {
        message: "Error updating the Action",
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

function validateActionId ( req, res, next ) {
  const id = req.params.id;
  Actions.get( id ).then( ( action ) => {
    if ( action ) {
      next();
    } else {
      res.status( 404 ).json( {
        message: "Invalid action ID.",
      } );
    }
  } );
}

function validateAction ( req, res, next ) {
  if ( Object.entries( req.body ).length > 0 ) {
    if ( !req.body.project_id ) {
      res.status( 400 ).json( {
        message: 'Missing "project_id" field.',
      } );
    } else if ( !req.body.description ) {
      res.status( 400 ).json( {
        message: 'Missing "description" field.',
      } );
    } else if ( !req.body.notes ) {
      res.status( 400 ).json( {
        message: 'Missing "notes field.',
      } );
    } else {
      next();
    }
  } else {
    res.status( 400 ).json( {
      message: "Missing action data.",
    } );
  }
}

module.exports = router;
