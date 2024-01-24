class calculator {
    constructor(prevScreen, currentScreen) {
        this.prevScreen = prevScreen
        this.currentScreen = currentScreen
        this.clear()
    }

    clear() {
        this.currentScreen.textContent = ''
        this.prevScreen.textContent = ''
    }

    checkforDecimal(number) {
        if (number.textContent == '.' && this.currentScreen.textContent.slice(-1) == '.') {
            return true
        }
        return false;
    }

    checkforEquals() {
        if (this.prevScreen.textContent.slice(-1) == '=') {
            this.prevScreen.textContent = ''
        }
    }


    checkforEmpty() {
        if(this.currentScreen.textContent == '') return true
        return false
    }

    appendNumber(number) {
        this.checkforEquals()
        if (this.checkforDecimal(number)) return
        this.currentScreen.textContent += number.textContent
    }

    appendSign(sign) {
        this.checkforEquals()
        if (this.checkforEmpty()) return
        this.prevScreen.textContent += this.currentScreen.textContent + sign.textContent
        this.currentScreen.textContent = ''
    }

    changeSign() {
        this.checkforEquals()
        if(this.checkforEmpty()) return
        let currentNum = this.currentScreen.textContent
        
        if(currentNum.charAt(0) == '(' && currentNum.charAt(currentNum.length - 1) == ')')
        {
            this.currentScreen.textContent = currentNum.slice(2, currentNum.length - 1)
        }
        else{
            this.currentScreen.textContent = `(-${this.currentScreen.textContent})`
        }
    }

    toPercentage() {
        this.checkforEquals()
        this.currentScreen.textContent = parseFloat(this.currentScreen.textContent) / 100
    }

    calculate() {
        try {
            let total = math.evaluate(this.prevScreen.textContent + this.currentScreen.textContent)
            this.prevScreen.textContent += this.currentScreen.textContent + '='
            this.currentScreen.textContent = total
        } catch (error) {
            console.error("Error in calculation:", error.message)
        }
    }
}



document.addEventListener("DOMContentLoaded", function () {
    const numbers = document.querySelectorAll('.number')
    const currentScreen = document.querySelector('.current')
    const prevScreen = document.querySelector('.previous')
    const operators = document.querySelectorAll('.operator')
    const equalsButton = document.querySelector('#equals')
    const clearButton = document.querySelector('#clear')
    const percentButton = document.querySelector('#percentage')
    const signButton = document.querySelector('#sign')

    const calc = new calculator(prevScreen, currentScreen)


    clearButton.onclick = () => {
        calc.clear()
    }

    signButton.onclick = () => {
        calc.changeSign()
    }

    percentButton.onclick = () => {
        calc.toPercentage()
    }

    numbers.forEach(number => {
        number.onclick = () => {
            calc.appendNumber(number)
        }
    })

    operators.forEach(operator => {
        operator.onclick = () => {
            calc.appendSign(operator)
        }
    })

    equalsButton.onclick = () => {
        calc.calculate()
    }
})
