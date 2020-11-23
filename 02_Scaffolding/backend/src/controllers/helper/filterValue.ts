import {ServiceItemAttributes} from '../../models/service.model';
import {LendProductItemAttributes} from '../../models/lendProduct.model';
import {SellProductItemAttributes} from '../../models/sellProduct.model';

/**
 * searchValue: Look if the all conditions are together
 * filterDuplicate: filter duplicates
 *
 */
export function moreWords(searchTerm: string[]) {
    return searchTerm.length > 1;
}
// SERV
export function searchValueServ(term: any): ServiceItemAttributes[] {
    const output = [];
    for (const entry of term) {
        let count: number;
        count = 0;
        for (let i = 0; i < term.length; i++) {
            if (entry.serviceId === term[i].serviceId) {
                count++;
            }
        }
        if (count > 1) {
            output.push(entry);
        }
    }
    return output;
}
// SERV
export function filterDuplicateServ(term: ServiceItemAttributes[]): any {
    const output = [];
    for (let i = 0; i < term.length; i++) {
        if (term[i] !== null) {
            output.push(term[i]);
            const lookFor = term[i].serviceId;
            for (let j = 0; j < term.length; j++) {
                if (term[j] !== null) {
                    if (lookFor === term[j].serviceId) {
                        term[j] = null;
                    }
                }
            }
        }
    }
    return output;
}


// LEND
export function searchValueLend(term: any): LendProductItemAttributes[] {
    const output = [];
    for (const entry of term) {
        let count: number;
        count = 0;
        for (let i = 0; i < term.length; i++) {
            if (entry.lendProductId === term[i].lendProductId) {
                count++;
            }
        }
        if (count > 1) {
            output.push(entry);
        }
    }
    return output;
}
// LEND
export function filterDuplicateLend(term: LendProductItemAttributes[]): any {
    const output = [];
    for (let i = 0; i < term.length; i++) {
        if (term[i] !== null) {
            output.push(term[i]);
            const lookFor = term[i].lendProductId;
            for (let j = 0; j < term.length; j++) {
                if (term[j] !== null) {
                    if (lookFor === term[j].lendProductId) {
                        term[j] = null;
                    }
                }
            }
        }
    }
    return output;
}


// SELL
export function searchValueSell(term: any): SellProductItemAttributes[] {
    const output = [];
    for (const entry of term) {
        let count: number;
        count = 0;
        for (let i = 0; i < term.length; i++) {
            if (entry.sellProductId === term[i].sellProductId) {
                count++;
            }
        }
        if (count > 1) {
            output.push(entry);
        }
    }
    return output;
}
// SELL
export function filterDuplicateSell(term: SellProductItemAttributes[]): any {
    const output = [];
    for (let i = 0; i < term.length; i++) {
        if (term[i] !== null) {
            output.push(term[i]);
            const lookFor = term[i].sellProductId;
            for (let j = 0; j < term.length; j++) {
                if (term[j] !== null) {
                    if (lookFor === term[j].sellProductId) {
                        term[j] = null;
                    }
                }
            }
        }
    }
    return output;
}
