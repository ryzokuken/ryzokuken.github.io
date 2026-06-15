---
title: What even is Ecma? (Part 2)
date: Last Modified
tags:
  - post
  - igalia
  - work
  - ecma
---

In [Part 1][part1] I covered Ecma the organization. In Part 2, we'll talk about the technical committees (TCs) and task groups (TGs) — what they are and how they work. Then we'll go through [TC39][ecma-tc39], [TC53][ecma-tc53], and [TC55][ecma-tc55], the three main technical committees that work on JavaScript, and how each has its own set of rules, processes, and systems that help it serve its community and produce the standards it does.

Like any other standards body, the core function of Ecma is writing, publishing, and maintaining various documents, with each document maintained by a specific committee. Apart from these normative standards, Ecma also publishes informative technical reports, which are likewise produced by specific committees. You'll notice that the entirety of Ecma's technical output is organized and maintained by technical committees. Technical committees, then, are where the vast majority of the decision-making that directly affects programmers and software at large actually happens. Following Ecma's conventions, each TC and TG is numbered incrementally, which is why you get nondescriptive names like TC39 or TC39-TG2.

## Standards vs Technical Reports

You may be aware of one or more of the standards Ecma publishes — or, even if not the standards themselves, the technologies they standardize, like JSON or JavaScript. Technical reports (TRs) are a bit more complicated. These aren't normative documents to be followed to the letter in order to achieve conformance, but rather informative documents that help set the stage or reach a level of alignment on subjects where there can't be absolute convergence. A good example is [ECMA TR/104][tr104], which describes the ECMAScript test suite — the conformance tests that today live on as [Test262][test262], which we'll come back to later. They're still highly important despite their limited scope, and they're another product of Ecma alongside the popular standards we know and appreciate it for.

## Technical Committees

Technical committees are the fundamental technical unit of Ecma. Each one is chartered — standards-speak for "established with a set of goals codified in a document called the charter" — around a particular topic, and it generally works on producing standards and technical reports on that subject. There are three main technical committees in Ecma that deal with JavaScript in some shape or form, and as you'll notice, each of the three has a slightly different focus. The differences between them are a good way to see how committees can overlap while still retaining a large degree of structural and technical independence. Each standard, for instance, is published by a TC independently; it doesn't need another TC's approval to do so.

## Task Groups

For each committee, there may be a number of internal task groups. Each task group has its own charter, and therefore its own set of responsibilities that are more specific than those of its parent TC.

This is usually a way to delegate responsibility within a given TC. A large TC could hand off some highly specific work to a small group of people who form a TG — the most common scenario for task groups. A task group can then produce reports for the TC and for Ecma at large, or it can produce standards, though those require the rest of the technical committee to approve them, since a task group can't publish its own standards. It needs the rest of the TC to sign off on what it produced. But being smaller, more flexible, and less restrictive than a full-blown TC, it's the ideal venue for highly focused technical work with low latency and quick turnaround. After iterating on that work, the group can bring a more or less settled standard to the committee for comments, review, and final approval.

### TC53: ECMAScript® modules for embedded systems

* Chair: Peter Hoddie (Moddable)
* Secretary: Patrick Luthi (Ecma)
* Standards: [ECMA-419][ecma419] (ECMAScript® embedded systems API specification)

When it comes to embedded hardware, the constraints can be quite complex and in some ways very different from the ones those of us who work as browser engineers tend to think about. On the web platform, the biggest constraints are around networking and security; on embedded hardware, they tend to be about compute and memory. It becomes very important for embedded devices to ship optimized software that can actually run on the hardware. TC53 tries to bring some of the most interesting insights from embedded systems development together with the modularity and energy of the JavaScript ecosystem, defining standard APIs for embedded systems that can express all of the low-level needs of the developers who build for these environments while keeping the expressiveness and ease of use of the average JavaScript API.

### TC55: Web-interoperable server runtimes

* Chair: Andreu Botella (Igalia)
* Secretaries: Aki Rose Braun (Ecma) and Samina Husain (Ecma)
* Standards: [ECMA-429][ecma429] (Minimum common web API)

When referring to TC55, we often call it "WinterTC" (for "Web INTERoperable"), Ecma's equivalent of [WinterCG][wintercg], which is what this group used to be called. It started out in the W3C as a small group of dedicated stakeholders who were all building server-side JavaScript runtimes like Node.js, Deno, and Cloudflare Workers. Over time the scope widened to include any environment that isn't strictly browser-based. The main goal of this technical committee is to create a set of JavaScript APIs meant to work on "web-interoperable" JavaScript environments — a middle ground between JS as it behaves in web environments and non-web runtimes that don't have the same security considerations or constraints as a web browser, but that still benefit from familiar tooling and a similar API surface, and from JavaScript developers already being familiar with patterns and concepts they've picked up from years of using web technologies.

The core goal is simple: if there were a set of standardized, web-interoperable APIs that all of these tools could implement in their own native ways but consistently, it would let all of them provide a better experience to their users. It would also make it much easier for people to switch between tools and try things out, and significantly reduce the hurdle of learning new patterns and conventions for each tool when they essentially offer the same functionality.

### TC39: ECMAScript

