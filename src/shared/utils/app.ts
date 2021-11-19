import { app as mainApp, remote } from 'electron';

const isRenderer = process && process.type === 'renderer';

const app = isRenderer ? remote.app : mainApp;
export default app;
