#!/usr/bin/env node

// This file is a proxy to @playwright/test/lib/cli to work around @playwright/test failing
// whenever a project also has the playwright package installed.
// See https://github.com/microsoft/playwright/issues/23314
require("@playwright/test/lib/cli");
