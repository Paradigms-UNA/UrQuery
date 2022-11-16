/*
    UrQuery Parser
    EIF400 - Programming Paradigms
    Course's Project 
    
    Team 1 - 10am
    Carlos Albornoz
    Elias Arias
    Joaquin Garcia
    Jose Lopez
    Julissa Seas 
*/

:- use_module(lexer).

% These are still in developmet

let(let(X, E)) --> ws, "let", ws, id(X), ws, "=", ws, expr(E), ws.

id(id(I)) --> identifier(I).
num(num(N)) -->  number(N).

expr(X) --> id(X);num(X).