import { ObjectId } from 'mongodb';
import { dbService } from '../../services/db.service.js';
// import { DB_NAME as bugCollection } from '../../api/bug/bug.service.js';

const DB_NAME = 'msg';

export const msgService = {
   add,
   remove,
   update,
};

async function add(msg, loggedinUser) {
   const collection = await dbService.getCollection(DB_NAME);
   if (!loggedinUser) throw new Error('User is not logged in!');
   // Need to add fetching for user and bug , replace usrId and bugId
   const result = await collection.insertOne(msg);
}

async function update(msg, loggedinUser) {
   const collection = await dbService.getCollection(DB_NAME);
   if (!loggedinUser || (!loggedinUser.isAdmin && loggedinUser._id !== msg.creator._id))
      throw new Error('User does not own msg!');
   const newMsg = await collection.updateOne({ _id: ObjectId.createFromHexString(msg._id) }, { $set: msg });
   return newMsg;
}

async function remove(msgId, loggedinUser) {
   try {
      const collection = await dbService.getCollection(DB_NAME);
      if (!loggedinUser && !loggedinUser.isAdmin) throw new Error('User is not admin!');
      const res = await collection.deleteOne({ _id: ObjectId.cacheHexString(msgId) });
      return res;
   } catch (err) {
      console.log(`ERROR: cannot remove msg ${msgId}`);
      throw err;
   }
}
