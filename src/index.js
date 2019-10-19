import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AuthorQuiz from './AuthorQuiz';
import AddAuthorForm from './AddAuthorForm';
import registerServiceWorker from './registerServiceWorker';
import { shuffle, sample } from 'underscore';
import { BrowserRouter, Route, withRouter } from 'react-router-dom';
import { statSync } from 'fs';

const authors = [
  {
    name: 'Mark Twain',
    imageUrl: 'images/authors/marktwain.jpg',
    imageSource: 'Wikimedia Commons',
    books: ['The Adventures of Huckleberry Finn', 'Life on the Mississippi', 'Roughing it'],
  },
  {
    name: 'Joseph Conrad',
    imageUrl: 'images/authors/josephconrad.png',
    imageSource: 'Wikimedia Commons',
    books: ['Heart of Darkness'],
  },
  {
    name: 'J.K. Rowling',
    imageUrl: 'images/authors/jkrowling.jpg',
    imageSource: 'Wikimedia Commons',
    imageAttribution: 'Daniel Ogren',
    books: ['Harry Potter and the Sorcerers Stone'],
  },
  {
    name: 'Stephen King',
    imageUrl: 'images/authors/stephenking.jpg',
    imageSource: 'Wikimedia Commons',
    imageAttribution: 'Pinguino',
    books: ['The Shining', 'IT'],
  },
  {
    name: 'Charles Dickens',
    imageUrl: 'images/authors/charlesdickens.jpg',
    imageSource: 'Wikimedia Commons',
    books: ['David Copperfield', 'A Tale of Two Cities'],
  },
  {
    name: 'William Shakespeare',
    imageUrl: 'images/authors/williamshakespeare.jpg',
    imageSource: 'Wikimedia Commons',
    books: ['Hamlet', 'Macbeth', 'Romeo and Juliet'],
  },
];

const getTurnData = (authors) => {
  const allBooks = authors.reduce((p, c, i) => { return p.concat(c.books); }, []);
  const fourRandomBooks = shuffle(allBooks).slice(0, 4);
  // picks one of the four books
  const answer = sample(fourRandomBooks);

  return {
    books: fourRandomBooks,
    author: authors.find(author => author.books.some(title => title === answer)),
  };
};

const resetState = () => {
  return {
    turnData: getTurnData(authors),
    highlight: 'none',
  };
};

let state = resetState();

const onAnswerSelected = (answer) => {
  const isCorrect = state.turnData.author.books.some(book => book === answer);
  state.highlight = isCorrect ? 'correct' : 'wrong';
  render();
};

const onContinue = () => {
  state = resetState();
  render();
}

const App = () => {
  return <AuthorQuiz {...state} onAnswerSelected={onAnswerSelected} onContinue={onContinue} />;
};

// const onAddAuthor=(a, history)=>{
//   authors.push(a);
//   history.push('/');
// };
// this is now a variable returing output of withRouter function
const AuthorWrapper = withRouter(({ history }) =>
  <AddAuthorForm onAddAuthor={(author) => {
    authors.push(author);
    history.push('/');
  }} />);


const render = () => {
  ReactDOM.render(
    <BrowserRouter>
      <>
        <Route exact path="/" component={App} />
        <Route path="/add" component={AuthorWrapper} />
      </>
    </BrowserRouter>, document.getElementById('root'));
};
render();
registerServiceWorker();
