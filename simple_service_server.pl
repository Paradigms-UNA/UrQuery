/*
Service for adding two numbers
URI: /add
VERB: POST
Body 
    Expects:JSON {"a":Some_Number1, "b":Some_Number2 }
    
Returns: {"accepted":true, "answer":Some_Number1+Some_Number2}    if data ok
         {"accepted":false, "answer":0, "msg":some_error_message} othwerwise
             
author: loriacarlos@gmail.com
since: 2022
*/
:- use_module('compiler/parser').
:- use_module('compiler/generator').
:- use_module(library(http/thread_httpd)).
:- use_module(library(http/http_dispatch)).
:- use_module(library(http/http_json)).
:- use_module(library(http/http_log)).

:- use_module(library(http/html_write)).

% URL handlers.
:- http_handler('/transpile', handle_request, [method(post)]).
:- http_handler('/', home, []).


handle_request(Request) :-
    http_read_json_dict(Request, Query),
    transpile(Query, Solution),
    reply_json_dict(Solution).

server(Port) :-
    http_server(http_dispatch, [port(Port)]).

set_setting(http:logfile, 'service_log_file.log').

%%%%%%%%%%%%%%%%%%%%%%%%%% BUSINESS LOGIC %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
% Transpiles UrQuery Code to JavaScript Code
transpile(_{script:Script}, _{accepted: true, target: Ast, msg: 'Transpiled successfully'} ):-
    atom_codes(Script, Codes),
    produce_atom_from_stream(Codes, Ast), !.

transpile(_, _{accepted: false, msg: 'Syntax error'} ).

produce_atom_from_stream(Codes, JsCode) :-
    new_memory_file(Handle),
    open_memory_file(Handle, write, InMemoryStream),
    start_emision(InMemoryStream, Codes),
    close(InMemoryStream),
    memory_file_to_atom(Handle, JsCode).
  
start_emision(InMemoryStream, Codes) :-
    phrase(prog_urquery(UqAst), Codes),
    to_js(UqAst, JsAst),
    emit_js(JsAst, InMemoryStream).

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

home(_Request) :-
        reply_html_page(title('Mini Add Service'),
                        [ h1('To use it:'),
                          p([h4('Send a post messsage'),
                             h4('URI:/add'),
                             h4('body: JSON data of the form {"a":number, "b":number}'),
                             h4('Service Responds with JSON as follows:'),
                             ul([li('{accepted:true, answer:a+b}    if data ok'),
                                 li('{accepted:false, answer:0, msg:some_error_message} othwerwise')])
                            ])
                        ]).

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% MAIN %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
:- initialization
    format('*** Starting Server ***~n', []),
    (current_prolog_flag(argv, [SPort | _]) -> true ; SPort='8000'),
    atom_number(SPort, Port),
    format('*** Serving on port ~d *** ~n', [Port]),
    server(Port).
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%