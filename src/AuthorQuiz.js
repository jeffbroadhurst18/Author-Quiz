/* eslint-disable react/jsx-key */
/* eslint-disable react/jsx-no-comment-textnodes */
import React, { Component } from 'react';
import './App.css';
import './bootstrap.min.css';

const Hero = () => {
  return (<div className="row">
    <div className="jumbotron col-10 offset-1">
      <h1>Author Quiz</h1>
      <p>Select the book written by the author shown</p>
    </div>
  </div>);
};

const Book = ({title}) => {
  return (<div className="answer">
    <h4>{title}</h4>
  </div>);
}

// map iterates through each element of an array
const Turn = ({author, books}) => {
  return (<div className="row turn" style={{backgroundColor: "white"}}>
    <div className="col-4 offset-1">
      <img src={author.imageUrl} className="authorimage" alt="Author" />
    </div>
    <div className="col-6"> 
      {books.map(title => <Book title={title} key={title}/>)}
    </div>
  </div>
  
  );
};

const Continue = () => {
  return (<div />);
};

const Footer= () => {
  return (<div id="footer" className="row">
    <div className="col-12">
      <p className="text-muted credit">All images are from <a href="http://commons.wikimedia.org/wiki">Wikimedia Commons and are in the public domain</a></p>
    </div>
  </div>
  );
};

const AuthorQuiz=({turnData}) =>
{
  return (
    <div className="container-fluid">
      <Hero />
      <Turn {...turnData}/>
      <Continue />
      <Footer />
    </div>
  );
}


export default AuthorQuiz;
