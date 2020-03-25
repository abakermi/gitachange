import test from 'ava'
import { tmpdir } from 'os'
const fs = require('fs')
const tmp = require('tmp')
const execa = require('execa')
const gitachange = require('../lib')
let tmpDir

test.before(async () => {
  tmpDir = tmp.dirSync().name

  await execa('git', ['init', tmpDir])
})

test('somd', async (t) => {
  // fs.writeFileSync(`${tmpDir}/file.txt`, 'content', (err)=>{ if(err) throw err})
  t.truthy(tmpDir)
})
