/*File Name: Hotel Reservation System
 *Made by Joey Phan/ Lab Hotel Room / 10/30/14  / Thursday 2:15-5 / Figuerira
 */
#include <stdio.h>
#include <stdlib.h>
#include <time.h>
/*
 In this application we will create a reservation system for a hotel with 10 rooms. The user will be able to reserve a room, cancl a reservation, list all the reservations, and quit.
*/

int main(void) {

    /* The variable hotelRooms is the array that each element will be assigned 0 or 1. 0 if the room is open, and 1 if it is taken.  action is the user interface variable that will tell the system whether to reserve, list, cancel, or quit. Counter will be used to see how many rooms are available. int Quit is used to create a forever loop. roomNumber is used to take in the user's input. idcheck is used to check the reservation id for cancellation. */ 
    int hotelRooms[10] = {0,0,0,0,0,0,0,0,0,0};
    int action;
    int counter;
    int i;
    int quit =0;
    int roomNumber;
    int idcheck;
    srand((int) time (NULL));

    //in this for loop, we are creating the 10 rooms all initally available. 
    printf("This hotel has 10 rooms from room#1 to room#10 \n");

    // the for loop in the part will display how many rooms are currently available. Then the system will ask the user what he would like to do
    while (quit==0) {

        counter = 0; 
        for (i=0; i<10; i++) {
            if (hotelRooms[i]==0) {
	        counter++;            
            }
        }

	printf("\n there are currently %d rooms available\n", counter);
        printf ("What would you like to do? \n    -Make a reservation (type 0). \n    -Cancel a reservation (type 1). \n    -List all the rooms (type 2). \n    -Quit (type 3). \n " );
        scanf ("%d", &action);

        switch (action) {
            
	    // in case 0, the user will be asked which room they would like to reserve. If it is available, it will be reserved to them, otherwise it will tell the user it is not available.
	    case 0:
		if(counter >0){
	            printf("Which room would you like to reserve?\n");
		    scanf("%d", &roomNumber);		
			i = roomNumber - 1;
			
		        if ((hotelRooms[i]==0) && (roomNumber >0) && (roomNumber<=10)){
			    hotelRooms[i] = rand() %1000;

			    printf ("You have just reserved room %d.\nYour reservation ID is %d.\n", roomNumber, hotelRooms[i]);
			}
		        else if (hotelRooms[i]==1)
			    printf ("Sorry, that room is not available. \n");
			else
			    printf ("Sorry, you have entered an invalid room number.\n");
		 }
		else 
		    printf("Sorry there are currently no available rooms.\n");
            break;

	    // in case 1, the user user is making a cancellation. They will be asked which room they reserved, and that room will be made avaialable.
	    case 1:
		printf ("Which room do you have a reservation in that you would like to cancel?\n");
		scanf ("%d", &roomNumber);
		i= roomNumber - 1;
		if(roomNumber>0 && roomNumber <=10){
		    printf ("Please enter your reservation code.\n");
		    scanf ("%d", &idcheck);
		    if (idcheck==hotelRooms[i]) {
		        hotelRooms[i]=0;
     		        printf ("Your cancellation has been completed.\n");
		    }
		    else if(hotelRooms[i]==0)
		        printf("This room was never reserved.\n");
		    else
			printf("Your reservation code was invalid.\n");
		}
		else
		    printf("You selected an invalid room,\n");
	    break;

	    // Case 2 will will list out all the rooms and state whether they are available or not.
	    case 2:
		for(i=0; i<10; i++){
		    roomNumber = i + 1;
		    if (hotelRooms[i]==0) 
			printf ("Room %d -  available \n",roomNumber );
		    else
			printf ("Room %d -  NOT available \n", roomNumber );
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

