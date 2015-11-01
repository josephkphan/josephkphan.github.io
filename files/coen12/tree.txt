/*
 *Created by Joseph Phan, Project 5,  Tuesday 2:15 - 5 
 *
 * File Name: tree.c
 *
 * File description:This code provides functions that work with a
 *					binary tree ADT 
 *
 */


#include <stdio.h>
#include <assert.h>
#include <stdlib.h>
#include "tree.h"

struct tree {
	int data;
	struct tree *left;
	struct tree *right;
	struct tree *parent;
};

/* Function Description: detaches child pointer from parent. figures out which of parent's children child is and sets that child to NULL
 *Algorithmic Complexity O(1)
 * */
static void detach (struct tree *child)
{
	if (child->parent != NULL){
		if (child->parent->left == child)
			child->parent->left = NULL;
		else
			child->parent->right = NULL;
	}
}
/* function description: returns a pointer to a new tree with the specified left and right subtrees and data for its root
*/
struct tree *createTree(int data, struct tree *left, struct tree *right)
{
    struct tree *root;
	root = malloc(sizeof(struct tree));
	assert(root!=NULL);
	if (left!=NULL){
		detach(left);
		left->parent = root;
	}
	if (right!=NULL){
		detach(right);
		right->parent = root;
	}
	root->right = right;
	root->left = left;
	root->data = data;	
	root->parent = NULL;
	return root;
}

/* Function description: deallocate memory for the entire subtree pointed to by root
 * Algorithmic complexity: O(1)
*/
void destroyTree(struct tree *root)
{

	if (root!=NULL){
		destroyTree(root->left);
		destroyTree(root->right);
		free(root);
	}
}


/* function description: return the data in the root of the subtree pointed to by root
*Algorithmic complexity: O(1)
*/
int getData(struct tree *root)
{
	assert(root!=NULL);
	return root->data;
}


/* function description: returns the left subtree of the subtree pointed to by root
*Algorithmic complexity: O(1)
 */
struct tree *getLeft(struct tree *root)
{
	assert(root!=NULL);
	return root->left;
}


/* function description: returns the right subtree of the subtree pointed to by root
 *Algorithmic complexity: O(1)
 */
struct tree *getRight(struct tree *root)
{
	assert(root!=NULL);
	return root->right;
}


/* function description: returns the parent tree of the subtree pointed to by root
 *Algorithmic complexity O(1)
 */
struct tree *getParent(struct tree *root)
{
	assert(root!=NULL);
	return root->parent;
}


/* function description: update the left subtree of root
*Algorithmic complexity: O(1)
 */
void setLeft(struct tree *root, struct tree *left)
{
	if (root->left != NULL)
		detach(root->left);
	root->left = left;
	left->parent = root;
}


/* function description: update the right subtree of root
*Algorithmic complexity: O(1)
 */
void setRight(struct tree *root, struct tree *right)
{
	if(root->right !=NULL)
		detach (root->right);
	root->right = right;
	right->parent = root;
}



