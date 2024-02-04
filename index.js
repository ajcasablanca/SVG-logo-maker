const fs = require('fs');
const inquirer = require('inquirer');
const { Circle, Square, Triangle } = require('./lib/shapes');

const questions = [
    {
        type: 'input',
        name: 'text',
        message: 'Enter text for logo (please enter 3 characters)',

        validate: (response) => {
            if (response.length > 3) {
                console.log("\n Text must be three characters or less! Please try again ");
                return;
            }
            return true;
        }

    },

    {
        type: 'input',
        name: 'textColor',
        message: 'Enter color keyword  or a hexadecimal number of the text',

    },
    {
        type: 'list',
        name: 'shapeType',
        message: 'Select shape of the logo',
        choices: ['Circle', 'Square', 'Triangle'],

    },
    {
        type: 'input',
        name: 'shapeColor',
        message: 'Enter color keyword  or a hexadecimal number of the text',

    },

];
inquirer.prompt(questions)
    .then((response) => {
        const text = response.text;
        const textColor = response.textColor;
        const shapeType = response.shapeType;
        const shapeColor = response.shapeColor;

        generateShapes(text, textColor, shapeType, shapeColor);
    })
    .catch((err) => console.log(err));

function generateShapes(text, textColor, shapeType, shapeColor) {
    let shape;

    if (shapeType === 'Circle') {
        shape = new Circle(text, textColor, shapeColor);
    } else if (shapeType === 'Triangle') {
        shape = new Triangle(text, textColor, shapeColor);
    } else if (shapeType === 'Square') {
        shape = new Square(text, textColor, shapeColor);
    }

    if (shape) {
        fs.writeFile('logo.svg', shape.render(), (err) => {
            if (err) {
                console.error('Error generating logo:', err);
            } else {
                console.log('Generated logo.svg!');
            }
        });
    } 
}
