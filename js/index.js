(function () {

    var calculator = {
        num: '0',
        result: '',
    };

    let Header = document.querySelector('.header');
    let Num = document.querySelector('.num');
    let Result = document.querySelector('.result');
    let Numbers = document.querySelectorAll('.number');
    let Delete = document.querySelector('.delete');
    let Clear = document.querySelector('.clear');
    let Add = document.querySelector('.add');
    let Min = document.querySelector('.min');
    let Mul = document.querySelector('.mul');
    let Division = document.querySelector('.division');
    let Equal = document.querySelector('.equal');
    let Point = document.querySelector('.point');
    let Percent = document.querySelector('.percent');

    const RESULT_WIDTH = 1 - 0.08 * 2;
    let operators = ['+', '-', '×', '÷'];


    Percent.addEventListener('click', function () {
        if (!isNaN(calculator.num)) {
            calculator.num = calculator.num * 0.01;
        }
        setNum(calculator.num);
    });

    Clear.addEventListener('click', function () {
        calculator.num = '0';
        calculator.result = '';
        setNum(calculator.num);
        resultNum(calculator.result);
    });

    Delete.addEventListener('click', function () {
        if (calculator.num.length === 1) {
            calculator.num = '0';
            calculator.result = '';
        } else {
            calculator.num = calculator.num.slice(0, -1);
        }
        setNum(calculator.num);
        resultNum(calculator.result);
    });



    function handleOperators(operator) {
        return function () {
            let operator = event.target.dataset.operator;
            if (operators.indexOf(calculator.num[calculator.num.length - 1]) > -1) {
                setNum(calculator.num.slice(0, calculator.num.length - 1) + operator);
            } else {
                setNum(calculator.num += operator);
            }
        }
    }

    Add.addEventListener('click', handleOperators('+'));
    Min.addEventListener('click', handleOperators('-'));
    Mul.addEventListener('click', handleOperators('×'));
    Division.addEventListener('click', handleOperators('÷'));

    Point.addEventListener('click', function () {
        if (calculator.num.endsWith('.')) return;
        if (operators.indexOf(calculator.num[calculator.num.length - 1]) > -1) return;
        if (calculator.num.indexOf('.') === -1) {
            return setNum(calculator.num += '.');
        }
        let rest = calculator.num.slice(calculator.num.lastIndexOf('.') + 1);
        if (
            operators
                .map(function (operator) { return rest.indexOf(operator) > -1; })
                .every(function (result) { return result === false; })
        ) return;

        setNum(calculator.num += '.');

    });


    Equal.addEventListener('click', function () {
        if (operators.indexOf(calculator.num[calculator.num.length - 1]) > -1) {
            calculator.result = eval(calculator.num.slice(0, -1));
            //resultNum(eval(calculator.num));
        } else {
            resultNum(eval(calculator.num));
        }
        setNum(eval(calculator.num));
    });



    for (let number of Numbers) {
        number.addEventListener('click', function (event) {
            var n = event.currentTarget.innerText;
            if (calculator.num === '0') {
                calculator.num = n;
            } else {
                calculator.num += n;
            }
            setNum(calculator.num);
        });
    }

    function setNum(value) {
        calculator.num = String(value);
        Num.innerText = calculator.num;
        size();
        sizeResult();
    }
    setNum(calculator.num);

    function resultNum(value) {
        calculator.result = String(value)
        Result.innerHTML = calculator.result;
        size();
        sizeResult();
    }
    resultNum(calculator.result);


    function size() {
        let maxWidth = RESULT_WIDTH * Header.clientWidth;
        if (Num.scrollWidth > maxWidth) {
            Num.style.transform = `scale(${(maxWidth / Num.scrollWidth)})`;
            Num.style.transformOrigin = 'right center';
        }
        else {
            Num.style.transform = `scale(1)`;

        }
    }

    function sizeResult() {
        let maxWidth = RESULT_WIDTH * Header.clientWidth;
        if (Result.scrollWidth > maxWidth) {
            Result.style.transform = `scale(${(maxWidth / Result.scrollWidth)})`;
            Result.style.transformOrigin = 'right center';
        }
        else {
            Result.style.transform = `scale(1)`;
        }
    }

})();