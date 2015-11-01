/* File Name: Multiplication Game
 * Made by Joey Phan. Lab 5(multiplication) . Figuerira 
 */
#include <stdio.h>
#include <stdlib.h>
#include <time.h>

int main(void)
{
/* In this application, we aim to build a multiplication game to test the users ability to multiply numbers between 0 and 12. This will repeat 10 times and show the final result as well as each result along the way.
*/

/*
  number1 and number2 are the computer generated variables. userAnswer is the value that the user will imput. answer is the product of number1 and number2 that will be compared to userAnswer. Counter will be used to show the number of correct answers.
 */
    int number1;
    int number2;
    int userAnswer;
    int answer;
    int counter = 0;
    int i;
    int repeat = 10;
    srand((int) time (NULL)) ;

/* 
In the next loop, it will create the random numbers that the user will see. It will also take in the user's answer and compare it to the acual answer. It will print out a Good Job or Oh no, depending on their correctness. After the loop it will show the user's final score
*/   
    for (i = 0 ; i < repeat ; i++){
        number1 = rand() % 13;
        number2 = rand() % 13;
	answer = number1 * number2;
        printf ("\nWhat is %d * %d? \n", number1, number2);
        scanf ("%d", &userAnswer);
	printf ("\nThe answer is %d. \n",answer);
        if ( userAnswer == answer){
	    printf ("Good Job! You were correct! \n");
	    counter++;
	}
	else{
	    printf("Oh no, you were wrong!\n" );
        }
    }
    int score = counter * 10;
    printf("\nYou got %d percent correct out of 10.\n", score);
return 0;
}

