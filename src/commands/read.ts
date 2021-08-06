import Table from 'cli-table';
import { parse } from 'exifr';
import { Arguments, Argv } from 'yargs';

type Options = {
	file: string;
};

export const command: string = 'read <file>';
export const desc: string = 'Read exif data of the file <file>';

export const builder = (yargs: Argv): Argv => {
	return yargs
		.positional('file', { type: 'string', demandOption: true });
};

export const handler = async (argv: Arguments<Options>): Promise<void> => {
	const { file } = argv;

	try {
		let parsed = await parse(file, {
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

		let table = new Table({
			head: ['Group', 'Field', 'Value'],
			colWidths: [10, 30, 140]
		});

		for (const [groupKey, group] of Object.entries<[string, Object]>(parsed)) {
			for (const [metadata, value] of Object.entries<Object>(group)) {
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