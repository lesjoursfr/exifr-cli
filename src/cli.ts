import yargs from "yargs";
import { hideBin } from "yargs/helpers";

export const parse = (argv: string[]) => {
  return yargs(hideBin(argv))
    .help()
    .alias("help", "h")
    .commandDir("commands", {
      extensions: process.env.NODE_ENV === "development" ? ["js", "ts"] : ["js"],
    })
    .locale("en")
    .parse();
};
