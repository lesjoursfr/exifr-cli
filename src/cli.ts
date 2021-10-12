import yargs from 'yargs';

export const parse = (argv: readonly string[]) => {
  return yargs(argv.slice(2))
    .help().alias('help', 'h')
    .commandDir('commands', {
      extensions: process.env.NODE_ENV === 'development' ? ['js', 'ts'] : ['js']
    })
    .locale('en')
    .argv;
};
