/*
 * File Name: deque.c
 *
 * made by Joseph Phan, project 4, Tuesday Lab 2:15
 *
 * Description: This file contains functions for The Maze Game. TO solve the maze,
 * stacks are used to keep track of the path. This program shows the implementation 
 * of linked lists.  
 * 
 */

#include<stdio.h>
#include<stdlib.h>
#include<assert.h>
#include<stdbool.h>
#include "deque.h"


typedef struct node{
	int data;
	struct node *next, *prev;
}NODE;

struct deque{
	int count;
	NODE *head;
};


/* Function Description: returns a pointer to a new deque 
 * Big O Runtime O(1)*/
DEQUE *createDeque(void)
{
	DEQUE *dp;
	dp = malloc(sizeof(DEQUE));
	assert (dp!=NULL);
	dp->count=0;
	NODE *dummyNode;
	dummyNode = malloc(sizeof(NODE));
	assert (dummyNode!=NULL);
	dp->head = dummyNode;
	dummyNode->data = -1;
	dummyNode->next = dummyNode;
	dummyNode->prev = dummyNode;

	return dp;
}


/* Function Description: deallocate memory associated with the deque pointed to by dp
 * Big O Runtime O(n)*/
void destroyDeque(DEQUE *dp)
{	
	assert(dp!=NULL);
	while(dp->head->next != dp->head){
		dp->head->next = dp->head->next->next;
		free(dp->head->next->prev);
	}
	free(dp->head);
	free(dp);
}


/* Function Description: returns the number of items in the deque pointed to by dp 
 * Big O Runtime O(1)*/
int numItems(DEQUE *dp)
{
	assert(dp!=NULL);
	return dp->count;
}

/* Function Description: add x as the first item in the deque pointed to by dp 
 * Big O Runtime O(1)*/
void addFirst(DEQUE *dp, int x)
{
	assert(dp!=NULL);
	NODE *np;
	np = malloc(sizeof(NODE));
	assert (np!=NULL);
	np->data = x;
	np->prev = dp->head;
	np->next = dp->head->next;
	dp->head->next->prev = np;
	dp->head->next = np;
	dp->count++;
}


/* Function Description: add x as the last item in the deque pointed to by dp
 * Big O Runtime O(1)*/
void addLast(DEQUE *dp, int x)
{
	assert(dp!=NULL);
	NODE *np;
	np = malloc(sizeof(NODE));
	assert (np!=NULL);
	np->data = x;
	np->next = dp->head;
	np->prev = dp->head->prev;
	dp->head->prev->next = np;
	dp->head->prev = np;
	dp->count++;	

}

/* Function Description: remove and return the first item in the deque pointed to by dp; the deque must not be empty
 * Big O runtime O(1) */
int removeFirst(DEQUE *dp) 
{
	assert(dp!=NULL && dp->count!=0);
	int data;
   	data = dp->head->next->data;
	dp->head->next = dp->head->next->next;
	free(dp->head->next->prev);
	dp->head->next->prev = dp->head;
	dp->count--;	
	return data;
}

/* Function Description: remove and return the last item in the deque pointed to by dp; the deque must not be empty
 * Big O run time O(1) */
int removeLast(DEQUE *dp)
{
	assert(dp!=NULL && dp->count!=0);
	int data;
	data = dp->head->prev->data;
	dp->head->prev = dp->head->prev->prev;
	free(dp->head->prev->next);
	dp->head->prev->next = dp->head;
	dp->count--;
	return data;	
}

/* Function Description: return, but do not remove, the first item in the deque pointed to by dp; the deque must not be empty
 * Big O run time O(1)*/
int getFirst(DEQUE *dp)
{
	assert(dp!=NULL&&dp->count!=0);
	return dp->head->next->data;
}


/* Function Description: return, but do not remove, the last item in the deque pointed to by dp; the deque must not be empty
 * Big O Runtime O(1)*/
int getLast(DEQUE *dp)
{
	assert(dp!=NULL&&dp->count!=0);
	return dp->head->prev->data;
}
