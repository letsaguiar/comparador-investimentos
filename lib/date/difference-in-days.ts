export const differenceInDays = (start: Date, end: Date) => {
    return Math.round((start.getTime() - end.getTime()) / (1000 * 60 * 60 * 24));
}