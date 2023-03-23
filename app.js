'use strict'
const express = require("express")
const app = express()
const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({extended: true}))

app.set('view engine', 'ejs')
app.use(express.static("public"))
require('dotenv').config()
const _ = require('lodash')     // lodash - String kebabCase (Similar type of casing during comparison)
const {Task} = require('./db')



const homeStartingContent = "Keeping a record of your reading journey helps to keep you accountable and on track.  In addition, you can track your progress and see how far you’ve come, which is very motivating! You can also use your journal to look back at past books and reflect on them.  This can be especially helpful when re-reading a classic or beloved book.  You can see how much your thoughts have changed or remained the same. Reading journals is also great for improving your writing skills.  Writing about the book you’ve read allows you to practice summarizing, analyzing, and critiquing what you’ve read. Reading journals help build your literacy and comprehension skills, memory, and retention by tracking your progress and reflecting on what you’ve read."
const aboutContent = "The uniqueness of The Daily Journal lies in its non-partisan position, in the freedom it enjoys from any influence of political parties or vested groups. Its strength is in taking position of neutrality in conflicts between good and evil, justice and injustice, right and wrong, regardless of positions held by any group or alliance. The Daily Journal carries on with the long-term responsibility is to strengthen public opinion on how the democratic system should work and how to sustain and nurture democratic norms effectively. It was a privilege for The Daily Journal to be part of a changing scene after the fall of military autocrat in early 1990s. With that privilege came an enormous responsibility of upholding the duties of a free press. The newspaper is proud to pursue that policy without relenting for the past 23 years."
const contactContent = "The Daily Journal, 13/B, Kazi Nazrul Islam Avenue, Dhaka-1215"

const location = ['/about', '/contact', '/compose']
const file = ['about', 'contact', 'compose']

for(let i=0; i<location.length; i++){
    app.get(location[i], (req, res) => {

        res.render(file[i], {
            about_content: aboutContent,
            contact_content: contactContent,
        })
    })
}

app.get('/', (req, res) => {
    Task.find()
    .then(tasksData => {
        res.render('home', {
            home_content : homeStartingContent,
            tasks_data: tasksData
        })})
    .catch(err => {console.log(err.message)})
})

app.get('/posts/:topicName', (req, res) => {    // Express Route Parameters
    let found = 0

    Task.find()
    .then(tasksData => {
        tasksData.forEach((element) => {
            if(_.kebabCase(element.taskName) == _.kebabCase(req.params.topicName)){
                console.log('Successfully Matched!!')
                found = 1
                res.render('post', {
                    title: element.taskName,
                    body: element.taskBody                })
            } 
        })
        if(found==0) {
            console.log('Not a Match!!')
            res.redirect('/')
        }
    })
})

app.post('/compose', (req, res) => {
    const {task_name, task_body} = req.body

    const task1 = new Task({
        taskName: task_name,
        taskBody: task_body
    })

    task1.save()
    .then(() => console.log('New  task created.'))
    .catch(err => console.log(err.message))

    res.redirect('/')
})







const port = process.env.PORT || 3000
app.listen(port, () =>  console.log("Server started on port "+port))
