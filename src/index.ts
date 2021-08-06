import { parse } from "./cli";

(async () => {
	const argv = await parse(process.argv);
})();