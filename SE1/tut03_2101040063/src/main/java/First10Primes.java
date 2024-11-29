public class First10Primes {
    public static void main(String[] args) {
        int[] primes = getFirst10Primes();
        System.out.print("The first 10 prime numbers are: ");
        for (int prime : primes) {
            System.out.print(prime + " ");
        }
    }

    // Function to check if a number is prime
    public static boolean isPrime(int num) {
        if (num < 2) {
            return false;
        }
        for (int i = 2; i <= Math.sqrt(num); i++) {
            if (num % i == 0) {
                return false;
            }
        }
        return true;
    }

    // Function to get the first 10 prime numbers
    public static int[] getFirst10Primes() {
        int[] primes = new int[10];
        int count = 0; // Number of primes found
        int number = 2; // Start checking from 2

        while (count < 10) {
            if (isPrime(number)) {
                primes[count] = number;
                count++;
            }
            number++;
        }

        return primes;
    }
}
