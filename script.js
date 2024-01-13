document.addEventListener("DOMContentLoaded", function() {
    const numbers = document.querySelectorAll('.number');
    const currentScreen = document.querySelector('.current');
    const prevScreen = document.querySelector('.previous');
    const operators = document.querySelectorAll('.operator');
    const equalsButton = document.querySelector('#equals');
    const clearButton = document.querySelector('#clear');
    const percentButton = document.querySelector('#percentage')
    const signButton = document.querySelector('#sign')
    clearButton.onclick = () => {
        currentScreen.textContent = '';
        prevScreen.textContent = '';
    };

    signButton.onclick = () => {
        const currentNumber = parseFloat(currentScreen.textContent);
        currentScreen.textContent = -currentNumber;
    };

    percentButton.onclick = () => {
        currentScreen.textContent = parseFloat(currentScreen.textContent) / 100
    }

    numbers.forEach(number => {
        number.onclick = () => {
            currentScreen.textContent += number.textContent;
        };
    });

    operators.forEach(operator => {
        operator.onclick = () => {
            prevScreen.textContent += currentScreen.textContent + operator.textContent;
            currentScreen.textContent = '';
        };
    });

    equalsButton.onclick = () => {
        try {
            let total = math.evaluate(prevScreen.textContent + currentScreen.textContent);
            prevScreen.textContent += currentScreen.textContent + '=';
            currentScreen.textContent = total;
        } catch (error) {
            console.error("Error in calculation:", error.message);
        }
    };
});
