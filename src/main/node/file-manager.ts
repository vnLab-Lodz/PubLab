import fs from 'fs';
import path from 'path';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { selectDefaultDirPath } from '../../shared/slices/configurationSlice';
import { setPublicationList, addPublication } from '../../shared/slices/publicationsSlice';

const dispatch = useDispatch();

function isRepository(source: string): boolean {
  return fs.existsSync(path.join(source, '.git'));
}

function isPublication(source: string): boolean {
  return fs.existsSync(path.join(source, 'publication_config.json'));
}

function isDirectory(source: string): boolean {
  try {
    return fs.lstatSync(source).isDirectory();
  } catch (error) {
    return false;
  }
}

function getDirectories(source: string): string[] {
  var directories: string[] = [];
  try {
    const isDirectory = (source: string) => fs.lstatSync(source).isDirectory();
    directories = fs
      .readdirSync(source)
      .map((name) => path.join(source, name))
      .filter(isDirectory);
  } catch (error) {
    console.log(error);
  }
  return directories;
}

function recursiveSearch(path: string): void {
  if (isPublication(path)) {
    try {
      let rawdata = fs.readFileSync('publication_config.json');
      let dataParsed = JSON.parse(rawdata.toString());
      dispatch(addPublication({id: dataParsed.id, dirPath: path, publicationName: dataParsed.publicationName}));
    } catch(err) {}
  } else if (!isRepository(path)) {
    const availableDirectories: string[] = getDirectories(path);
    for (var i = 0; i < availableDirectories.length; i++) {
      recursiveSearch(availableDirectories[i]);
    }
  }
}

function findLocalPublications(): void {
  const path = useSelector(selectDefaultDirPath);

  if (fs.existsSync(path)) {
    if (isDirectory(path)) {
      recursiveSearch(path);
    }
  } 
}

export default {findLocalPublications, isDirectory, isPublication};
