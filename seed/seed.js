const {Outcome, Topic, Course} = require('../models/course.model.js')
const fs = require('fs')

const text = fs.readFileSync('./seed/OCRAoutcomes.md', 'utf-8')
const topicTexts = text.split('### ')
const course = new Course({title: "OCR Physics A"})
const outcomes = [];
for (let t of topicTexts) {
    let match = t.match(/(?<topicRef>\d\.\d\.\d)\s(?<topic>.+)/)
    if (match) {
        const {topicRef, topic} = match.groups;
        const matches  = t.matchAll(/\((?<ref>[a-z])\)\s(?<description>.*)/g)
        if (matches) {
            for (o of matches) {
                let {ref, description} = o.groups;
                description = description.replace('\n','')
                ref = topicRef+'.'+ref;
                const outcome = new Outcome({ref, description, topic})
                outcome.save()
                outcomes.push(outcome)
            }
        }
    }
}
course.outcomes = outcomes;
course.save();
console.log(`Added one course topics.`)