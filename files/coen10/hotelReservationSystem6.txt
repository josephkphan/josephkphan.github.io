/* File Name:hotelReservationSystem6
 * Made by Joey Phan/ Lab10 Hotel Room  lab 8 / 12/4/14  / Thursday 2:15-5 / Figuerira
 */
#include <string.h>
#include <stdio.h>

/*
 In this application we will create a reservation system for a hotel with 10 rooms. The user will be able to reserve a room, cancl a reservation, list all the reservations, and quit.
*/

   char reservationName [10] [20]; // this is the rooms people will reserve and cancel and input their names
    int roomCounter; // this will keep count of how many rooms are reserved
    int quit = 0; // this will be used for the forever loop
    int i;

    void reservation ();
    void cancellation ();
    void list ();
    void actionQuit () ;

// reservation allows the user to reserve a room if there is an open one asking for the person's name. It will check whether the name is taken or not and not allow repeated names. it will also allow the user to reserve as many rooms as possbile.

void reservation (char *sameNameCheck, int rooms) {
    int counter = 0;
    char *q;
    q = &reservationName[0][0];
        for (i=0; i<10; i++) {
            if (*q=='\0') {
                strcpy(reservationName[i],sameNameCheck) ;
                counter++;
		if (counter==rooms) {
		    break;
		}
	    } 
	    q+=20;
	}
        printf ("You have just reserved %d  room(s) under the name %s.\n",counter, reservationName[i]);
}
//cancellation allows the user to cancel a reservation if there is at least one room that is not available. It will delete all rooms with the name inputted. It will also group up the remaining reserved rooms.

void cancellation (char *idcheck) {
    int flag = 0;
    int start = 100;
    int end;
    char *q;
    q= reservationName[0];
    for (i=0;i<10;i++) { // this loop deletes all rooms with the inputted name
        if (strcmp(idcheck,q)==0) {
            *q='\0';
            flag = 1;
            if(start == 100)
                start = i;
            end = i;
        }
        q+=20;
        }
    if (flag==1) { //this groups up the remaining rooms
        printf ("Your cancellation has been completed.\n");
	    for (i=end+1; i<10; i++) {
		strcpy(reservationName[start],reservationName[i]);
		start++;
	    }
	    for (i=start; i<10; i++) {
		reservationName[i][0]='\0';
	    }
	}
    return;
}
//list prints out all the rooms and their availability. If it is not available, it will print out the name under which it is reserved.

void list (void) {
    int roomNumber;
    char *p;
    p = reservationName[0];
	if (roomCounter<10) {
        for(i=0; i<10; i++){
            roomNumber = i + 1;
            if (*p=='\0') {
                printf ("Room %d -  available \n",roomNumber );
            }else {
                printf ("Room %d -  NOT available - reserved by %s \n", roomNumber,reservationName[i] );
            }
	    p+=20;
        }
	} else if (roomCounter == 10) {
	    printf("The hotel is empty.\n");
        } 
}

void actionQuit (void) { //this lets the user exit the program
    printf ("Visit again soon! \n");
    quit=1;
}

//in the main, it runs the program and creates the initial rooms all available. it also has the interface that will allow the user to choose which action he or she wants to do.

int main(void) {
    char *q;
    int action;
    char *p;
    char idcheck [20];
    int j;
    int flag = 0;
    int rooms;
    char sameNameCheck[20];

    q = reservationName[0];
    for (i=0; i<10; i++) {
        *q='\0';
        q+=20;
    }
    printf("This hotel has 10 rooms from room#1 to room#10 \n");
    while (quit == 0) {
        roomCounter=0;
        p=&reservationName[0][0];
        for (i=0; i<10; i++) { //creates all rooms availble.
            if (*p=='\0') {
                roomCounter++;
            }
            p+=20;
        }
        printf("\n there are currently %d rooms available\n", roomCounter);
        printf ("What would you like to do? \n    -Make a reservation (type 0). \n    -Cancel a reservation (type 1). \n    -List all the rooms (type 2). \n    -Quit (type 3). \n " );
        scanf ("%d", &action);
        switch (action) {
            case 0:
		 p = &reservationName[0][0];
		 q = &reservationName[0][0];
                 if (roomCounter > 0 && roomCounter <= 10){
	             flag = 0;
                     printf ("Please enter your name. \n");
                     scanf ("%s", sameNameCheck);
                     for(j=0; j<10; j++) { //checks if name is taken or not. 
                         if (strcmp (sameNameCheck, q)==0) {
                             flag = 1;
                             printf("Somebody has used that name, please use another.\n");
                             break;
                         }
                         q+=20;
                    }
                    if (flag==0) {
                         printf ("How many rooms would you like to reserve?\n");
                         q = &reservationName[0][0];
                         scanf ("%d", &rooms);
                         reservation (sameNameCheck, rooms );
                    }
                } else 
                    printf("Sorry there are currently no available rooms.\n");
                break;

            case 1:
                if (roomCounter<10){
                    printf ("Please enter your name.\n");
                    scanf ("%s", idcheck);
                    cancellation(idcheck);
                } else 
                    printf("The hotel is empty.\n");

                break;

            case 2:
                list();
                break;

            case 3:
                actionQuit();
                break;

            default:
                printf ("sorry you have entered an incorrect number. \n");
        }
    }
    return 0;
}


