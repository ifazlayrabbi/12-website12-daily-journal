
const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://'+process.env.user+':'+process.env.pass+'@cluster0.pbwxcxc.mongodb.net/dailyJournal')
// mongoose.connect('mongodb://127.0.0.1:27017/dailyJournal')



const taskSchema = mongoose.Schema({
  taskName: {
    type: String,
    required: [true, 'Task name missing!']
  },
  taskBody: {
    type: String,
    required: [true, 'Task body missing!']
  }
})
const Task = mongoose.model('Task', taskSchema)
exports.Task = Task

