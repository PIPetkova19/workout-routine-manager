export function calculateWorkouts(data, currentMonth){
  let count = 0;
  data.forEach(element => {
    const month = new Date(element.date).getMonth()
    if(month === currentMonth){
      count++;
    }
  });

  return count;
}

export function calculateDifference(data, currentAmount, currentYear, currentMonth){
  let previousAmount;

  if (currentMonth === 0) {

    data.forEach(element => {
      const year = new Date(element.date).getFullYear();
      const month = new Date(element.date).getMonth();
      if(year === currentYear - 1 && month === 11){
        if(!previousAmount) {
          previousAmount = 1;
        } else {
          previousAmount++;
        }
      }
    });

    if(!previousAmount) return "You haven't workout last month";

  } else {

    data.forEach(element => {
      const year = new Date(element.date).getFullYear();
      const month = new Date(element.date).getMonth();
      if(year === currentYear && month === currentMonth - 1){
        if(!previousAmount) {
          previousAmount = 1;
        } else {
          previousAmount++;
        }
      }
    });

    if(!previousAmount) return "You haven't workout last month";

  }

  if (currentAmount < previousAmount) {
    return `You've done ${previousAmount - currentAmount} workouts less than last Month`;
  } else if (currentAmount > previousAmount) {
    return `You've done ${currentAmount - previousAmount} workouts more than last Month`;
  } else if (currentAmount === previousAmount) {
    return "You've done the same amount as last Month";
  } else if (!currentAmount || !previousAmount) {
    return "Insufficient data to compare workouts.";
  }
}

export function streaks(data){
    if(data === 0){
        return "C'mon you can do this!";
    } else if (data > 0 && data <= 3){
        return "Keep it up!";
    } else if (data > 3 && data <= 6){
        return "You're doing great!";
    } else if (data > 6 && data <= 9) {
        return "You're killing it!"
    } else if (data > 9){
        return "YOU'RE ON FIIIRE!"
    }
}