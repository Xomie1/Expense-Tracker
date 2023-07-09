// All Variable Declerations

const budget = document.getElementById("balance-amount");
const currentAmount = document.getElementById("currentAmount");
const expense = document.getElementById("expenseAmount")
const add_budget_btn = document.getElementById("addBudget");
const add_expense_btn = document.getElementById("addExpense");
const budgetFeild = document.getElementById("budgetAmount");
const expenseTitle = document.getElementById("expTitle");
const expenseDesc = document.getElementById("expDesc");
const expenseAmount = document.getElementById("expAmount");
const expenseList = document.getElementById("expenseList");
const deleteBtn = document.getElementById("delete");
const resetWindow = document.getElementById("reset");
const date = document.getElementById("date");
let budgetNumber, expenseNumber;
let expArray = [];


// Add Budget To Respective Feilds 

add_budget_btn.addEventListener(
    'click', (e) => {
        e.preventDefault();
        if (budgetFeild.value > 0) {
            budget.innerText = `NGN ${Number(budgetFeild.value).toFixed(2)}`;
            currentAmount.innerText = `NGN ${Number(budgetFeild.value).toFixed(2)}`;
            budgetNumber = Number(budgetFeild.value);
            expenseAmount.innerText = 'NGN 00,00';
            expense.innerText = `NGN 00,000`;
            expArray.length = 0;

        }
        else
            alert("Please Enter Your Budget Amount..");
    }
);

// Function to Create Expense List

const createExpenseList = (title, desc, amount, date) => {
    let item = document.createElement("li");
    item.className = 'item flex';

    item.innerHTML = `
   <div class="list-expense-title-desc text-ellises flex">
            <div class="flex fl-col list-text">
                <div class="list-expense-title">${title}</div>
                <div class="list-expense-desc">${desc}</div>
            </div>
            <div class="list-expense-amount flex fl-col">
                <span>${amount}</span>
                <div class="date">${date}</div>
            </div>
        </div>
            <button id="edit"><ion-icon name="create-outline"></ion-icon></button>
            <button id="delete">X</button>
    `;

    expenseList.appendChild(item);

    // Function to Delete Expense Items 

    item.querySelector("#delete").addEventListener(
        'click', () => {
            item.remove();

            let expenditure = parentElement.querySelector("span").innerText;

            budgetNumber = parseInt(budgetNumber) + parseInt(expenditure);
            expenseNumber = expenseNumber - parseInt(expenditure);
            expArray = [expenseNumber];

            currentAmount.innerText = `NGN ${parseInt(budgetNumber).toFixed(2)}`;
            expense.innerText = `NGN ${(expenseNumber).toFixed(2)}`;

            // console.log(budgetNumber,expenseNumber, expenditure);

        }
    );

    // Function to Modify list Value 

    let parentElement = item.querySelector("#edit").parentNode;

    item.querySelector("#edit").addEventListener(
        'click', () => {

            let flag = confirm("You want to edit the expense list?");
            if (flag) {

                let editedTitle = prompt("Please Enter the Title.");
                let editedDesc = prompt("Enter the Description.");
                let editedAmount = +prompt("Please Enter the Amount.");

                if (editedAmount < (budgetNumber + expenseNumber)) {
                    parentElement.querySelector(".list-expense-title").innerText = editedTitle;
                    parentElement.querySelector(".list-expense-desc").innerText = editedDesc;
                    parentElement.querySelector("span").innerText = editedAmount;

                    budgetNumber = (budgetNumber + Number(amount)) - editedAmount;
                    expenseNumber = (expenseNumber - Number(amount)) + editedAmount;
                    expArray = [expenseNumber];
                    currentAmount.innerText = `NGN ${Number(budgetNumber).toFixed(2)}`;
                    expense.innerText = `NGN ${(expenseNumber).toFixed(2)}`;

                    console.log(budgetNumber);
                }
                else
                    alert("You dont have enough balance.");
            }
        }
    )
}



// Array that have multiple objects in their respective index containing list data

let arrOfItems = [];
var index = 0;

// Class To create the List data as an Object then we push this data to our array 

class List_data {
    constructor(title, desc, amount, date) {
        this.title = title;
        this.desc = desc;
        this.amount = amount;
        this.date = date;
    }
}

//  Add Expense to Respective Feilds 

