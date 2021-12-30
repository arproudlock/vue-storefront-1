/*eslint-disable*/
export default {
    methods: {
        getRating(starCount) {
            let num = Number(starCount) >> 0
            let decimal = Number(starCount) % 1
            let arr = []
            for (let val = 1; val <= num; val++) {
                arr.push(val)
            }
            if (decimal) {
                decimal = 0.5;
                arr.push(decimal)
            }
            return arr
        }
    }
}
