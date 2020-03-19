// Convert date from ISO string and format based on email age
export const formatDate = (date) => {
  let emailSplitDate = date.split(/\D+/); // datestring into numbers
  let currentSplitDate = new Date().toISOString().split(/\D+/);

  let emailYear   = emailSplitDate[0];
  let emailMonth  = emailSplitDate[1];
  let emailDay    = emailSplitDate[2];
  let currentYear  = currentSplitDate[0];
  let currentMonth = currentSplitDate[1];
  let CurrentDay   = currentSplitDate[2];
  let hour   = emailSplitDate[3];
  let minute = emailSplitDate[4];

  if (emailYear === currentYear) {
    // if the date is today, show time
    if ((emailMonth === currentMonth) && (emailDay == CurrentDay)) {
      return `${hour}:${minute}`;
      console.log("returned the time");
    }
    // if the date was this year, show full month and day
    return `${emailMonth}/${emailDay}`;
  }
  // if the date was before this year, show MM/DD/YY
  return `${emailMonth}/${emailDay}/${emailYear}`;
}