* Chair group: Chris de Almeida (IBM), Rob Palmer (Bloomberg), Ujjwal Sharma (Igalia) (that's me!)
* Secretaries: Aki Rose Braun (Ecma) and Samina Husain (Ecma)
* Standards:
    * [ECMA-262][ecma262] (ECMAScript® 2025 language specification)
    * [ECMA-402][ecma402] (ECMAScript® 2025 internationalization API specification)
    * [ECMA-404][ecma404] (The JSON data interchange syntax)
    * [ECMA-414][ecma414] (ECMAScript® specification suite)
    * [ECMA-426][ecma426] (Source map format specification)

#### TG1: General ECMAScript® language

This is the large, overarching task group that helps us make sense of the programming language and standardize it. This is what we internally call the plenary: the large group of people who are generally interested in JavaScript and keenly following all the new proposals coming in, as well as formulating and working on those proposals behind the scenes, asynchronously. The task group itself meets more formally every two months — what we call the main TC39 plenary meetings — where the actual decision-making and the formal processes like stage advancements occur. This is also the task group that formally owns things like the ECMA-262 spec, as well as the [Test262][test262] infrastructure and other common TC39 infrastructure at large.

#### TG2: ECMAScript® internationalization API specification

Convenor: Shane Carr (Google)

This is the TC39 task group that specializes in internationalization, and it acts as the venue for both internationalization experts and the people working on the various i18n proposals within the committee — the group we bounce ideas off of. It meets every month, mostly asynchronously and online, and thinks much more deeply about the internationalization of JavaScript specifically: where it's headed and how it works. It also does important coordination between various people, such as the folks working on internationalization across browsers and other tools affected by JavaScript, as well as across other standards organizations that work on heavily overlapping subjects — most predominantly the [W3C's i18n working group][w3c-i18n] and [Unicode][unicode], among other industry and standards groups in this area.

#### TG3: Security

Convenors: Chris de Almeida (IBM), Jordan Harband (Socket), Kris Kowal (Agoric Systems)

Task group three is about security. As you may know, while JavaScript is most popularly used on the web — which has its own security model, enforced on the web side with many constraints specific to the web as a platform — there are other JavaScript environments, and they need a security model too. Sometimes it just isn't the same as the web's, or it needs to be something more specialized. TG3 is a collection of stakeholders who are all interested in security in one way or another, and it's exactly the place where they can come together to think about general ECMAScript security. They consider the ongoing work within TC39 and how it affects the overall security picture of the language, and they help us keep the language secure and working in environments where immutability — or security in other ways — is not optional.

#### TG4: Source map specification

Convenors: Jonathan Kuperman (Bloomberg), Nicolò Ribaudo (Igalia)

If you spend any considerable time developing for the web, you're probably aware of source maps and how instrumental they can be in helping developers balance their needs in a healthy way. This technical format, however, was never properly specified; it worked only thanks to very deliberate collaboration between various stakeholders.

With TG4, we've put all of that behind us and started working on a unified source map specification, which has now been published under Ecma as a standard. This route, with close coordination with TC39, helps us stay connected to the wider web tooling ecosystem and its developers.

Beyond the spec itself, another important task for TG4 is to define the specification strongly enough that we can determine whether implementations are conformant, and to produce a set of conformance tests that would help unify the existing problem space.

#### TG5: Experiments in programming language standardization

Convenors: Mikhail Barash (University of Bergen), Michael Ficarra (F5 Networks), Yulia Startsev (Mozilla)

TG5 is our primary connector to — and socializer with — the academic and research community. The goal of the task group is simple: to put forward and disseminate research on language standardization in general, and ECMAScript standardization in particular. They connect us to the rest of the programming, academic, and standardization space; they help provide liaisons with other Ecma TCs and other standards bodies to facilitate our work; and they help us find prior art in other technologies, propagate our own ideas about programming language standardization, and share our value system. Being the newest task group, it's very well liked and appreciated in the community.

## Conclusion

This was a cliff-notes-style summary of the various groups and committees that work together, largely asynchronously, to produce the amazing mosaic that is the JavaScript programming language. Out of all of these, due to my obvious bias, TC39 is the most important: the core language standard, along with many of the key proposals, is discussed there. In the next post in this series, we'll go deeper into TC39 — its process, and how various changes to the language are proposed, discussed, polished, and shipped.

[part1]: /blog/about-ecma-1/
[ecma-tc39]: https://ecma-international.org/technical-committees/tc39/
[ecma-tc53]: https://ecma-international.org/technical-committees/tc53/
[ecma-tc55]: https://ecma-international.org/technical-committees/tc55/
[ecma262]: https://ecma-international.org/publications-and-standards/standards/ecma-262/
[ecma402]: https://ecma-international.org/publications-and-standards/standards/ecma-402/
[ecma404]: https://ecma-international.org/publications-and-standards/standards/ecma-404/
[ecma414]: https://ecma-international.org/publications-and-standards/standards/ecma-414/
[ecma419]: https://ecma-international.org/publications-and-standards/standards/ecma-419/
[ecma426]: https://ecma-international.org/publications-and-standards/standards/ecma-426/
[ecma429]: https://ecma-international.org/publications-and-standards/standards/ecma-429/
[test262]: https://github.com/tc39/test262
[tr104]: https://ecma-international.org/publications-and-standards/technical-reports/ecma-tr-104/
[wintercg]: https://wintercg.org/
[w3c-i18n]: https://www.w3.org/International/core/
[unicode]: https://home.unicode.org/
