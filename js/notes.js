/**
 * Objet noteapp pour sauvegarder l'état de l'application
 * Question 5, étape 1
 */
let noteapp = {
    currentNote: null,
    currentNoteIndex: null
};

/**
 * le constructeur de l'objet Note
 * Question 1, étape 1
 * @param titre
 * @param contenu
 * @constructeur
 */
const Note = function (titre, contenu, d=null) {
    this.titre = titre,
        this.contenu = contenu,
        this.dateCreation = d == null ? new Date() : new Date(d),

        this.setTitre = function (titre){
            this.titre = titre;
        }
    this.setContenu = function (contenu){
        this.contenu = contenu;
    }
}

const noteListe = {
    listNotes: [],
    addNote (note){
        return this.listNotes.push(note)-1;
    },
    get(n){
        return this.listNotes[n];
    },
    getList(){
        return this.listNotes;
    }
}

/**
 * noteFormView : objet de gestion du formulaire d'ajout/édition de notes
 * Question 2, étape 1
 */
const noteFormView = {
    formId:"noteForm",
    /**
     * affiche le formulaire de saisie d'une nouvelle note
     *
     */
    display () {
        document.getElementById("form_add_note_title").value = null;
        document.getElementById("form_add_note_text").value = null;
        document.getElementById(this.formId).classList.remove("create_edit_note-hidden");
        let validate_button = document.getElementById("form_add_note_valid");
        validate_button.addEventListener("click", noteFormView.validate);
    },
    /**
     * cacher le formulaire
     */
    hide(){
        document.getElementById(this.formId).classList.add("create_edit_note-hidden");
    },
    /**
     * handler pour la validation de la création d'une note
     * @param event
     */
    validate(event){
        let titre = document.getElementById("form_add_note_title").value,
            contenu = document.getElementById("form_add_note_text").value;

        let note = new Note(titre,contenu);
        noteapp.currentNoteIndex  = noteListe.addNote(note);
        noteListView.displayItem(note);
        noteListView.selectItem(noteapp.currentNoteIndex);
        noteView.display(noteapp.currentNoteIndex);
        noteFormView.hide();
    },
}

/**
 * noteView : objet de gestion de l'affichage d'une note
 * Question 3, étape 1
 */
const noteView = {
    currentId: "currentNoteView",
    /**
     * convert(note) : convertit une note en texte html en utilisant showdown pour
     * traiter le markdown
     * @param note : la note à convertir
     * @returns {*} string : texte html
     */
    convert(note){
        let text = `# ${note.titre}
${note.dateCreation.toLocaleDateString()}
${note.contenu}`;
        let conv = new showdown.Converter();
        return conv.makeHtml(text);
    },
    /**
     * display(note) : affiche la note donnée en paramètre
     * @param note
     */
    // display(note){
    //   document.getElementById(this.currentId).innerHTML = this.convert(note);
    // },
    display(index){
        document.getElementById(this.currentId).innerHTML = this.convert(noteListe.get(index));
    }
}

const noteListView ={
    listId: "noteListView",

    selectAndDisplayItemNote(event){
        let elementSource = event.target;
        let divChildren = event.target.parentNode.children;
        for (var i = 0; i < divChildren.length; i++) {
            divChildren[i].classList.remove("note_item-selected");
            if (divChildren[i] === elementSource){
                noteapp.currentNoteIndex = i;
                elementSource.classList.add("note_item-selected");
            }
        }
        noteView.display(noteapp.currentNoteIndex);
    },

    displayItem(note){
        let text = note.titre+" "+note.dateCreation.toLocaleDateString();
        let div = document.createElement('div');
        div.classList.add("note_list_item");
        div.appendChild(document.createTextNode(text));
        div.addEventListener("click",this.selectAndDisplayItemNote);
        document.getElementById(this.listId).appendChild(div);
    },
    selectItem(index){
        let divChildren = document.getElementById(this.listId).children;
        for (var i = 0; i < divChildren.length; i++) {
            divChildren[i].classList.remove("note_list_item-selected")
            if (i == index){
                divChildren[i].classList.add("note_list_item-selected");
            }
        }
    },


}

/**
 * mainMenuView : objet de gestion du menu principal (+, edit,del)
 * Question 4, étape 1
 */
const mainMenuView = {
    addId:"add",
    /**
     * handler pour le click sur +
     * affiche le formulaire d'ajout
     * @param event
     */
    addHandler(event){
        noteFormView.display();
    },
    /**
     * initialisation des listener
     */
    init(){
        document.getElementById(this.addId).addEventListener("click", this.addHandler);
    },
}

/**
 * initialisation de l'application
 * initialise le menu
 */
noteapp.init = function () {
    mainMenuView.init();
};

window.addEventListener("load", noteapp.init);
