import {Phrase} from "../models/Phrase";
import {FilterStatus} from "../models/FilterStatus";

export interface filterPhraseByStatus {
    (phrases: Phrase[], status: FilterStatus): Phrase[];
}

export function StatusFilter(): filterPhraseByStatus {
    return function(phrases: Phrase[], status: FilterStatus): Phrase[]{
        return status === FilterStatus.All ? phrases : phrases.filter((p) => p.status === status);
    }
}