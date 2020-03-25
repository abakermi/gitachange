'use strict'
const meow = require('meow')
const logsymbol = require('log-symbols')
const gitac = require('../lib')

const cli = meow(`
    Usage
      $ gitac [<pathspec>…​] -m <message> 
 
    Required
      --message, -m  Message of commit
 
    Examples
      $ gitac add files1.js -m "init"
`, {
  flags: {
    message: {
      type: 'string',
      alias: 'm'
    }
  }
})
const input = cli.input
const flags = cli.flags
if (!input.length) {
  throw new Error(`${logsymbol.error} you must includes files to changes`)
}
if (!flags.message) {
  throw new Error(`${logsymbol.error} commit message missing`)
}

const options = {
  files: input,
  message: flags.message
}

gitac(options)
