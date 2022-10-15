const {Course, Category} = require('../models/course.model.js')
const fs = require('fs');
const { text } = require('express');


// DATABASE
//Set up default mongoose connection
// mongoose.connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// });

const arrObjs = (data) => data.reduce((acc, o, i, arr) => {
    // takes an array and returns an object from alternating key-value pairs
    if(i % 2 === 0){;
      acc.push({[o]: arr[i + 1]})
    }
    return acc;
}, []);
  
function mdToArrayOfObjects(md, level) {
    // takes a string and returns an array of alternating headers and content
    const regex = new RegExp(`^#${level}(?!#)\\s(.*)$`, 'gm');
    const arr = md.split(regex);
    console.log(arr[1]);
    arr.shift();
    return arr;
}

function getHeadersByLevel(md, level) {
    const regex = new RegExp(`^#{${level}}\\s(.*)$`, 'gm');
    // console.log(md.match(regex.groups));
    return md.match(regex).map(str => str.replace(`${'#'.repeat(level)} `, ""));
}

function mdObj(md) {
    let output = mdToArrayOfObjects(md, 1);
    // console.log(output);
    function recurse(arrOfObjects) {
        for (obj in arrOfObjects) {
            const str = Object.values(obj)[0];
            // console.log(str);
        }
    }
    return recurse(output);
}

const md = fs.readFileSync('./seed/OCRAoutcomes.md', 'utf-8')
const headerRe = (level) => new RegExp(`^#{${level}}\\s(.*)$`, 'gm')

let categories = md.match(/^#+\s.*$/gm);
categories = categories.map(category => category.match(/^#+\s(?<ref>(\d\.?)+)\s(?<description>.*)$/m).groups)
for (category in categories) {
    category.children = 
}
