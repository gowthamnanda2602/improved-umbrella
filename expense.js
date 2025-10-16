document.addEventListener('DOMContentLoaded', () => {
    const expenseList = JSON.parse(localStorage.getItem('expenseList')) || [];
    expenseList.forEach(expense => display(expense));
    sessionStorage.removeItem('editid');
});

const form = document.querySelector('#expenseForm');
form.addEventListener('submit', (event) => {
    event.preventDefault();
    const amount = event.target.amount.value;
    const description = event.target.description.value;
    const category = event.target.category.value;
    const expense = { amount, description, category };
    const editid = sessionStorage.getItem('editid');
    const expenseList = JSON.parse(localStorage.getItem('expense_List')) || [];
    if(editid){
        update(editid, expense, expenseList);
    }
    else{
        add(expense, expenseList);
    }
    localStorage.setItem('expense_List',JSON.stringify(expenseList));
    form.reset();
});

function add(expense,expenseList){
    expense.id = Date.now();
    expenseList.push(expense);
    display(expense);
}


function update(editid, expense, expenseList){
    for(let i=0; i<expenseList.length; i++){
        if(expenseList[i].id === editid){
            expenseList[i].amount = expense.amount;
            expenseList[i].description = expense.description;
            expenseList[i].category = expense.category;
        }
    }
    const li = document.getElementById(editid);
    li.firstElementChild.textContent = `${expense.amount} - ${expense.description} - ${expense.category}`;
    const submitbtn = document.querySelector('button[type="submit"]');
    submitbtn.textContent = 'Add Expense';
    sessionStorage.removeItem('editid');
} 


function display(expense){
    const ul = document.querySelector('ul');
    const li = document.createElement('li');
    li.id = expense.id;
    li.className = 'list-group-item d-flex justify-content-between align-items-center';
    ul.appendChild(li);
    const span  = document.createElement('span');
    span.textContent = `${expense.amount} - ${expense.description} - ${expense.category}`;
    li.appendChild(span);
    const div = document.createElement('div');
    li.appendChild(div);
    const editbtn = document.createElement('button');
    editbtn.textContent = 'Edit';
    editbtn.className = 'btn btn-sm btn-warning me-2';
    editbtn.addEventListener('click',() => edit_expense(expense));
    div.appendChild(editbtn);
    const delBtn = document.createElement('button');
    delBtn.textContent = 'Delete';
    delBtn.className = 'btn btn-sm btn-danger';
    delBtn.addEventListener('click',() => delete_expense(expense.id, li));
    div.appendChild(delBtn);
    
}

function edit_expense(expense){
    const amountInput = document.querySelector('#amount');
    const descriptionInput = document.querySelector('#description');
    const categoryInput = document.querySelector('#category');
    amountInput.value = expense.amount;
    descriptionInput.value = expense.description;
    categoryInput.value = expense.category;
    const edit_id = expense.id;
    sessionStorage.setItem('editid', edit_id);
    const submitbtn = document.querySelector('button[type="submit"]');
    submitbtn.textContent = 'Update Expense';
}

function delete_expense(id, li){
    const expenseList = JSON.parse(localStorage.getItem('expenseList')) || [];
    const updatedList = [];
    for(let i=0; i<expenseList.length; i++){
        if(expenseList[i].id !== id){
            updatedList.push(expenseList[i]);
        }
    }
    localStorage.setItem('expenseList', JSON.stringify(updatedList));
    li.remove();
}
