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

:- module(generator, [to_js/2, emit_js/2]).
:- use_module(parser).

get_id(const(id(Id), _), Id).

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% FROM UQ_TREE TO JS_TREE %%%%%%%%%%%%%%%%%%%%%%%%%%% 

to_js(in(src_query(uq_docpath(uq_expr(Expr)), xpath_expr(Xpath))), JsAst):-
    JsAst = const(id(xpathResultIter), call_func(ur_evaluate, call_func(ur_doc, Expr), Xpath)).

to_js(returns(uq_varquery(uq_vartag(uq_tag(TagName), uq_varpath(uq_qvar(Qvar))))), 
    [JsInst1, JsInst2]):-
        atom_concat(TagName, '_tag', Id),
        JsInst1 = const(id(Id), lambda(arg(child), call_func(ur_tag, TagName, child))),
        JsInst2 = yield(call_func(Id, Qvar)).

to_js(uq_for(uq_qvar(Qvar), In, Returns), JsAst):-
    to_js(In, JsIteratorAst),
    get_id(JsIteratorAst, Id),
    to_js(Returns, [TagLambda, YieldValues]),
    JsForOf = for_of(Qvar, of(Id), YieldValues),
    JsAst = block([JsIteratorAst, TagLambda, JsForOf]).

to_js(uq_tagquery(tag(TagName), For, location(X)), JsAst):-
    atom_concat(TagName, '_tag', Id),
    get_expr(X, Expr),
    JsTagAst = const(id(Id), lambda(arg(children), call_func(ur_tag, TagName, children))),
    to_js(For, JsAstFor),
    GeneratorName = for_query,
    JsAst = block([
        JsTagAst, 
        declare_generator(id(GeneratorName), args(X), JsAstFor),
        return(call_func(Id, spread_list(call_func(GeneratorName, Expr))))
    ]).

to_js(urquery(let(uq_id(Let), uq_expr(Expr), in(TagQuery))), JsAst):-
    to_js(TagQuery, FunctionBlock),
    UQFunctionName = urQuery,
    JsUqFuncDeclare = declare_func(id(UQFunctionName), arg(Let), FunctionBlock),
    LetInstruction = let(id(Let), expr(Expr)),
    ReturnInstruction = return(call_func(UQFunctionName, Let)),
    JsMainFuncDeclare = declare_func(id(main), block([LetInstruction, ReturnInstruction])),
    JsAst = block([
        import,
        JsUqFuncDeclare,
        JsMainFuncDeclare    
    ]).

to_js(urquery(TagQuery), JsAst) :-
    to_js(TagQuery, FunctionBlock),
    UQFunctionName = urQuery,
    Let = uri,
    JsUqFuncDeclare = declare_func(id(UQFunctionName), arg(Let), FunctionBlock),
    LetInstruction = let(id(Let), expr('ur_active_doc()')),
    ReturnInstruction = return(call_func(UQFunctionName, Let)),
    JsMainFuncDeclare = declare_func(id(main), block([LetInstruction, ReturnInstruction])),
    JsAst = block([
        import,
        JsUqFuncDeclare,
        JsMainFuncDeclare    
    ]).

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%


%%%%%%%%%%%%%%%%%%%%%%%%%%%%% UTILITIES TO EMIT CODE %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
get_expr(uq_id(Expr), Expr):- !.
get_expr(uq_string(Expr), String):- atom_string(Expr, String),!.
get_expr(active_doc, ur_active_doc()).

get_rside(call_func(Id, spread_list(RsideCall)), Rside):-
    get_rside(RsideCall, ToSpread),
    atom_string(ToSpread, StrToSpread),
    format(atom(Rside), '~s([...~s])', [Id, StrToSpread]), !.

get_rside(call_func(Id, Arg), Rside):-
    format(atom(Rside), '~s(~s)', [Id, Arg]), !.

get_rside(call_func(Id1, call_func(Id2, ExprFunc), Xpath), Rside):-
    get_expr(ExprFunc, Expression),
    format(atom(Rside), '~s(~s(~p), ~p);', [Id1, Id2, Expression, Xpath]), !.

get_rside(call_func(Id, Arg1, Arg2), Rside):-
    format(atom(Rside), '~s("~s", ~p);', [Id, Arg1, Arg2]), !.

