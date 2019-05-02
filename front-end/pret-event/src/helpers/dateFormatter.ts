const months = {
  '01': 'jan',
  '02': 'fev',
  '03': 'mar',
  '04': 'abr',
  '05': 'mai',
  '06': 'jun',
  '07': 'jul',
  '08': 'ago',
  '09': 'set',
  '10': 'out',
  '11': 'nov',
  '12': 'dez',
};

const dateFormatter = (date) => {
  const splited = date.split('-');
  return {
    day: splited[2],
    month: months[splited[1]],
  };
};

export default dateFormatter;
