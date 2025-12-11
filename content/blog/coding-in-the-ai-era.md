---
title: "coding in the ai era"
date: 2025-12-11
description: "thanks to recent developments in llms, we can now write code with the help of ai. but i've struggled with picking tools that help me write better code."
tags:
  - ai
  - llms
  - tooling
---

## state of madness

if you have been following the recent news regarding the insanity of the ai industry, you may be aware of the countless developer oriented tooling that have been released in the past year or so.

these include, but are not limited to: [cursor](cursor.ai), [github copilot](https://github.com/copilot/), [claude code](https://claude.com/product/claude-code), [codex-cli](https://developers.openai.com/codex/cli/), [codex](https://openai.com/fi-FI/codex/), [amp](https://ampcode.com/), [windsurf](https://windsurf.com/), [gemini-cli](https://github.com/google-gemini/gemini-cli), [kimi-cli](https://github.com/MoonshotAI/kimi-cli), [opencode](https://opencode.ai/) and so on...

thanks to the generous investments made into the ai industry, many of these tools offer free tier plans for individual developers, allowing me to try them out without cost. despite this, i've struggled to find one that actually assists me in writing better code.

only recently have some of the models achieved a level of competence that i find useful (thank you [opus 4.5](https://www.anthropic.com/news/claude-opus-4-5)). more often than not, using ai feels more like babysitting. carefully observing what the model does, trying to predict its next move, and then correcting it when it goes wrong.

as far as i can tell, currently no tool allows for the user to interrupt the model when it's making a mistake, leaving the operator (me) with two options: completely halt the model and guide it towards the correct solution (and pray that it cleans up the previous mess), or revert the entire prompt and try again.

## the issue of scope and context

state of the art models like opus 4.5 are smart, sure, but they are also rather expensive to run. i don't know about you, but i don't happen to have the level of disposable income to let these models run for hours on end.

the two most common problems i experience are:

1. the model does not understand the scope of the request and goes off to implement something that was not requested
2. the model
   a. doesn't consume enough context and provides incomplete or incorrect code
   b. consumes too much context and gets confused, consuming many more tokens than necessary and many dollars from my wallet

one of the ways i've found to make the most out of my budget is to give the model a clear scope and context. that is, when these tools actually choose to respect the scope and context i give them. there are many open ended questions related to this topic, such as:

- what happens with unsaved files, is the model sent what is on disk or what is in the buffer?
- let's say that i have opened a folder that exists within a git repository, why does the model have access to the files in the root of the repository?

problems like these may appear small, but they can add up to a lot of frustration and wasted time. for example i recently worked on a rewrite of an application where the git repository had a `apps/web/` directory where i worked and a `legacy/` directory that contained old, irrelevant code. when using `github copilot` via `vscode`, the model would often use content from the `legacy/` directory when it should have been only using the content from the `apps/web/` directory, even though only `apps/web/` was given as context. i'm sure there is some trick to fix this by adding a `agents.md` file to the repository and outlining what it should do and when, and i'm sure it is very clever, but i truly do not understand why it just cannot respect context i give it!

scope is a different problem that i find even more vexing, since each model has their own way of interpreting what the request means. some are eager, some are lazy, some vary depending on which quantatization the provider happens to be serving.

`github copilot` has a nice answer for this: the user can specify which of three modes the model should use: `ask`, `write` or `agent`. you can probably infer the difference between these modes by their names. i mostly use `ask`, which limits the models access to write to files, instead writing code to the chat interface, where i can then inspect and modify it to my liking. `agent` mode is quite nice as well, but i do not trust it for anything larger than a small changes that i cannot be bothered to do myself.

## bottom line: what i want

i want less magic. i want to be in control of the process, not the other way around. i want to be able to know what the model is aware of, what it is planning to do, and i want to be able to interrupt it when it goes wrong. i want to be able to limit abilities of the model, such as disallowing it from writing to files, or disallowing it from accessing certain files or directories.

i don't think that is too much to ask.
