// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const generateMarkdown = require('./utils/generateMarkdown.js');
const fs = require('fs');
// TODO: Create an array of questions for user input
const questions = [
        {
            type: 'input',
            name: 'title',
            message: 'What is the title of your project? (Required)',
            validate: titleInput => {
                if (titleInput) {
                    return true;
                } else {
                    console.log('You need to enter a project name!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'description',
            message: 'Provide a short description explaining the what, why, and how of your project. (Required)',
            validate: descriptionInput => {
                if (descriptionInput) {
                    return true;
                } else {
                    console.log('You need to enter a project description!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'install',
            message: 'What are the steps required to install your project? Provide a step-by-step description of how to get the development environment running.'
        },
        {
            type: 'input',
            name: 'usage',
            message: 'Provide instructions and examples for use.'
        },
        {
            type: 'input',
            name: 'credits',
            message: 'List your collaborators, if any, with links to their GitHub profiles.'
        },
        {
            type: 'checkbox',
            name: 'license',
            message: 'Choose a licence',
            choices: ['none', 'MIT', 'ISC', 'GNU GPLv3'],
        }
    ];

// TODO: Create a function to write README file
const writeToFile = fileContent => {
    return new Promise((resolve, reject) => {
       fs.writeFile('./dist/README.md', fileContent, err => {
        if (err) {
            reject(err);
            return;
        }
        resolve({
            ok: true,
            message: 'File created'
        });
    });    
  });
};

// TODO: Create a function to initialize app
const init = () => {
    return inquirer.prompt(questions)
    .then(readmeData => {
        return readmeData;
    })
}

// Function call to initialize app
init()
.then(readmeData => {
    console.log(readmeData);
    return generateMarkdown(readmeData);
})
.then(pageMD => {
    return writeToFile(pageMD);
})
.then(writeFileResponse => {
    console.log(writeFileResponse.message);
})
.catch(err => {
    console.log(err);
})
