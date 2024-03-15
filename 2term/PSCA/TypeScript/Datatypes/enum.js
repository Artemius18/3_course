var Week;
(function (Week) {
    Week["Monday"] = "MONDAY";
    Week[Week["Tuesday"] = 5] = "Tuesday";
    Week["Wednesday"] = "WEDNESDAY";
    Week["Thursday"] = "THURSDAY";
    Week["Friday"] = "FRIDAY";
    Week["Saturday"] = "SATURDAY";
    Week["Sunday"] = "SUNDAY";
})(Week || (Week = {}));
console.log(Week.Tuesday); // FRIDAY
console.log(Week['Monday']); // MONDAY
