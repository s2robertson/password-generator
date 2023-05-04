// Assignment Code
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
    var password = generatePassword();
    var passwordText = document.querySelector("#password");

    passwordText.value = password;
}

const categories = [
    {
        name: 'uppercase letters',
        values: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    }, {
        name: 'lowercase letters',
        values: 'abcdefghijklmnopqrstuvwxyz'
    }, {
        name: 'numbers',
        values: '0123456789'
    }, {
        name: 'special characters',
        values: '!"#$%&\'()*+,-./:;<=>?@[\]^_`{|}~'
    }
];

function generatePassword() {
    const numChars = getNumChars();
    if (!numChars) {
        return;
    }

    const valuesByCategory = getCategories();
    if (valuesByCategory.length === 0) {
        alert('You didn\'t choose any categories.');
        return;
    }

    const password = new Array(numChars);
    const flatValues = valuesByCategory.join('');

    while (valuesByCategory.length > 0) {
        const passwordIndex = Math.floor(Math.random() * password.length);
        if (password[passwordIndex] !== undefined) {
            continue;
        }

        const categoryIndex = Math.floor(Math.random() * valuesByCategory.length)
        const categoryValues = valuesByCategory[categoryIndex];
        password[passwordIndex] = categoryValues[Math.floor(Math.random() * categoryValues.length)];
        valuesByCategory.splice(categoryIndex, 1);
    }

    for (let i = 0; i < password.length; i++) {
        if (password[i] !== undefined) {
            continue;
        }

        password[i] = flatValues[Math.floor(Math.random() * flatValues.length)];
    }

    return password.join('');
}

function getNumChars() {
    while (true) {
        const numChars = parseInt(prompt('How many characters should the password be? (Min: 8, Max: 128)', ''));
        if (numChars === null || (numChars >= 8 && numChars <= 128)) {
            return numChars;
        }
    }
}

function getCategories() {
    let valuesByCategory = [];
    categories.forEach(category => {
        if (confirm(`Should the password include ${category.name}?`)) {
            valuesByCategory.push(category.values);
        }
    });
    return valuesByCategory;
}

function generatePasswordFromValues(numChars, valuesByCategory) {
    
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
