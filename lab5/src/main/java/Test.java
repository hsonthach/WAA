import java.util.*;

public class Test {
    public static void main(String[] args) {
        HashMap<Integer,Integer> hash  = new HashMap<>();
        hash.put(1, 2);
        hash.remove(1);

        // create a stack
        Stack<Integer> stack = new Stack<>();
        stack.push(1);
        stack.pop();

        // create a queue
        Queue<Integer> queue = new LinkedList<>();
        queue.add(1);
        queue.add(2);
        System.out.println(queue.peek());
        queue.poll();
        System.out.println(queue.peek());
        queue.add(3);
        System.out.println(queue.peek());
        queue.poll();
        System.out.println(queue.peek());

        PriorityQueue<Integer> minHeap = new PriorityQueue<>();
        PriorityQueue<Integer> maxHeap = new PriorityQueue<>(Comparator.reverseOrder());

    }
}
