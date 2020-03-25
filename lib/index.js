
'use strict'

const Listr = require('listr')
const execa = require('execa')

const isDirectoryChanged = async () => {
  const { stdout, stderr } = await execa('git', ['status', '--porcelain'])
  if (stdout) {
    return false
  }

  throw new Error(stderr)
}

const addChangedFiles = async (files) => {
  const { stdout, stderr } = await execa('git', ['add', files])
  if (stdout === '') {
    return true
  }

  throw new Error(stderr)
}

const commitFiles = async (m) => {
  console.log(`message ${m}`)
  const { stdout, stderr } = await execa('git', ['commit', '-m', m])
  if (stdout !== '') {
    return true
  }

  throw new Error(stderr)
}

module.exports = options => {
  if (!options.files) {
    throw new Error('no changes to add ')
  }
  const tasks = [
    {
      title: 'Check changes',
      task: () => isDirectoryChanged()
    },
    {
      title: 'Add files',
      task: () => addChangedFiles(options.files)
    },
    {
      title: 'Commit files',
      task: () => commitFiles(options.message)
    }
  ]
  const task = new Listr(tasks)
  task.run().catch(error => {
    throw error
  })
}
