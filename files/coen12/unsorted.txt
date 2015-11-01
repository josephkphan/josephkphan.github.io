/*
 * File:	unsorted.c
 *
 *Joseph Phan,Project 2,Tuesday Lab 2:15 
 *
 *Description: This file contains the functions for testing a set
 *			   abstract data type for strings.
 *
 *			   This code is made for the main functions parity.c
 *			   bincount.c and unique.c. This code implements 
 *			   sequential search in order to manipulate the 
 *			   array of strings.
 */

#include<stdio.h>
#include<stdlib.h>
#include<string.h>
#include<assert.h> 
#include<stdbool.h>
#include"set.h"

struct set{
	int count;
	int length;
	char **elts;
};

/*
 * function description:returns a pointer to a new set with a maximum capacity of maxElts
 *This function has a big O of O(1)
 */
SET *createSet(int maxElts)
{
	SET *sp;
	sp=malloc(sizeof(SET));
	assert (sp!=NULL);
	sp->count = 0;
	sp->length = maxElts;
	sp->elts = malloc(sizeof(char *)*maxElts);
	assert(sp->elts != NULL);
	return sp;
}

/*function description: deallocate memory associated with the set pointed to by sp
 *This function has a big O of O(n)
 */
void destroySet(SET *sp)
{
	int i;
	assert(sp != NULL);
	for(i=0; i<sp->count; i++) 
		free(sp->elts[i]);
	free(sp->elts);
	free(sp);
}

/*function description: returns the number of elements in the set pointed to by sp
 *This function has a big O of O(1)
 */
int numElements(SET *sp)
{
	assert(sp!= NULL);
	return sp->count;
}


/*function description: finds elt and returns its place in the array
 *This function has a big O of O(n)
*/
int findElement(SET*sp, char*elt)
{
	int i;
	for(i=0; i<sp->count; i++)
		if(strcmp(elt,sp->elts[i]) == 0)
			return i;//i is the index where element was found 
	return -1; //failed to find the element
}

/*function description:return whether elt is a member of the set pointed to by sp
 *This function has a big O of O(n)
 */
bool hasElement(SET *sp, char *elt)
{
	assert((sp != NULL) && (elt != NULL));
	return findElement(sp,elt)!=-1;
}

/*function description:add elt to the set pointed to by sp, and return whether the set changed
 *This function has a big O of O(n)
 */
bool addElement(SET *sp, char *elt)
{
	assert((sp != NULL) && (elt != NULL));
	if (hasElement(sp, elt)==false) {
		sp->elts[sp->count]=strdup(elt);
		assert(sp->elts[sp->count]!=NULL);
		//adds element to end of array
		(sp->count)++;
		return true;
	}	
	return false;
}

/*function description:remove elt from the set pointed to by sp, and then return whether the set changed
 *This function has a big O of O(n)
 */
bool removeElement(SET *sp, char *elt)
{
	int location;
	assert((sp != NULL) && (elt != NULL));
	if (hasElement(sp, elt)==true) {
		location = findElement(sp, elt);
		free(sp->elts[location]);
		sp->elts[location] = sp->elts[sp->count-1]; 
		//points the pointer from the gap to the last element in the array
		sp->count--;
		return true;
	}
	return false;
}

