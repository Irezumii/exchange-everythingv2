export function roundExchange(number) {
    if (number) {
        let temp = parseFloat(number)
        switch (true) {
            case temp < 10:
                return number = temp.toFixed(3)
            case temp < 100:
                return number = temp.toFixed(2)
            case temp < 1000:
                return number = temp.toFixed(1)
            default:
                return number = Math.round(temp)
        }
    }
}
