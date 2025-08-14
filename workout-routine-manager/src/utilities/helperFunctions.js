import { isAfter, isSameWeek, isThisMonth} from "date-fns";
import { Workouts } from "./helperClasses";

export function calculateWorkoutsThisMonth(data, currentDate){

  let count = 0;

  data.forEach(element => {
    let date = new Date(element.date);
    let checkMonth = isThisMonth(date);
    let checkDay = isAfter(date, currentDate);
    
    if(checkMonth && !checkDay){
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

export function calculateStreak(data, currentMonth, currentYear, currentDay){
  let helpArray = [];

  data.forEach(element => {
    const year = new Date(element.date).getFullYear();
    const month = new Date(element.date).getMonth();
    const day = new Date(element.date).getDate();

    if(year === currentYear && month === currentMonth){
      helpArray.push(day);
    }
  });
  
  helpArray.sort((a, b) => a - b);

  if (!helpArray.includes(currentDay)) {
    return 0;
  }

  let streak = 1;
  let day = currentDay - 1;

  while (helpArray.includes(day)) {
    streak++;
    day--;
  }

  return streak;
}

export function calculateTotalVolumeLifted(data){
  let count = 0;

  data.forEach(element => {
    count += Number(element.weight);    
  });
  
  return count;
}

export function calculateWeekActivity(currentDate, data){
  let count = 0;

  data.forEach(element => {
    let date = new Date(element.date)
    let checkWeek = isSameWeek(currentDate, date, {weekStartsOn: 1});
    let checkDay = isAfter(date, currentDate);
    if(checkWeek && !checkDay){
      count++;
    };
  });

  return count;
}

export function calculateAndSetWorkoutFrequencyData(data, currentDate){
  const dataset = [];
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

  const currentMonth = currentDate.getMonth();
  for(let i = 0; i <= currentMonth; i++){
    dataset.push(new Workouts(i, months[i], 0));
  }

  data.forEach(element => {
    let date = new Date(element.date);
    let month = date.getMonth();
    let checkDay = isAfter(date, currentDate);

    if(!checkDay){
      dataset.forEach(m => {
      if(m.n === month){
        m.workoutFrequency++;
      }
    });
    }
  });

  return dataset;
}

export function setStreakSubtext(count){
    if(count === 0){
        return "C'mon you can do this!";
    } else if (count > 0 && count <= 3){
        return "Keep it up!";
    } else if (count > 3 && count <= 6){
        return "You're doing great!";
    } else if (count > 6 && count <= 9) {
        return "You're killing it!"
    } else if (count > 9){
        return "YOU'RE ON FIIIRE!"
    }
}