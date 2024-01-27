# Simple-Study-Tool
A simple study tool created with beginner HTML, CSS and JavaScript. 

This program was created by a student looking to learn some HTML, CSS and JavaScript in a short period of time from scratch.
It is not great, but it should function. Would appreciate it if someone could test if there are issues/bugs I missed.

Tip: because this was made by a beginner, you cannot create separate decks for different subjects. Instead, if you download this code several times into separate folders for each subject and change where the local storage saves into, you can get "separate decks."
Like this:
  Original
  const notes = JSON.parse(localStorage.getItem("notes");
  Adjusted
  const notes = JSON.parse(localStorage.getItem("notes-math");
  Repeat for each line that contains localStorage with parameter "notes"
  Repeat for each localStorage instance with different parameters ex. localStorage.getItem("reminders") -> localStorage.getItem("reminders-math")
If you don't change this, the data will be the same on each folder.
