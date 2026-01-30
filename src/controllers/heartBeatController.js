import Heartbeat from '../models/Hearbeat.js';
export const getHeartBeat = async (req, res) => {
  try {
    await Heartbeat.findOneAndUpdate(
      {},
      { ping: 'alive' },
      { upsert: true, new: true }
    );

    res.status(200).json({ db: 'awake', server: 'alive' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};
