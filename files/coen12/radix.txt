/*
 * File Name: radix.c
 *
 * made by Joseph Phan, project 4, Tuesday Lab 2:15
 *
 * Description: This file contains functions for implementing a sorting
 *				algorithm called radix sort. it reads in a sequence of 
 *				non negative integers from the standard input and then 
 *				writes them in sorted order on the standard output. Radix
 *				sorting uses queues as its main data structures. 
 * 
 */

#include <stdio.h>
#include <stdlib.h>
#include <assert.h>
#include <stdbool.h>
#include <math.h>
#include "deque.h"

#define max(a,b) ( ( (a) > (b) ) ? (a) : (b) )
#define r 10

int main ()
{
	int i, j,k, m, n, loop;
	int data, sigDigit, max, check;
	/* check is used to see if the user returns a number or not i,j,k are all 
	   variables used to increment loops, m and n are used to calculate the 
	   value of a certain significant digit. data is the value the user input
	   max is the largest of the data. */
	DEQUE *dp[10], *sortList;

	m = 10;
	n = 1;
	data=1;
	max = 0;

	sortList = createDeque();
	for(i=0; i<r; i++)
		dp[i] = createDeque(); /*creates the array of queues indexed by digits */

	printf("Please type in positive integers to sort. To stop, type in a character or negative number \n");
	while (true) {
		check = scanf("%d", &data);
        if (data<0 || check == 0) 
			break;

		if (max < data ) 
			max = data; 
		/* will find the largest number inputted from the user */
		addLast(sortList,data);
	}

	i=0;	
	loop = ceil(log(max+1)/log(r));
	for(k=0; k<=loop; k++) {

		while (numItems(sortList)!=0){
			data = removeFirst(sortList);
			sigDigit = (data % m)/n;
			addLast(dp[sigDigit], data);
		}   /*gets the data from the  list and puts it in appropiate queue */

		for (j=0; j<10; j++){
			while( numItems(dp[j])!=0 ) {
				data = removeFirst(dp[j]);
				addLast(sortList, data);
			}
		}
		i++; 
		m = pow(r,(i+1));	
		n = pow(r,i);	
		/*changes m and n to check the next sigfig */
	}

	printf("\nSorted:\n");
	while(numItems(sortList)!=0) {
		data = removeFirst(sortList);
		printf("%d \n", data);
	}
	printf("\n");
	/* prints out the sorted list */

	destroyDeque(sortList);
	for(i=0;i<10;i++) {
		destroyDeque(dp[i]);
	}
	return 0;
}
		
