function generateMatrices() {
    createMatrix('The 1st Matrix', 'matrix1', document.getElementById('matrix1Rows').value, document.getElementById('matrix1Cols').value);
    createMatrix('The 2nd Matrix','matrix2', document.getElementById('matrix2Rows').value, document.getElementById('matrix2Cols').value);
}

const createMatrix = (title, containerId, rows, cols) => {
    let container = document.getElementById(containerId);
    container.innerHTML = ''; // Clear previous content
    let table = document.createElement('table');
    for (let i = 0; i < rows; i++) {
        let tr = document.createElement('tr');
        for (let j = 0; j < cols; j++) {
            let td = document.createElement('td');
            let input = document.createElement('input');
            input.type = 'number';
            input.value = Math.floor(Math.random() * 100); // Random value between 0 and 99
            td.appendChild(input);
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    let caption = table.createCaption();
    caption.textContent = title;
    container.appendChild(table);
};

const showResult = (title, containerId, rows, cols, dataArray) => {
    let container = document.getElementById(containerId);
    container.innerHTML = ''; // Clear previous content
    let table = document.createElement('table');

    for (let i = 0; i < rows; i++) {
        let tr = document.createElement('tr');
        for (let j = 0; j < cols; j++) {
            let td = document.createElement('td');
            let span = document.createElement('span');
            // Calculate the index in the dataArray based on current row and column
            let index = i * cols + j;
            if (index < dataArray.length) {
                span.innerHTML = dataArray[index];
            }
            td.appendChild(span);
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }

    let caption = table.createCaption();
    caption.textContent = title;
    container.appendChild(table);
};

const showResult2D = (title, containerId, dataArray) => {
    const container = document.getElementById(containerId);
    container.innerHTML = ''; // Clear previous content

    const table = document.createElement('table');
    const caption = document.createElement('caption');
    caption.textContent = title;
    table.appendChild(caption);

    for (let i = 0; i < dataArray.length; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < dataArray[i].length; j++) {
            const cell = document.createElement('td');
            cell.textContent = dataArray[i][j];
            row.appendChild(cell);
        }
        table.appendChild(row);
    }

    container.appendChild(table);
};


function performOperation(operation) {
    let matrix1 = getMatrixData2D('matrix1');
    let matrix2 = getMatrixData2D('matrix2');
    console.log("1st Matrix",matrix1);
    console.log("2nd Matrix", matrix2);
    console.log("Operation", operation);
    // Just a test result
    //let result = [1, 2, 3, 4, 5, 6, 7, 8];
    if (operation =="add"){
        result = addMatrices(matrix1, matrix2);
    } else if (operation == "multiply"){
       result =  multiplyMatrices (matrix1, matrix2);
    }else if (operation == "subtract"){
        result = subtractMatrices (matrix1, matrix2);
    }else {
        console.log ("invalid operation, please try again :(")
    }
    // Call your matrix calculation functions here
    // For example: if (operation === 'add') { addMatrices(matrix1, matrix2); }
	// prints suitable messages for impossible situation
    showResult2D('The Result', 'matrix3', result); // use suitable function for printing results
}

const getMatrixData1D = function (matrixId) {
    let matrixData = [];
    let inputs = document.querySelectorAll(`#${matrixId} input`);
    inputs.forEach(input => {
        matrixData.push(parseInt(input.value, 10));
    });
    return matrixData;
};

const getMatrixData2D = function (matrixId) {
    let matrixData = [];
    let rows = parseInt(document.getElementById(matrixId + 'Rows').value, 10);
    let cols = parseInt(document.getElementById(matrixId + 'Cols').value, 10);
    let inputs = document.querySelectorAll(`#${matrixId} input`);

    for (let i = 0; i < rows; i++) {
        let rowData = [];
        for (let j = 0; j < cols; j++) {
            // Calculate index in the flat list of inputs
            let index = i * cols + j;
            if (index < inputs.length) {
                rowData.push(parseInt(inputs[index].value, 10));
            } else {
                rowData.push(0); // Default value if input is missing
            }
        }
        matrixData.push(rowData);
    }
    return matrixData;
};


// Add your matrix calculation functions here
// The functions must check the posibility of calculation too.

// Helper functions to check matrix compatibility for addition and multiplication
function areCompatible(matrix1, matrix2) {
    if (matrix1.length !== matrix2.length || matrix1[0].length !== matrix2[0].length) {
        return false;
    }
    return true;
} // in order to have appropiate opperations the matrixes must have equal dimentions both in rows and columns

function canMultiply(matrix1, matrix2) {
    if (matrix1[0].length !== matrix2.length) {
        return false;
    }
    return true;
}
function addMatrices(matrix1, matrix2) {
    if (!Compatible(matrix1, matrix2)) {
        return "Matrices are not compatible for addition.";
    }

    let result = [];
    let i = 0;
    while (i < matrix1.length) {
        let row = [];
        let j = 0;
        while (j < matrix1[i].length) {
            row.push(matrix1[i][j] + matrix2[i][j]);
            j++;
        }
        result.push(row);
        i++;
    }
    return result;
}

const subtractMatrices = function(matrix1, matrix2) {
    if (!areCompatible(matrix1, matrix2)) {
        return "Matrices are not compatible for subtraction.";
    }

    let result = [];
    let i = 0;
    while (i < matrix1.length) {
        let row = [];
        let j = 0;
        while (j < matrix1[i].length) {
            row.push(matrix1[i][j] - matrix2[i][j]);
            j++;
        }
        result.push(row);
        i++;
    }
    return result;
};

const multiplyMatrices = function (matrix1, matrix2) {
    if (!canMultiply(matrix1, matrix2)) {
        return "Matrices are not compatible for multiplication.";
    }

    let result = [];
    let i = 0;
    while (i < matrix1.length) {
        let row = [];
        let j = 0;
        while (j < matrix2[0].length) {
            let sum = 0;
            let k = 0;
            while (k < matrix1[0].length) {
                sum += matrix1[i][k] * matrix2[k][j];
                k++;
            }
            row.push(sum);
            j++;
        }
        result.push(row);
        i++;
    }
    return result;
}



