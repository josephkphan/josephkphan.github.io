//Joseph Phan - Lab Tuesday 2:15

//Code: reads a text file given by a user and counts the number of words within that text file. 

#include <stdio.h>
#define MAX_WORD_LENGTH 30

//Function Definition: This function opens a text file and counts how many words are in that file. 
void NumberOfWords (char *src ) 
	{
		FILE *infp;
		char ch, temp[31];//array temp is 31 characters long because MAX_WORD_LENGTH is 30 (it includes the \0) 
		int counter = 0; 
		if ((infp = fopen(src,"r")) ==NULL) { //checks if file opens correct 
			printf("I couldn't open the file.\n");
			return;
		}
		while((ch = fscanf(infp, "%s", temp)) != EOF) //traverses through file, counting how many words are in there
			counter++;
		printf("%d total words\n", counter);
		fclose(infp);
	}

int main(int argc, char*argv[]) 
	{
	if (argc!=2){ //checks if user puts in the correct number of arguments
		printf("Error: incorrect number of arguments\n");	
		return 0;
	}
	NumberOfWords(argv[1]);
	return 0;
	}


