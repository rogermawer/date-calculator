//input date needs to be passed in format of "01/01/2018"; 
    
//key refers to the numbered month, value is the first day of each month
var myMonths={'01': 1, '02': 32, '03': 60, '04': 91, '05': 121, '06': 152, '07': 182, '08': 213, '09': 244, '10': 274, '11': 305, '12': 335};

// date is given as 01/01/2020, so return m/d/y as an array
function convertToArray (x){
    console.log(x);
    return x.split('/');
}

//returns only the year
function theYear (dateArray){
    return parseInt(dateArray[2]);
}    
function getDateAsNum (dateArray) {
    return parseInt(myMonths[dateArray[0]]) + parseInt(dateArray[1]); //returns the month + day as a number
    }
    
function isLeapYear(year){
    if (year % 4 == 0){ //step 1
        if (year % 100 == 0){ //step 2
            if (year % 400 == 0){ //step 3
                return true;
            }else{
                return false;
            }
        }else{
            return true;
        }
    }else{
        return false;
    }
}
    
function leapDays(fromYear, toYear){
    var extraDays = 0;
    for (i = fromYear; i <= toYear; i++){
        if(isLeapYear(i)){
            extraDays += 1;
        }
    }
    return extraDays;
}
    
//the bread & butter. takes two dates as args
function calculator (fromDate, toDate) {
    const fromDateArray = convertToArray(fromDate);
    const toDateArray = convertToArray(toDate);
    const yearDif = theYear(toDateArray) - theYear(fromDateArray);
    
    if (yearDif == 0){
        toDate = getDateAsNum(toDateArray);
        fromDate = getDateAsNum(fromDateArray);
    }else if (yearDif > 0) {
        toDate = (getDateAsNum(toDateArray) + (yearDif * 365) + leapDays(theYear(fromDateArray), theYear(toDateArray)));
        fromDate = getDateAsNum(fromDateArray);
    }
    return toDate - fromDate;
    }

    
//this submits the info from the form
const submitButton = document.querySelector('button');

submitButton.addEventListener('click', function(){
    const fromDate = document.getElementById('from-date').value;
    const toDate = document.getElementById('to-date').value;
    const daysLeft = calculator(fromDate,toDate);
    if (daysLeft >= 0){
        document.getElementById('result').innerHTML = `${daysLeft} days left`;
    }else{
        document.getElementById('result').innerHTML = `That was ${daysLeft * -1} day(s) ago`;
    }
});