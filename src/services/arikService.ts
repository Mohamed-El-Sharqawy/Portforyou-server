import Arik, { IArik } from '../models/Arik.js';

class ArikService {
  async getArikData(): Promise<IArik | null> {
    try {
      const arikData = await Arik.findOne();
      return arikData;
    } catch (error) {
      console.error('Error fetching Arik data:', error);
      throw error;
    }
  }

  async createArikData(data: Partial<IArik>): Promise<IArik> {
    try {
      const arikData = new Arik(data);
      await arikData.save();
      return arikData;
    } catch (error) {
      console.error('Error creating Arik data:', error);
      throw error;
    }
  }

  async updateArikData(data: Partial<IArik>): Promise<IArik | null> {
    try {
      const updatedData = await Arik.findOneAndUpdate({}, data, {
        new: true,
        upsert: true,
      });
      return updatedData;
    } catch (error) {
      console.error('Error updating Arik data:', error);
      throw error;
    }
  }
}

export default new ArikService();
