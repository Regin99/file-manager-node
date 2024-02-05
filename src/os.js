import { cpus, EOL, userInfo, arch, homedir } from 'os';

export const handleOSInput = (args) => {
  switch (args) {
    case '--EOL':
      console.log(`Default system End-Of-Line:${EOL}`);
      break;
    case '--cpus':
      const output = cpus().map((cpu) => ({
        Model: cpu.model,
        'Clock rate': `${cpu.speed / 1000} GHz`
      }));
      console.table(output);
      break;
    case '--homedir':
      console.log(homedir());
      break;
    case '--username':
      console.log(`Your username is ${userInfo().username}`);
      break;
    case '--architecture':
      console.log(`Your architecture is ${arch()}`);
      break;
    default:
      console.log('Invalid input');
  }
};
