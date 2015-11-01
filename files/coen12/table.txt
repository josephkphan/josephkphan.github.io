
/*
 * File:	table.c
 *
 *Joseph Phan,Project 3,Tuesday Lab 2:15 
 *
 *Description: This file contains the functions for testing a set
 *			   abstract data type for strings.
 *
 *			   This code is made for the main functions parity.c
 *			   bincount.c and unique.c. This code implements 
 *			   hashing with linear probing
 */


#include<stdio.h>
#include<stdlib.h>
#include<string.h>
#include<assert.h> 
#include<stdbool.h>
#include"set.h"

#define EMPTY 0
#define FILLED 1
#define DELETED 2

struct set{
	int count;
	int length;
	char **elts;
	char *flag;
};

/*
 * function description:returns a pointer to a new set with a maximum capacity of maxElts
 *This function has an average and worst case big O of O(n)
 */
SET *createSet(int maxElts)
{
	SET *sp;
	int i;

	sp=malloc(sizeof(SET));
	assert (sp!=NULL);
	sp->count = 0;
	sp->length = maxElts;
	sp->elts = malloc(sizeof(char *)*maxElts);
	assert(sp->elts != NULL);
	
	sp->flag = malloc(sizeof(char) *maxElts);
	assert(sp->flag!=NULL);

	for (i=0; i<maxElts; i++)
		sp->flag[i] = EMPTY;

	return sp;
}

/*function description: deallocate memory associated with the set pointed to by sp
 *This function has a best case and worst case big O of O(n)
 */
void destroySet(SET *sp)
{
	int i;
	assert(sp != NULL);
	for(i=0; i<sp->length-1; i++) {
		if (sp->flag[i] == FILLED)	
			free(sp->elts[i]);
	}
	free(sp->elts);
	free(sp->flag);
	free(sp);
}

/*function description: returns the number of elements in the set pointed to by sp
 *This function has a best case and worst case big O of O(1)
 */
int numElements(SET *sp)
{
	return sp->count;
}

/*Function description: creates the hash location for the key
 *This function has a best and worst case big O of O(n)
 */
unsigned hashString(char *s)
{
	unsigned hash=0;
	while(*s != '\0')
		hash = 31 * hash + *s ++;
	return hash;
}
/*function description: finds elt and returns its place in the array
 *This function has a best case big O of O(1) and worst case O(n)
*/
int findElement(SET*sp, char*elt, bool*found)
{
	unsigned hashLocation;
	int i=0;
	int firstDeleted=-1;
	hashLocation= hashString(elt); 
	hashLocation = hashLocation % sp->length;
	while (sp->flag[hashLocation]!= EMPTY){
		i++;
		if (i>=sp->length)
			break; 
		/*in worst case scenario if all keys are no longer empty, the loop
		should only run sp->length amount of times to prevent a forever loop */

		if(sp->flag[hashLocation] == DELETED){
		   if(firstDeleted == -1)
				firstDeleted = hashLocation;
		/*remembers the location of the first deleted slot */
		
		}else if(strcmp(elt, sp->elts[hashLocation])==0 ){
			*found = true;
			return hashLocation;
		}
		hashLocation++;
		hashLocation = hashLocation % sp->length;
	}
	*found = false;
	if(firstDeleted != -1)
		return firstDeleted;
	return hashLocation;
	
}		

/*function description:return whether elt is a member of the set pointed to by sp
 *This function has a best case big O of O(1) and worst case O(n)
 */
bool hasElement(SET *sp, char *elt)
{
	bool found;
	assert((sp != NULL) && (elt != NULL));
	findElement(sp, elt, &found);
	return found;
}

/*function description:add elt to the set pointed to by sp, and return whether the set changed
 *This function has a best case big O of O(1) and worst case O(n)
 */
bool addElement(SET *sp, char *elt)
{
	int location;
	bool found;
	assert((sp != NULL) && (elt != NULL));
	assert(sp->count < sp->length);
	location = findElement(sp, elt, &found);
	if (found==false) {
		sp->elts[location]=strdup(elt);
		sp->flag[location]=FILLED;
		(sp->count)++;   
		return true;
	}	
	return false;
}

/*function description:remove elt from the set pointed to by sp, and then return whether the set changed
 *This function has a best case big O of O(1) and worst case O(n)
 */
bool removeElement(SET *sp, char *elt)
{
	int location;
	bool found;
	assert((sp != NULL) && (elt != NULL));
	location = findElement(sp, elt, &found);
	if (found==true) {
		free(sp->elts[location]);
		sp->flag[location]=DELETED;
		sp->count--;
		return true;
	}
	return false;
}

