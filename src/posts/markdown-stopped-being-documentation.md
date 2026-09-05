---
title: "Markdown Stopped Being Documentation"
date: 2026-09-05T08:00
thumb: "markglass-markdown-stopped-being-documentation.png"
description: "Instruction files, agent prompts and skill definitions are markdown, and they now change what gets built. That's why I built MarkGlass, a free viewer for reading markdown you didn't write."
tags:
    - Markdown
    - Agents
    - Tools
---

Open any repo you've worked in recently and look at the markdown files. Not the
README. The other ones.

You'll probably find instruction files, prompt files, agent guidelines, skill
definitions. Files that don't explain the system to a person. Files that tell an
AI how to behave.

Three years ago those didn't exist. Now they sit in the same folder as the source
code, they go through the same pull requests, and they change what gets built.

We just haven't started treating them that way.
<!-- excerpt -->

## A README and an instruction file are not the same thing

If a README is wrong, someone is confused for ten minutes and then asks a
colleague. The cost is small and self-correcting.

If an instruction file is wrong, nothing looks broken. The agent reads it,
behaves slightly differently than you intended, and produces code that seems
plausible. You find out two days later.

And these files fail in quiet, formatting-shaped ways. A code fence that never
closes swallows the next three sections. A nested list flattens and loses its
meaning. A table renders as a wall of pipe characters. The file still "looks
fine" in a plain text editor. It isn't fine.

Which means reading markdown carefully has quietly become part of the job. Not
skimming it. Reviewing it, the way you'd review a config change.

## So I built a viewer that takes it seriously

Nothing glamorous. [MarkGlass](https://markglass.app/) is a markdown viewer
that renders complex documents properly: real tables, diagrams, maths,
syntax-highlighted code, a table of contents you can navigate a 900-line file
with, find-in-page, dark mode, clean printing.

It's built for a specific job that most markdown tools aren't: reading a
document someone else wrote. Every editor-plus-preview tool — Dillinger,
StackEdit, the VS Code preview pane — assumes you're the author, and gives half
the screen to an editing pane you don't need. MarkGlass is just the reading
half. Full width, nothing to configure, drag a file in or open a link and it's
just the document.

The kind of tool nobody writes a press release about and everybody uses forty
times a day.

Two things about building it turned out to be more interesting than the tool
itself.

## Passing tests are not a working product

I had a couple of hundred automated tests. Every markdown feature covered.
Security cases covered. Error handling covered. All green.

Then I opened it in a browser and found three genuine bugs in about fifteen
minutes.

My favourite: images that never finished loading. I was showing a placeholder and
hiding the image until it loaded, and I'd also marked images as "lazy" so the
browser would only fetch them when they scrolled into view. Both are normal,
sensible things to do. Together they deadlock. A hidden image never enters the
viewport, so the browser never fetches it, so it never reports success or
failure, so the placeholder stays forever.

No test suite was going to catch that. It only exists in the gap between two
reasonable decisions, and only a real browser can show it to you.

This matters more now, not less. When a lot of code and a lot of tests get
generated quickly, a green test run starts to feel like proof. It isn't. It's
evidence that the things you thought to check are fine.

## The markdown you review is increasingly markdown you didn't write

It came from an agent, or a dependency's repo, or a skill someone shared in a
Slack channel.

Some of it is written specifically to instruct a model. That makes a markdown
file a realistic attack surface rather than a theoretical one, and it makes
"render this document safely" a security requirement instead of a checkbox.

So MarkGlass treats every document as untrusted. Scripts, iframes, forms and
embedded style blocks are stripped entirely. Event handlers are removed. Links
are validated twice. None of that is clever. It just used to feel like overkill
for a documentation tool, and it doesn't anymore.

Everything runs in the browser. Nothing you open is uploaded anywhere.

## The wider point

Markdown became infrastructure while we were all looking at the models.

It's worth asking what else quietly moved into that category, and whether the
tools you use to review it are good enough for what it's now doing.

Also: open the thing in a browser before you call it done.

---

MarkGlass is free, and it's at [markglass.app](https://markglass.app/).
