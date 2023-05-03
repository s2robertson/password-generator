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
    let numChars = 0;
    while (true) {
        numChars = parseInt(prompt('How many characters should the password be? (Min: 8, Max: 128)', ''));
        if (numChars === null) {
        return;
        } else if (numChars >= 8 && numChars <= 128) {
        break;
        }
    }

    let values = '';
    let ensure = [];
    categories.forEach(category => {
        const include = confirm(`Should the password include ${category.name}?`);
        if (include) {
            values += category.values;
            ensure.push(category.values);
        }
    });
    if (ensure.length === 0) {
        alert('You didn\'t choose any characters.');
        return;
    }

    let password = new Array(numChars);
    while (ensure.length > 0) {
        const ensureIndex = Math.floor(Math.random() * ensure.length)
        const categoryValues = ensure[ensureIndex];
        const value = categoryValues[Math.floor(Math.random() * categoryValues.length)];
        const passIndex = Math.floor(Math.random() * password.length);

        if (password[passIndex] !== undefined) {
            continue;
        }
        password[passIndex] = value;
        ensure.splice(ensureIndex, 1);
    }

    for (let i = 0; i < password.length; i++) {
        if (password[i] !== undefined) {
            continue;
        }

        password[i] = values[Math.floor(Math.random() * values.length)];
    }

    return password.join('');
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
