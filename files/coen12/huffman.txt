/*
 * Created by Joseph Phan Project 5 Tuesday 2:15-5
 *
 * File Name: huffman,c
 *
 * File description: This file is a utility that preforms compression on
 *					 a file using Huffman codiing. This code implements 
 *				  	 usage of priority queues and binary heaps.
 *
 */

#include <stdio.h>
#include <stdlib.h>
#include <assert.h>
#include "tree.h"
#include <string.h>
#include <ctype.h>
#include <math.h>
#include "pack.h"

#define p(x) (((x)-1)/2)
#define l(x) ((x)*2 + 1)
#define r(x) ((x)*2 + 2)

int count[257]; //used to count chars
struct tree *heap[257]; // the heap
struct tree *leaves[257]; //contains child pointers

/*Function Desctiption: counts the number of occurances for every character
 * in the file 
 * Algorithmic complexity O(n)*/
void charOccurance (char *src)
{

	FILE *infp;
	int c;
	if ((infp = fopen(src, "rb") ) == NULL) {
		printf("I couldn't open the file. \n");
		return;
	}
	while((c = fgetc(infp)) != EOF)
		count[c]++;
	fclose(infp);
}

/*Function Description: Updates the Array after an element has been added
 * Akgorithmic complexity O(n)*/
void updateHuffInsert( int huffCount) 
{
	struct tree *temp;
	int idx = huffCount-1;
	while(idx!=0)
		if(getData(heap[p(idx)]) > getData(heap[idx])) {
			temp = heap[p(idx)];
			heap[p(idx)] = heap[idx];
			heap[idx] = temp;
			idx = p(idx);
		}else
			break;
}

/*Function Description: Update the array after an element has been removed 
 * Algorithmic complexity O(n)*/
void updateHuffDelete(int huffCount)
{
	int idx = 0;
	struct tree *temp;
	int flag; 
	
	while (l(idx)<huffCount){ //checks if there are any children for the current index
		if (r(idx) < huffCount && getData(heap[l(idx)])>getData(heap[r(idx)])) 
			flag = 0;//min is right child
		else
			flag = 1;//min is a left child

		if(flag ==1){
			if (getData(heap[idx]) > getData(heap[l(idx)])){
			temp = heap[idx];
			heap[idx] = heap[l(idx)];
			heap[l(idx)] = temp;
			idx = l(idx);
			}else
				break;
		}else
			if (getData(heap[idx]) > getData(heap[r(idx)])){
			temp = heap[idx];
			heap[idx] = heap[r(idx)];
			heap[r(idx)] = temp;
			idx = r(idx);
			}else
				break;
		
	}	
}

/*Function Description: Makes the Huffman Tree 
 * Algorithmic Complexity O(n squared)*/
void makeHuff(void)
{
	int i;
	struct tree *left, *right, *new;
	int huffCount=0;
	for (i=0; i<257; i++){
		leaves[i] = createTree(count[i],NULL, NULL);
		if (getData(leaves[i]) >0 || i == 256){
			heap[huffCount++] = leaves[i];
			updateHuffInsert(huffCount);
			//inserts the appropiate leaves into the heap updating the array after each insert
		}
	}

	while(huffCount>1){
		left = heap[0];
		heap[0] = heap[--huffCount];
		updateHuffDelete(huffCount);

		right = heap[0];
		heap[0] = heap[--huffCount];
		updateHuffDelete(huffCount);

		new = createTree(getData(left)+getData(right), left, right);
		heap[huffCount++] = new;
		updateHuffInsert(huffCount);
	}	
	//removes and creates a tree with the lowest two frequency in the array and updates the tree after inserting the new tree
	return;
}

/*Function Description: finds and prints the three digit octal value for the given character 
 * Algorithmic Complexity O(n)*/
void printCode(struct tree *np)
{
	if (getParent(np) == NULL)
		return;
	printCode(getParent(np));
	if (getLeft(getParent(np)) == np)
		printf("0");
	else
		printf("1");	
}	

/*Function Desciption: Displays each character used, its frequency, 
 * and its three digit octal value for every character to the standard output 
 * Algorithmic Complexity O(n squared)*/
void printHuff(void)
{
	int i;
	for (i=0; i<257; i++) 
		if (getData(leaves[i]) > 0 || i == 256){
			if(isprint(i)!=0){
				printf("'%c': %d ", i, getData(leaves[i]));
				printCode(leaves[i]);
				printf("\n");
			}else{
				printf("%d: %d ", i, getData(leaves[i]));
				printCode(leaves[i]);
				printf("\n");
			}
		}
}


int main( int argc, char *argv[])
{
	int i;
	if(argc!=3) { 
		printf("Error: incorrect number of arguments \n");
		return 0;
	}

	for(i=0; i<257; i++)
		count[i]=0;
	charOccurance(argv[1]);
	makeHuff();
	printHuff();

	pack(argv[1],argv[2], leaves);
		
return 0;
}
