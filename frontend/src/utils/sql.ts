const dateFromSQL = ({ date, time }: { date: string, time: string }): Date => {
    return new Date(`${date}T${time}`)
}

export { dateFromSQL }