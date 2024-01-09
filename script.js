const price = 19.5; 

document.getElementById('purchase-btn').addEventListener('click', function() {
    let cash = parseFloat(document.getElementById('cash').value);
    let cid = [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]];

    if (cash < price) {
        alert("Customer does not have enough money to purchase the item");
    } else {
        let changeDue = calculateChange(price, cash, cid);
        displayChange(changeDue);
    }
});

function calculateChange(price, cash, cid) {
    if (cash === price) {
        return "No change due - customer paid with exact cash";
    }

    let change = cash - price;
    // Logic to calculate change from cid
    let changeArr = [];
    let totalCid = 0;

    const currencyValue = {
        "PENNY": 0.01,
        "NICKEL": 0.05,
        "DIME": 0.10,
        "QUARTER": 0.25,
        "ONE": 1.00,
        "FIVE": 5.00,
        "TEN": 10.00,
        "TWENTY": 20.00,
        "ONE HUNDRED": 100.00
    };

    // Calculate total cash-in-drawer
    cid.forEach(coin => totalCid += coin[1]);

    if (totalCid < change || totalCid === 0) {
        return "Status: INSUFFICIENT_FUNDS";
    } else if (totalCid === change) {
        return "Status: CLOSED";
    } else {
        cid.reverse().forEach(coin => {
            let coinValue = currencyValue[coin[0]];
            let coinAmount = 0;
            while (change >= coinValue && coin[1] > 0) {
                change -= coinValue;
                coin[1] -= coinValue;
                coinAmount += coinValue;
                change = Math.round(change * 100) / 100;
            }
            if (coinAmount > 0) {
                changeArr.push([coin[0], coinAmount]);
            }
        });

        if (change > 0) {
            return "Status: INSUFFICIENT_FUNDS";
        } else {
            let result = "Status: OPEN ";
            changeArr.forEach(c => {
                result += `${c[0]}: $${c[1].toFixed(2)} `;
            });
            return result.trim();
        }
    }
}

function displayChange(changeDue) {
    let changeDiv = document.getElementById('change-due');
    changeDiv.innerHTML = changeDue;
}
