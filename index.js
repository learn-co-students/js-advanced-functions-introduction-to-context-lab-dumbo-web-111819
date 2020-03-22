// Your code here
const createEmployeeRecord=(arr) => {
    let emptyObj={}
    emptyObj['firstName']=arr[0]
    emptyObj['familyName']=arr[1]
    emptyObj['title']=arr[2]
    emptyObj['payPerHour']=arr[3]
    emptyObj['timeInEvents']=[]
    emptyObj['timeOutEvents']=[]
    return emptyObj
}

const createEmployeeRecords=(arr) => {
    let newArr=[]
    arr.forEach(element=>newArr.push(createEmployeeRecord(element)))
    return newArr
}

const createTimeInEvent=(obj,da) => {
    let [date,hour]=da.split(' ')
    let newObj={}
    newObj['type']='TimeIn'
    newObj['hour']=parseInt(hour)
    newObj['date']=date
    obj.timeInEvents.push(newObj)
    return obj
}

const createTimeOutEvent=(obj,da) => {
    let [date,hour]=da.split(' ')
    let newObj={}
    newObj['type']='TimeOut'
    newObj['hour']=parseInt(hour)
    newObj['date']=date
    obj.timeOutEvents.push(newObj)
    return obj
}

const hoursWorkedOnDate=(obj,da) => {
    let timeInObj=obj.timeInEvents.find(element=>element.date===da)
    let timeOutObj=obj.timeOutEvents.find(element=>element.date===da)
    return (timeOutObj.hour-timeInObj.hour)/100
}

const wagesEarnedOnDate=(obj,da) => {
    return hoursWorkedOnDate(obj,da)* parseInt(obj.payPerHour)
}

const allWagesFor=(obj) => {
    let dates=obj.timeInEvents.map(element=>element.date)
    // console.log(dates)
    let result =dates.reduce((acc,date)=> acc+wagesEarnedOnDate(obj,date),0)
    return result
}

const findEmployeeByFirstName=(scrArray,firstName) => {
    return scrArray.find(element=>element.firstName)
}

const calculatePayroll=(arr)=>{
    // let allFirstNames= arr.map(employee=>employee.firstName)
    let result= arr.reduce((acc,employee)=> acc+allWagesFor(employee),0)
    return result

}