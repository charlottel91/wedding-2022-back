const Carpooling = require('../models/Carpooling');

const CarpoolingService = {
  createCarpooling: async (carpooling) => {
    try {
      const response = await new Carpooling(carpooling).save();
      return response;
    } catch (error) {
      console.log(error);
    }
  },

  UpdateCarpooling: async (carpooling) => {
    try {
      const response = await Carpooling.updateOne({_id: carpooling._id},
        {$set: {role: carpooling.role,
          place: carpooling.place,
        }} 
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  },
};

module.export = CarpoolingService;