add_expense_btn.addEventListener('click', (e) => {
    e.preventDefault();
  
    if (budget.innerText === "NGN 00,000.00")
      alert("Please Add Budget First!");
    else {
      if (expenseTitle.value.length > 0 && expenseDesc.value.length > 0 && expenseAmount.value > 0 && date.value.length > 0) {
  
        if (budgetNumber >= expenseAmount.value) {
          let expenseItem = new List_data(expenseTitle.value, expenseDesc.value, expenseAmount.value, date.value);
          arrOfItems.push(expenseItem);
  
          createExpenseList(arrOfItems[index].title, arrOfItems[index].desc, arrOfItems[index].amount, arrOfItems[index].date);
          expArray.push(Number(expenseAmount.value));
          index++;
  
          expenseNumber = Number(expenseAmount.value);
        }
  
        console.log(expenseNumber);
        updateBudget();
        reset();
      }
    }
    updateChart();
  });

// Function To Calculate Budget and Expense:

const updateBudget = () => {

    if (budgetNumber >= expenseAmount.value) {
        let currentBalanceNumber = budgetNumber - expenseNumber;
        budgetNumber = currentBalanceNumber;
        let currentExpenceNumber = expArray.reduce(
            (a, b) => {
                return a + b;
            }
        );
        expenseNumber = currentExpenceNumber;
        currentAmount.innerText = `NGN ${(currentBalanceNumber).toFixed(2)}`;
        expense.innerText = `NGN ${(currentExpenceNumber).toFixed(2)}`;
    }

    else
        alert("You Dont Have Enough balance");
}


//Add Button To Reload Page

resetWindow.addEventListener(
    'click', () => {
        location.reload();
    }
);

// Reset Function

function reset() {
    budgetFeild.value = "";
    expenseAmount.value = "";
    expenseDesc.value = "";
    expenseTitle.value = "";
}

// Function to Export CSV
// // Function to export the expense data as a CSV file
const exportCSV = () => {
    // Create CSV data string
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Expense Title,Expense Description,Expense Amount,Date\n";
    
    // Iterate over expense items and add data to CSV
    const expenseItems = document.querySelectorAll(".list-expense-title-desc");
    expenseItems.forEach(item => {
      const title = item.querySelector(".list-expense-title").innerText;
      const desc = item.querySelector(".list-expense-desc").innerText;
      const amount = item.querySelector("span").innerText;
      const date = item.querySelector(".date").innerText;
      const rowData = `${title},${desc},${amount},${date}\n`;
      csvContent += rowData;
    });
    
    // Create a temporary link element and download the CSV file
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "expenses.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  
  // Add event listener to the export CSV button
  const exportCSVButton = document.querySelector("#exportCSV");

exportCSVButton.addEventListener("click", () => {
  // Temporarily remove the event listener from the Add Expense button
  add_expense_btn.removeEventListener("click", exportCSV);
  // Call exportCSV function to generate and download the CSV file
  exportCSV();
  // Add the event listener back after the CSV export is complete
  setTimeout(() => {
    add_expense_btn.addEventListener("click", exportCSV);
  }, 100);
});
  

  // Function to update the chart
function updateChart() {
    var labels = arrOfItems.map(item => item.title);
    var amounts = arrOfItems.map(item => item.amount);
  
    if (barChart) {
      barChart.destroy(); // Destroy the previous bar chart if it exists
    }
  
    if (polarAreaChart) {
      polarAreaChart.destroy(); // Destroy the previous polar area chart if it exists
    }
  
    barChart = buildBarChart("Expenses", labels, amounts);
    polarAreaChart = buildPolarAreaChart("Expenses", labels, amounts);
  }
  
  // Function to build the bar chart
  function buildBarChart(chartTitle, labels, amounts) {
    var ctx = document.getElementById("barChart").getContext("2d");
  
    var chart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: chartTitle,
            data: amounts,
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)"
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)"
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
            responsive: true,
      }
    });
  
    return chart;
  }
  
  // Function to build the polar area chart
  function buildPolarAreaChart(chartTitle, labels, amounts) {
    var ctx = document.getElementById("polarAreaChart").getContext("2d");
  
    var chart = new Chart(ctx, {
      type: "pie",
      data: {
        labels: labels,
        datasets: [
          {
            label: chartTitle,
            data: amounts,
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)"
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)"
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
      }
    });
  
    return chart;
  }
  
  // Initialize the charts
  var barChart = buildBarChart("Expenses", [], []);
  var polarAreaChart = buildPolarAreaChart("Expenses", [], []);
  
  
