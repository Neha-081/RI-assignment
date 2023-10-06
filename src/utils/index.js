export function formatDate(dateObj) {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June', 'July',
      'August', 'September', 'October', 'November', 'December'
    ];
    const day = dateObj.day;
    const month = months[dateObj.month - 1]; // Months are 0-based in JavaScript
    const year = dateObj.year;
  
    return `${day} ${month} ${year}`;
  }