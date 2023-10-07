// This function takes a date object as input and formats it as a string in the 'day month year' format.
export function formatDate(dateObj) {
    // Array of month names to convert the numeric month into a string
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June', 'July',
      'August', 'September', 'October', 'November', 'December'
    ];
    
    // Extract day, month (converted from 0-based to 1-based), and year from the date object
    const day = dateObj.day;
    const month = months[dateObj.month - 1]; // Months are 0-based in JavaScript
    const year = dateObj.year;
  
    // Return the formatted date string
    return `${day} ${month} ${year}`;
}
