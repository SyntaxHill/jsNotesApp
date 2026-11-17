const noNoteTemplate = `<div class="noNoteBox">
			<div>
				<h1>No Notes Yet</h1>
				<h2>It Seems Empty! Add One</h2>
			</div>
			<button type="button" onclick="showForm()" class="optionAddnote" id="optionAddnote"> <span>+</span> Add Note
			</button>
		</div>`;

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

const notes = [];
const dialogbox = document.querySelector('dialog#popUp');
const noteTitle = document.getElementById('noteTitle');
const noteBody = document.getElementById('noteContent');
const noteForm = document.getElementById('noteForm');
const submitNoteBtn = document.getElementById('submitnote');
const cancelNote = document.querySelector('#CloseForm');
const notesHolder = document.querySelector('main');
const navbarBtn_AddNote = document.getElementById('optionAddNote');
// Null Runs before

if (localStorage.length === 0) {
  notesHolder.innerHTML = noNoteTemplate;
}

submitNoteBtn.addEventListener('click', (event) => {
  event.preventDefault();
  if (noteTitle.value.trim() !== '' && noteBody.value.trim() !== '') {
    notes.unshift({
      id: noteTitle.value,
      title: noteTitle.value,
      body: noteBody.value,
      date: new Date().getDate() + '/' + new Date().getMonth() + '/' + new Date().getFullYear(),
    });
    saveNote();
  } else {
    alert("Title Shouldn't be an empty string");
  }
});

function saveNote() {
  localStorage.setItem(notes[0].id, JSON.stringify(notes[0]));
  dialogbox.close();
  window.location.reload();
  notes.length = 0; //Resets Note for new note
}

function genId() {
  return (
    new Date().getMonth() +
    '/' +
    new Date().getDate() +
    '/' +
    new Date().getFullYear() +
    '-' +
    new Date().getHours() +
    '-' +
    new Date().getMinutes()
  );
}

function showForm() {
  dialogbox.showModal();
}

function closeForm() {
  dialogbox.close();
}

const localKeys = Object.keys(localStorage);

localKeys.forEach((key) => {
  const note = JSON.parse(localStorage.getItem(key));
  notesHolder.innerHTML += newNoteTemplate(note.title, note.date, note.body, note.id);
});

// Set delete Action
function deleteThisNote(curr_id) {
  let Getnote = localStorage.removeItem(curr_id);
  console.log(Getnote + 'has Been deleted');
  alert('Delitiing Initiated');
}

function openthisNote(curr_id) {
  dialogbox.showModal();
  console.log('Open ?', dialogbox.open);
  const titleNote = JSON.parse(localStorage.getItem(curr_id)).title;
  const bodyNote = JSON.parse(localStorage.getItem(curr_id)).body;

  dialogbox.querySelector('#noteTitle').value = titleNote;
  dialogbox.querySelector('#noteContent').value = bodyNote;

  // Send delete confirmation
  // NOTE for ME : Do not use .innerHTML for self-closing tags and input fields use .value instead [Learnt from 2dyas of headache bruh]
  cancelNote.addEventListener('click', () => {
    let conf = window.prompt('Delete this note ?', "'y' if yes 'n' if no");
    if (conf === 'y') {
      deleteThisNote(curr_id);
      alert('Deleted!, Page will be reloaded');
      dialogbox.close();
      window.location.reload();
      dialogbox.querySelector('#noteTitle').value = '';
      dialogbox.querySelector('#noteContent').value = '';
    } else {
      dialogbox.close();
    }
  });
}

notesHolder.addEventListener('click', (event) => {
  if (event.target.closest('#editNote')) {
    let currentNote = event.target.closest('#hasNote');
    let curr_id = currentNote.querySelector('#getNoteId').innerHTML;
    console.log(curr_id);
    openthisNote(curr_id);
  }
  console.log(!event.target.closest('#optionAddNote'));
});

navbarBtn_AddNote.addEventListener('click', () => {
  dialogbox.querySelector('#noteTitle').value = '';
  dialogbox.querySelector('#noteContent').value = '';
  dialogbox.querySelector('#CloseForm').innerHTML = 'Close';
  dialogbox.querySelector('#CloseForm').addEventListener('click', () => {
    dialogbox.close();
  });
  dialogbox.showModal();
});
