import * as fs from 'fs';
import * as path from 'path';

/**
 * Copy the specified file to a backup folder with the current date as the filename.
 *
 * @param {string} originalPath - The path of the file to copy.
 * @param {string} backupFolder - The path of the backup folder.
 */
function copyAndRenameFile(originalPath: string, backupFolder: string) {
  const currentDate = new Date();
  const formattedDate = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;
  const backupFilePath = path.join(backupFolder, `${formattedDate}.json`);

  fs.copyFile(originalPath, backupFilePath, (err) => {
    if (err) {
      console.error('Error while copying the file', err);
    } else {
      console.log(`Backup of ${originalPath} created at ${backupFilePath}`);
    }
  });
}

/**
 * Create backups of the data files.
 */
export function backupFiles() {
  const areaFileOriginal = './data/species_by_area.json';
  const dateFileOriginal = './data/species_by_date.json';

  const areaFolderBackup = './data/backups/area/';
  const dateFolderBackup = './data/backups/date/';

  copyAndRenameFile(areaFileOriginal, areaFolderBackup);
  copyAndRenameFile(dateFileOriginal, dateFolderBackup);
}
