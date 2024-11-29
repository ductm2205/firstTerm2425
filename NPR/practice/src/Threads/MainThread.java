package Threads;

public class MainThread {
    public static void main(String[] args) {
        BankAccount bankAccount = new BankAccount();


        WithdrawThread husbandThread = new WithdrawThread("Husband", bankAccount, 15000000);
        husbandThread.start();


        WithdrawThread wifeThread = new WithdrawThread("Wife", bankAccount, 20000000);
        wifeThread.start();
        System.out.println("Main Thread Ends.");
    }
}
