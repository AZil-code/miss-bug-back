import { loggerService } from '../../services/logger.service.js';
import { msgService } from './msg.service.js';

export async function addMsg(req, res) {
   const { txt, aboutBugId, byUserId } = req.body;
   const loggedinUser = req.loggedinUser;
   try {
      const msg = await msgService.add({ txt, aboutBugId, byUserId }, loggedinUser);
      res.send(msg);
   } catch (err) {
      loggerService.error('Cannot add msg', err);
      res.status(404).send('Cannot create msg!');
   }
}

export async function updateMsg(req, res) {
   const { txt } = req.body;
   const loggedinUser = req.loggedinUser;
   try {
      const msg = await msgService.update({ txt }, loggedinUser);
      loggerService.debug('Updated msg', msg);
      res.send(msg);
   } catch (err) {
      loggerService.error('Cannot update msg', err);
      res.status(400).send('Cannot update msg!');
   }
}

export async function removeMsg(req, res) {
   const { msgId } = req.params;
   const loggedinUser = req.loggedinUser;
   try {
      res.send(await msgService.remove(msgId, loggedinUser));
   } catch (err) {
      loggerService.error('Cannot remove msg', err);
      res.status(404).send('Cannot remove msg');
   }
}
