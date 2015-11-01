
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
 *			   binary search in order to manipulate the 
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
	return sp->count;
}


/*function description: finds elt and returns its place in the array
 *This function has a big O of O(logn)
*/
int findElement(SET*sp, char*elt, bool*found)
{
	int lo, mid, hi, diff;
	lo = 0;
	hi = sp->count-1;
	while (lo <= hi) { //implements binary search to find the location of the element
		mid = (lo + hi)/2;
		diff = strcmp(elt,sp->elts[mid]);
		if (diff < 0)
			hi = mid-1;
		else if (diff > 0)
			lo = mid+1;
		else {
			*found = true;
			return mid;//this is where the element was found
		}
	}
	*found = false;
	return lo; // lo is the location of where an element should be
}

/*function description:return whether elt is a member of the set pointed to by sp
 *This function has a big O of O(logn)
 */
bool hasElement(SET *sp, char *elt)
{
	bool found;
	assert((sp != NULL) && (elt != NULL));
	findElement(sp, elt, &found);
	return found;
}

/*function description:add elt to the set pointed to by sp, and return whether the set changed
 *This function has a big O of O(n)
 */
bool addElement(SET *sp, char *elt)
{
	int location, x;
	bool found;
	assert((sp != NULL) && (elt != NULL));
	x = sp->count;
	location = findElement(sp, elt, &found);
	if (found==false) {
		while(x >= location){
			sp->elts[x]=sp->elts[x-1];
			x--;
			//shifts all elements from location to the right in order to make room for the new element
		}
		sp->elts[location]=strdup(elt);
		assert(sp->elts[sp->count]!=NULL); 
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
	bool found;
	assert((sp != NULL) && (elt != NULL));
	location = findElement(sp, elt, &found);
	if (found==true) {
		free(sp->elts[location]);
		while(location <sp->count){
			sp->elts[location] = sp->elts[location+1];
			location++;
			//shifts elements after the removed element to the left
		}
		sp->count--;
		return true;
	}
	return false;
}

