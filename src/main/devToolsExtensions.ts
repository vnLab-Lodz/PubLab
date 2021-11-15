import installExtension, {
  REDUX_DEVTOOLS,
  REACT_DEVELOPER_TOOLS,
} from 'electron-devtools-installer';

export default async function installDevToolsExtensions(): Promise<void> {
  await installExtension([REDUX_DEVTOOLS, REACT_DEVELOPER_TOOLS])
    .then(() => console.log('Dev tools extensions installed successfully'))
    .catch((err) =>
      console.error(
        'An error occurred while installing dev tools extensions: ',
        err
      )
    );
}
