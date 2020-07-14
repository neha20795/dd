import java.util.Scanner;
class Ticket{
    private int arr[];
    private int front;
    private int rear;
    private int capacity;
    private int count;
    
    public void dequque(){
        System.out.print(arr[front]+" ");
        front = (front+1)%capacity;
        count--;
    }
    public void enque(int item){
        rear = (rear+1)%capacity;
        arr[rear]=item;
        count++;
    }
    public void display(){
        for(int i=front;i<=rear;i++){
            System.out.print(arr[i]+" ");
        }
    }
    public static void main (String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.println("Enter the number of customer takes the tickets:");
        int noOfCustomer = sc.nextInt();
        if(noOfCustomer<=0){
            System.out.println("Invalid Number");
        }
        else{
            Ticket ticket = new Ticket();
            ticket.arr = new int[noOfCustomer];
            ticket.capacity = noOfCustomer;
            ticket.front = 0;
            ticket.rear = -1;
            ticket.count = 0;
            for(int i=0;i<noOfCustomer;i++){
                ticket.enque(i+1);
            }
            System.out.println("The tickets in the system are:");
            ticket.display();
            System.out.println();
            System.out.println("Enter the number of tickets served:");
            int noOfTicket = sc.nextInt();
            int value = noOfCustomer - noOfTicket;
            if(noOfTicket>noOfCustomer || noOfTicket<0){
                return;
            }
            else{
                System.out.println("The served tickets are:");
                for(int i=0; i<noOfTicket;i++){
                    ticket.dequque();
                }
                if(value == 0){
                    System.out.println();
                    System.out.println("No more tickets to be served");
                }
                else{
                    System.out.println();
                    System.out.println("The unserved tickets are:");
                    ticket.display();
                }
            }
            
        }
        
    }
}