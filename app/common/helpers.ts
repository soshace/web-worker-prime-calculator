export class Helpers {
    public static primeList = [] as number[];

    /**
     * Checks if given number is a prime.
     * Uses optimized logic with prime number list, so it checks by divide only with members of this list.
     */
    public static isPrime(num: number) {
        for (let i = 0; i < this.primeList.length; i++) {
            const primeToCheck = this.primeList[i];
            if (num % primeToCheck === 0) {
                return false;
            }
        }

        return true;
    }

    /**
     * Calculates prime number the next to the given one.
     */
    public static calculatePrime(startAt: number) {
        let found = false;

        while (!found) {
            startAt++;
            if (this.isPrime(startAt)) {
                this.primeList.push(startAt);
                found = true;
            }
        }

        return startAt;
    }

    /**
     * Clears cached values of operations.
     */
    public static clearCache() {
        this.primeList = [];
    }
}