/* File Name: Hotel Reservation System 2
 * Made by Joey Phan/ Lab Hotel Room with strings / 11/6/14  / Thursday 2:15-5 / Figuerira
 */
#include <string.h>
#include <stdio.h>
#include <stdlib.h>
#include <time.h>
/*
   In this application we will create a reservation system for a hotel with 10 rooms. The user will be able to reserve a room, cancel a reservation, list all the reservations, and quit.
*/

int main(void) {

    /* The variable reservationName is the array that each element will be the hotel rooms.  action is the user interface variable that will tell the system whether to reserve, list, cancel, or quit. Counter will be used to see how many rooms are available. int Quit is used to create a forever loop. roomNumber is used to take in the user's input. idcheck is used to check the reservation id for cancellation. */
    char reservationName [10] [20];
    char temp[20];
    int action;
    int counter;
    int i;
    int quit =0;
    int roomNumber;
    char idcheck[20];

    //in this for loop, we are creating the 10 rooms all initally available.
    printf("This hotel has 10 rooms from room#1 to room#10 \n");

    for (i=0; i<10; i++) {
	reservationName[i][0]='\0';
    }

    // the for loop in the part will display how many rooms are currently available. Then the system will ask the user what he would like to do. the while loop is the forever loop to let the user stay in the system.
    
    while (quit==0) {

        counter = 0;
        for (i=0; i<10; i++) {
            if (reservationName[i][0]=='\0') {
                counter++;
            }
        }
        printf("\n there are currently %d rooms available\n", counter);

        printf ("What would you like to do? \n    -Make a reservation (type 0). \n    -Cancel a reservation (type 1). \n    -List all the rooms (type 2). \n    -Quit (type 3). \n " );
        scanf ("%d", &action);

        switch (action) {

            // in case 0, the user will reserve and room if there is an open one and will have to input their name, otherwise it will tell the user it is not available. 

            case 0:
                if(counter >0){
		    for(i=0;i<10; i++){
			if(reservationName[i][0]=='\0') {
			     printf ("Please enter your full name (Last name, First name i.e. Phan, Joey \n");
			     scanf ("%s", reservationName[i]);
                             printf ("You have just reserved a room under the name %s.\n", reservationName[i]);
			     i=10;
		  	}
		    }
                }   
                else
                    printf("Sorry there are currently no available rooms.\n");
            break;

            // in case 1, the user user is making a cancellation. They will need to input their name correctly to check if they were the ones that reserved it.

            case 1:
                    printf ("Please enter your name.\n");
                    scanf ("%s", idcheck);
		    for (i=0;i<10;i++)
                    if (strcmp (idcheck,reservationName[i])==0) {
                        reservationName[i][0]='\0';
                        printf ("Your cancellation has been completed.\n");
			break;
                    }
		    if(i==10) {
			printf ("You have inserted an invalid name.\n");
		    }
            break;

            // Case 2 will will list out all the rooms and state whether they are available or not.
            case 2:
                for(i=0; i<10; i++){
                    roomNumber = i + 1;
                    if (reservationName[i][0]=='\0')
                        printf ("Room %d -  available \n",roomNumber );
                    else
                        printf ("Room %d -  NOT available - reserved by %s. \n", roomNumber,reservationName[i] );
                }
            break;

            // This case will end the application by escaping the while loop also  giving the user a final farewell.
            case 3:
                printf ("Visit again soon! \n");
                quit=1;
            break;

            // This case will happen in case the user eneters something outside of 0 1 2 3, indicating the user made and mistake and the user needs to try again
            default:
             printf("Invalid selection. Please try again. \n ");
             break;
        }
    }
    return 0;
}






