document.getElementById('purchase-btn').addEventListener('click', function() {
    let price = 0; //define
    let cash = parseFloat(document.getElementById('cash').value);
    let cid = [0]; //define

    let changeDue = calculateChange(price, cash, cid);
    displayChange(changeDue);
});

function calculateChange(price, cash, cid) {
//define
}

function displayChange(changeDue) {
    //define
    let changeDiv = document.getElementById('change-due');

}
