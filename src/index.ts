#!/usr/bin/env node
import { parse } from "./cli";

(async () => {
  await parse(process.argv);
})();
