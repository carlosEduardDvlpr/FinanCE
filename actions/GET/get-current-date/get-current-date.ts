'use server';

export async function getCurrentDate() {
  const currentDate = new Date();
  const dateObject = {
    month: currentDate.getMonth(),
    year: currentDate.getFullYear(),
  };

  return dateObject;
}
