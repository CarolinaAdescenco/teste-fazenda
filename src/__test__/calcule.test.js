const assert = require('assert');
const positive = 69274684;
const negative = 9446548;

percentageCalculation = (total, prop) =>  parseFloat((Math.round(prop * 100) / total)).toFixed(0);


describe("calculate percentage", () => {
    it("it should calculate every percent of all participants", () => {  
        
        //Barbara Evans values ​​test

        // The calculation of the total is based on the sum of the positives (69274684) and negatives (9446548)
        let total = positive + negative;
        let positivePercent = parseInt(percentageCalculation(total, positive));
        let negativePercent = parseInt(percentageCalculation(total, negative));

        assert.equal(positivePercent, 88);
        assert.equal(negativePercent, 12);
        assert.equal(positivePercent + negativePercent, 100);
    });
});