get_rside(lambda(arg(Arg), Expr), Rside):-
    get_rside(Expr, OtherRside),
    atom_string(OtherRside, StrRside),
    format(atom(Rside), '~p => ~s', [Arg, StrRside]).

emit_js(const(id(Id), Expr), Output):-
    get_rside(Expr, Rside),
    atom_string(Rside, StrRside),
    format(Output, 'const ~p = ~s~n', [Id, StrRside]).

emit_js(let(id(Id), expr(Expr)), Output):-
    get_expr(Expr, MyExpr),
    format(Output, 'let ~p = ~p;~n', [Id, MyExpr]).

emit_js(return(Expr), Output):-
    get_rside(Expr, AtomRside),
    atom_string(AtomRside, StrRside),
    format(Output, 'return ~s;', [StrRside]).

emit_js(for_of(Var, of(Iterator), yield(ToYield)), Output):-
    get_rside(ToYield, Rside),
    atom_string(Rside, StrRside),
    format(Output, 'for(~s of ~s) {~n    yield ~s ~n}~n',[Var, Iterator, StrRside]).

emit_js(block([]), _).
emit_js(block([Instruction | InstList]), Output):-
    emit_js(Instruction, Output),
    emit_js(block(InstList), Output).

emit_js(declare_func(id(Id), arg(Arg), Block), Output):-
    format(Output, 'function ~s(~s) {~n', [Id, Arg]),
    emit_js(Block, Output),
    format(Output, '~n}~n', []).

emit_js(declare_generator(id(Id), args(Expr), Block), Output):-
    get_expr(Expr, FuncArgs),
    format(Output, 'function* ~s(~s) {~n', [Id, FuncArgs]),
    emit_js(Block, Output),
    format(Output, '~n}~n', []).


emit_js(declare_func(id(Id), Block), Output):-
    format(Output, 'function ~s() {~n', [Id]),
    emit_js(Block, Output),
    format(Output, '~n}~n', []).

emit_js(import, Output):-
    format(Output, 'import {ur_doc, ur_evaluate, ur_tag, ur_active_doc} from "./urquery.mjs"~n', []).


%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

test_emit_srcQuery :-
    open('output.js', write, Stream),
    to_js(in(src_query(uq_docpath(uq_expr(uq_id(uri))),xpath_expr("/li"))), JsAst),
    emit_js(JsAst, Stream),
    close(Stream).

test_emit_lambda :-
    open('output.js', write, Stream),
    JsAst = const(id(ul_tag), lambda(arg(children), call_func(ur_tag, "ul", children))),
    emit_js(JsAst, Stream),
    close(Stream).

test_emit_forQuery:-
    open('output.js', write, Stream),
    to_js(uq_for(uq_qvar(li),in(src_query(uq_docpath(uq_expr(uq_id(uri))),xpath_expr("/li"))),returns(uq_varquery(uq_vartag(uq_tag(li),uq_varpath(uq_qvar(li)))))), JsAst),
    emit_js(JsAst, Stream),
    close(Stream).

test_emit_tag_query:-
    open('output.js', write, Stream),
    UqAst = uq_tagquery(tag(ul),uq_for(uq_qvar(li),in(src_query(uq_docpath(uq_expr(uq_id(uri))),xpath_expr("/li"))),returns(uq_varquery(uq_vartag(uq_tag(li),uq_varpath(uq_qvar(li)))))),location(uq_id(uri))),
    to_js(UqAst, JsAst),
    emit_js(JsAst, Stream),
    close(Stream).

test_emit_urquery:-
    open('input.txt', read, InputStream),
    read_stream_to_codes(InputStream, Codes),
    phrase(prog_urquery(UqAst), Codes), !,
    close(InputStream),
    % UqAst = urquery(let(uq_id(uri),uq_expr(active_doc),in(uq_tagquery(tag(ul),uq_for(uq_qvar(li),in(src_query(uq_docpath(uq_expr(uq_id(uri))),xpath_expr("/li"))),returns(uq_varquery(uq_vartag(uq_tag(li),uq_varpath(uq_qvar(li)))))),location(uq_id(uri)))))),
    to_js(UqAst, JsAst), !,
    open('output.js', write, Stream),
    emit_js(JsAst, Stream),
    close(Stream), !.