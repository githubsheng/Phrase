/**
 * Created by wangsheng on 28/8/16.
 */
import {Phrase} from "../models/Phrase";
import {FilterStatus} from "../models/FilterStatus";
import IPromise = angular.IPromise;

export interface FakeAjaxService {
    ():IPromise<Phrase[]>
}

export function FakeAjaxServiceFactory($q: ng.IQService): FakeAjaxService{

    function generateRandomPhrases(): Phrase[]{
        let contextWords = ['scala', 'typescript', 'groovy', 'java', 'javascript', 'go-lang', 'python', 'shader lang'];
        let valueWords = ['spring', 'nodejs', 'play', 'redis', 'mongodb', 'mysql', 'memcache', 'jetty', 'tomcat', 'guava', 'webgl', 'canvas', 'indexdb'];
        let phrases: Phrase[] = [];
        for(let i = 0; i < 200; i++) {
            let contextWordsIndex = i % contextWords.length;
            let valueWordsIndex = i % contextWords.length;
            phrases.push({
                id: i,
                context: [contextWords[contextWordsIndex++], contextWords[contextWordsIndex++], contextWords[contextWordsIndex++]].join(" "),
                value: [valueWords[valueWordsIndex++], valueWords[valueWordsIndex++], valueWords[valueWordsIndex++]].join(" "),
                note: null, //note is stored in indexedDB inside the browser, we will retrieve notes from there.
                status: FilterStatus.Visible,
                selected: false
            });
        }
        return phrases;
    }

    return function getPhrasesFromHTTPServer():IPromise<Phrase[]> {
        let deferred = $q.defer<Phrase[]>();

        setTimeout(()=>{
            deferred.resolve(generateRandomPhrases());
        }, 100);

        return deferred.promise;
    }
}
