"use strict";
const FilterStatus_1 = require("../models/FilterStatus");
function FakeAjaxServiceFactory() {
    function generateRandomPhrases() {
        let contextWords = ['scala', 'typescript', 'groovy', 'java', 'javascript', 'go-lang', 'python', 'shader lang'];
        let valueWords = ['spring', 'nodejs', 'play', 'redis', 'mongodb', 'mysql', 'memcache', 'jetty', 'tomcat', 'guava', 'webgl', 'canvas', 'indexdb'];
        let phrases = [];
        for (let i = 0; i < 200; i++) {
            let contextWordsIndex = i % contextWords.length;
            let valueWordsIndex = i % contextWords.length;
            phrases.push({
                id: i,
                context: [contextWords[contextWordsIndex++], contextWords[contextWordsIndex++], contextWords[contextWordsIndex++]].join(" "),
                value: [valueWords[valueWordsIndex++], valueWords[valueWordsIndex++], valueWords[valueWordsIndex++]].join(" "),
                note: null,
                status: FilterStatus_1.FilterStatus.Visible,
                selected: false
            });
        }
        return phrases;
    }
    return function getPhrasesFromHTTPServer() {
        function promiseFunc(resolve) {
            setTimeout(() => {
                resolve(generateRandomPhrases());
            }, 100);
        }
        return new Promise(promiseFunc);
    };
}
exports.FakeAjaxServiceFactory = FakeAjaxServiceFactory;
