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

    // an array of character groups (upper/lowercase letters, numbers, special characters)
    const valuesByCategory = getCategories();
    if (valuesByCategory.length === 0) {
        alert('You didn\'t choose any categories.');
        return;
    }

    // piece together the password one character at a time
    const password = new Array(numChars);
    // a string with all the selected characters
    const flatValues = valuesByCategory.join('');

    // make sure all character groups are represented
    while (valuesByCategory.length > 0) {
        const passwordIndex = Math.floor(Math.random() * password.length);
        if (password[passwordIndex] !== undefined) {
            // avoid collisions with previous choices
            continue;
        }

        // choose one category, then choose a character from it, then add it to the password
        const categoryIndex = Math.floor(Math.random() * valuesByCategory.length)
        const categoryValues = valuesByCategory[categoryIndex];
        password[passwordIndex] = categoryValues[Math.floor(Math.random() * categoryValues.length)];

        // remove the category now that it's represented
        valuesByCategory.splice(categoryIndex, 1);
    }

    // fill in the rest of the array
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
            // null represents a cancel
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

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
