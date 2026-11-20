// Global Variables
const API_key = '';
const notes = [];
const toggleBox = document.querySelector('dialog#notesFormContainer');
const noteTitle = document.getElementById('noteTitle');
const noteBody = document.getElementById('noteContent');
const noteForm = document.getElementById('notesForm');
const submitNoteBtn = document.getElementById('submitnote');
const cancelNote = document.querySelector('#CloseForm');
const notesHolder = document.querySelector('#notesContainer');
const navbarBtn_AddNote = document.getElementById('navAddnoteBtn');
const localKeys = Object.keys(localStorage); // Fetch LocalStorage Keys
const saveNoteBtn = document.getElementById('submitnote');
// ==================================================================================

// No Notes Template 
const noNoteTemplate = `<div class="noNoteBox">
			<div>
				<h1>No Notes Yet</h1>
				<h2>It Seems Empty! Add One</h2>
			</div>
			<button type="button" class="optionAddnote" id="optionAddnote"> <span>+</span> Add Note
			</button>
		</div>`;

// Define How the note will look like ; Templte Literals for Dynamic Data entries
function newNoteTemplate(noteHead, noteDate, noteContent, id) {
  return `<div class="hasNote" id="hasNote" >
			<div class="noteHead">
				<div class="noteDetails">
					<h1 id="NoteTitle">${noteHead}</h1>
					<p id="noteTime">${noteDate}</p>
				</div>
				<button class="editNote" id="editNote">✏️</button>
			</div>
			<div class="noteBody">
				${noteContent}
			</div>
			<p hidden id="getNoteId">${id}</p>
		</div>`;
}

// Global Functions [Status : Working fine]
function fetchNotes() {
  if (localStorage.length !== 0) {
    for (x in localKeys) {
      notes.unshift(JSON.parse(localStorage.getItem(localKeys[x])));
    }
  }
}
// Fetch Notes from LocalStorage at DOMContentLoaded [Status : Working fine]
document.addEventListener('DOMContentLoaded', fetchNotes()); // Fetch notes from localStorage at DOMContentLoaded
// Save New Note Conditions [Status : Working fine]
function dataCheck(e) {
  console.log('Event Ok!');
  e.preventDefault(); //Stops from reloading with invalid Content
  if (noteTitle.value.trim() !== '' && noteBody.value.trim() !== '') {
    notes.unshift({
      id: Date.now(),
      title: noteTitle.value,
      content: noteBody.value,
      date: new Date().toLocaleString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      }),
    });
    updateLocalStorage();
    toggleBox.close();
    window.location.reload();
  } else {
    window.alert('Data is not meaningful!');
  }
}
// Show addNote option if there is no Note [Status : Working fine]
if (notes.length === 0) {
  notesHolder.innerHTML = noNoteTemplate;
} else {
  showNotes();
}
// Remove Confilcts b/w notes array and Localstorage [Status working fine]
function updateLocalStorage() {
  const getData = notes[0];
  localStorage.setItem(notes[0].id, JSON.stringify(getData));
}
//Show Notes
function showNotes() {
  notesHolder.innerHTML = '';
  for (i = 0; i <= notes.length - 1; i++) {
    notesHolder.innerHTML += newNoteTemplate(
      notes[i].title,
      notes[i].date,
      notes[i].content,
      notes[i].id,
    );
  }
}

function closeNote() {
  toggleBox.close()
}

function openNote() {
  toggleBox.showModal()
}

function saveNoteEdit(e, id, title, body) {
  let targetNote = e.target.closest('.hasNote');
  console.log(targetNote)
  toggleBox.querySelector('#noteTitle').value = title;
  toggleBox.querySelector('#noteContent').value = body;
  submitNoteBtn.addEventListener('click', (e) => {
    let newTitle = toggleBox.querySelector('#noteTitle').value;
    let newBody = toggleBox.querySelector('#noteContent').value;
    localStorage.setItem(id,
      {
        id: Date.now(),
        title: newTitle,
        content: newBody
        ,
        date: new Date().toLocaleDateString('en-IN',
          {
            day: '2-digit',
            month: '2-digit',
            year: '2-digit',
            hour: '2-digit',
            hour12: false
          }
        )
      }
    )
  })
}
// Set close action [status : Working fine]
document.querySelector('#closeForm').addEventListener('click', () => {
  closeNote()
  toggleBox.querySelector('#dynmChange').innerHTML = 'Delete';
});


// Saves Note
navbarBtn_AddNote.addEventListener('click', (e) => {
  openNote();
  submitNoteBtn.addEventListener('click', (e) => {
    dataCheck(e);
  })
})

// Edit Note
const edtNoteBtn = document.getElementById('editNote');

if (edtNoteBtn) {
  document.querySelector('main').addEventListener('click', (e) => {
    let getclickedNoteId = e.target.closest('.hasNote').querySelector('#getNoteId').innerHTML;
  })
}
