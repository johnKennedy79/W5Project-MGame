## Week 5 Group Project 
# contributers Jamie, Subhadra, James & John 

We started by choosing to create a memory Game then we set up a wire frame of what we expected the client page to look like while also discussing the user journey 
# link to wire frame https://www.figma.com/design/tQfE2bYrJxF6qkBeaoeGlr/Figma-basics?node-id=601-9&t=rUDoqf2r6cRYDhpG-1
# link to Trello Board https://trello.com/b/ix783CKt/memory-game
# User Journey
on start up the back end fetches 6 card data objects from card table in the db 
duplicates each card and places them in the card grid by order random.

go button appears.
when the go button is pressed the timer starts and the grid of cards is reviealed.

for every 2 cards selected a true or false match is determined each true match results in the card staying visable .
each false match adds a time penalty time to the timer and both the cards are returned to none visable status.
once all 6 pairs are matched the timer stops user inputs a username of 3 charchters and the username & score time is recorded to the leaderboard table in the db. 
The page is reset to go button status.

toggle scores button shows a side bar with:

Top 3 Highest scores/shortest times and player name from leaderboard table in db. sorted by lowest time first acending to highest
Top 3 player scores saved in local history. sorted acending
‌
Reset Button
retunes to the go page overlay, resets the grid to a new random set up and resets the timer without recording the score.

# planning and workflow
durring the planning stages we used the trello board to make a note of the different sections that we thought needed doing 
and added sections for wether the jobs were being done needed reviewing or problem solving or have been done. 
Each morning we had a SCRUM meeting to allocate jobs for that day and discuse or resolve any problems after merging branches fromm the previouse day 

