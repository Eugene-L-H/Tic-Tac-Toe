# Tic-Tac-Toe
A game of Tic-Tac-Toe played in the browser against an AI opponent. Built with
HTML, CSS, and JavaScript.

# Instructions
To start playing the player will click on a square where they would like to place their
first '*X*'. The CPU will then place an *'O'* in a vacant square. Next the
player will pick another vacant square to place their next '*X*'.

This process continues until a chain of '*O's'*' or '*X's*' are formed. A blue
line will be drawn across the winning letters indicating the winner.

After a short delay the game will reset and is ready for another round.

# Installation/Run
Tic-Tac-Toe can be run from https://eugene-l-h.github.io/Tic-Tac-Toe/ or by
downloading the files and opening the index.html file in the browser of your
choice. 

This project was developed to be functional scaling from mobile to desktop
environments. 

# Notes
Issues: 
- The lines that are 'drawn' after the CPU wins have inconsistent behaviour
  depending on what size the window is at. This behaviour is worst on iOS in
  Safari. 
    From my testing they appear in the proper direction for indicating the win,
  but sometimes not properly centred or the end of one side will exceed the boundaries of play -area.
    I would come up with a different approach to drawing these lines were I to
  redo this project.
- The CPU is impossible to beat. The CPU first looks for a win condition; if that
  can't be done it looks to block the player. If the player makes a mistake the
  CPU will win, if the player plays perfectly the game ends in a tie.
    Perhaps in a future update I will create some inconsistency in the CPU
  behaviour that allows for mistakes.

Some Learning Outcomes:
- I was pressed to learn more about scaling from mobile to desktop with is this
project; a topic I find quite challenging as I find myself needing to learn more
and more about CSS. Styling doesn't seem to come as naturally to me as
programming logic and JavaScript.

- I had an enjoyable time programming an AI that had to analyze conditions and make
decisions based on those conditions. 
