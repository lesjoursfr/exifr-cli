import Table from 'cli-table';
import { parse } from 'exifr';
import { Arguments, Argv } from 'yargs';

type Options = {
  file: string;
};

export const command = 'read <file>';
export const desc = 'Read exif data of the file <file>';

export const builder = (yargs: Argv): Argv => {
  return yargs
    .positional('file', { type: 'string', demandOption: true });
};

export const handler = async (argv: Arguments<Options>): Promise<void> => {
  const { file } = argv;

  try {
    const parsed = await parse(file, {
      tiff: true,
      xmp: true,
      icc: true,
      iptc: true,
      jfif: true, // (jpeg only)
      ihdr: true, // (png only)
      ifd1: false, // aka thumbnail
      exif: true,
      gps: true,
      mergeOutput: false,
      sanitize: true,
      reviveValues: true,
      translateKeys: true,
      translateValues: true
    });

    const table = new Table({
      head: ['Group', 'Field', 'Value'],
      colWidths: [10, 30, 140]
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    for (const [groupKey, group] of Object.entries<[string, any]>(parsed)) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      for (const [metadata, value] of Object.entries<any>(group)) {
        table.push([groupKey, metadata, value]);
      }
    }

    console.log(table.toString());
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
