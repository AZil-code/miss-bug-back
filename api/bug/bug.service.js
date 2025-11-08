import { loggerService } from '../../services/logger.service.js';
import { makeId, readJsonFile, writeJsonFile } from '../../services/utils.js';

export const bugService = {
   query,
   getById,
   remove,
   save,
};

const bugs = readJsonFile('./data/bugs.json');

async function query(filterBy = {}, sortBy = {}) {
   try {
      if (sortBy.sortBy && bugs.length > 1) {
         const { sortBy: sortField, sortDir } = sortBy;
         switch (typeof bugs[0][sortField]) {
            case 'string':
               bugs.sort((a, b) => sortDir * a[sortField].localeCompare(b[sortField]));
               break;
            case 'number':
               bugs.sort((a, b) => sortDir * (a[sortField] - b[sortField]));
               break;
         }
      }
      return bugs;
   } catch (err) {
      loggerService.error(err);
      throw err;
   }
}

async function getById(bugId) {
   try {
      const bug = bugs.find((bug) => bug._id === bugId);
      if (!bug) throw new Error('Cannot find bug');
      return bug;
   } catch (err) {
      loggerService.error(err);
      throw err;
   }
}

async function remove(bugId) {
   try {
      const bugIdx = bugs.findIndex((bug) => bug._id === bugId);
      if (bugIdx < 0) throw new Error('Cannot find bug');
      bugs.splice(bugIdx, 1);
      await _saveBugsToFile();
      loggerService.debug('Delete bug success! ', bugId);
   } catch (err) {
      loggerService.error(err);
      throw err;
   }
}

async function save(bugToSave) {
   try {
      let logTxt;
      if (bugToSave._id) {
         const bugIdx = bugs.findIndex((bug) => bug._id === bugToSave._id);
         if (bugIdx < 0) throw new Error('Cannot find bug');
         bugs[bugIdx] = bugToSave;
         logTxt = 'updated';
      } else {
         bugToSave._id = makeId();
         bugs.push(bugToSave);
         logTxt = 'created';
      }
      await _saveBugsToFile();
      loggerService.debug(`Bug ${logTxt} - `, bugToSave);
      return bugToSave;
   } catch (err) {
      loggerService.error(err);
      throw err;
   }
}

function _saveBugsToFile() {
   return writeJsonFile('./data/bugs.json', bugs);
}
