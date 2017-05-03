import mongoose from 'mongoose';
import {Router} from 'express';
import Restaurant from '../model/restaurant';

export default({config, db}) => {
  let api = Router();

  // CREATE
  // add new restaurant '/vi1/restaurant/add'
  api.post('/add', (req, res) => {
    let newRest = new Restaurant();
    newRest.name = req.body.name;

    newRest.save(err => {
      if (err) {
        res.send(err);
      }
      res.json({message: 'Restaurant saved successfully'});
    });
  });

  // READ
  // retrieve all restaurants '/vi1/restaurant'
  api.get('/', (req, res) => {
    Restaurant.find({}, (err, restaurants) => {
      if(err) {
        res.send(err);
      }
      res.json(restaurants);
    });
  });

  // retrieve 1 restaurant '/vi1/restaurant/:id'
  api.get('/:id', (req, res) => {
    Restaurant.findById(req.params.id, (err, restaurant) => {
      if(err) {
        res.send(err);
      }
      res.json(restaurant);
    });
  });

  // UPDATE
  // update existing restaurant '/vi1/restaurant/:id'
  api.put('/:id', (req, res) => {
    Restaurant.findById(req.params.id, (err,restaurant) => {
      if (err) {
        res.send(err);
      }
      restaurant.name = req.body.name;
      restaurant.save(err => {
        if(err) {
          res.send(err);
        }
        res.json({message: "Restaurant info updated"});
      });
    });
  });

  // DELETE
  // delete restaurant '/v1/restaurant/:id'
  api.delete('/:id', (req, res) => {
    Restaurant.remove({
      _id: req.params.id
    }, (err, restaurant) => {
      if(err) {
        res.send(err);
      }
      res.json({message: "Restaurant Successfully Removed!"});
    });
  });


  return api;
}
