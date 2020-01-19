// Your code here
function createEmployeeRecord(array){
    let person = {
    firstName: array[0],
    familyName: array[1],
    title: array[2],
    payPerHour: array[3],
    timeInEvents: [],
    timeOutEvents: []
    }
    return person
}

function createEmployeeRecords(arrayOfEmployees){
    let employeeRecordArray = []
    arrayOfEmployees.forEach(employee => employeeRecordArray.push(createEmployeeRecord(employee)))
    return employeeRecordArray
}

function createTimeInEvent(employeeRecordObj, dateTime){
    let dateTimeArray = dateTime.split(' ')
    employeeRecordObj.timeInEvents.push({type: 'TimeIn', hour: parseInt(dateTimeArray[1]), date: dateTimeArray[0]})
    return employeeRecordObj
}

function createTimeOutEvent(employeeRecordObj, dateTime){
    let dateTimeArray = dateTime.split(' ')
    employeeRecordObj.timeOutEvents.push({type: 'TimeOut', hour: parseInt(dateTimeArray[1]), date: dateTimeArray[0]})
    return employeeRecordObj
}

function hoursWorkedOnDate(employeeRecordObj, date){
    const timeIn = employeeRecordObj.timeInEvents.find(dateTime => date === dateTime.date)
    const timeOut = employeeRecordObj.timeOutEvents.find(dateTime => date === dateTime.date)
    return (timeOut.hour - timeIn.hour) / 100
}

function wagesEarnedOnDate(employeeRecordObj, date){
    let hours = hoursWorkedOnDate(employeeRecordObj,date)
    return hours * employeeRecordObj.payPerHour
}


function allWagesFor(employeeRecordObj){
    let datesEmployeeWorked = employeeRecordObj.timeInEvents.map(dateTime => dateTime.date)
    let total = 0
    datesEmployeeWorked.forEach(date => total += wagesEarnedOnDate(employeeRecordObj,date))
    return total
}

function calculatePayroll(employeeRecordArray){
    return employeeRecordArray.reduce((acc,employee)=> acc += allWagesFor(employee), 0)
}

function findEmployeeByFirstName(srcArray, name){
    let employee = srcArray.find(employeeRecord => employeeRecord.firstName === name)
    return (employee ? employee:undefined)
}