---
layout: layout.njk
title: Ryzokuken Uses
---

# Stuff I Use

Am I missing something that you'd like to know? [Hit me up on Twitter](https://twitter.com/messages/compose?recipient_id=453076986) and let me know. I'd be happy to add anything I might have missed out.

**NOTE:** This was intended to be a fun little experiment inspired by similar pages (which have helped me a lot) from community figures like [Wes Bos](https://wesbos.com/uses/) and [Kent C. Dodds](https://kentcdodds.com/uses/). I decided to give it a little twist recently by noting down both my original choices and the best open-source alternative (that I should either be using or shifting towards gradually) alongside the rationale.

## Code

1. **Editor**: I use [Visual Studio Code Insiders Edition](https://code.visualstudio.com/insiders/) for the awesome community and ecosystem, but I'm still not quite over Vim's awesome keybindings, so I use [VSCodeVim](https://marketplace.visualstudio.com/items?itemName=vscodevim.vim) to emulate the essential keybindings and a few life-saving plugins.
1. **Terminal Emulator**: I use [iTerm2](https://www.iterm2.com/) and it works perfectly for me. I've tried to use [Hyper](https://hyper.is/) multiple times in the past but I keep coming back to iTerm2 for some reason.
1. **Language Server**: I use Microsoft's [vscode-cpptools](https://marketplace.visualstudio.com/items?itemName=ms-vscode.cpptools) as my language server of choice since it pretty much does everything with little to no configuration and *just works*™️. I used to use [cquery](https://github.com/cquery-project/cquery) and [vscode-cquery](https://github.com/cquery-project/vscode-cquery) previously for obvious reasons, but I don't think I need it anymore.

## Aesthetic

1. **Shell**: I use [zsh](http://www.zsh.org/) as my default login shell with the [oh-my-zsh](https://ohmyz.sh/) framework and the [bureau](https://github.com/robbyrussell/oh-my-zsh/wiki/themes#bureau) prompt.
1. **Color Theme**: I have tried so many color themes in the past, but every since the days of Sublime Text 3, I always find myself coming back to Ayu's Mirage flavor. Currently I am using [vscode-ayu](https://github.com/ayu-theme/vscode-ayu) in VSCode and [an Ayu adaptation for iTerm2](https://github.com/mbadolato/iTerm2-Color-Schemes/blob/master/schemes/ayu.itermcolors) for the terminal.

## Hardware

Coming Soon™️

## Software

1. **Cloud Provider**<br>
   Original Choice: Dropbox<br>
   OSS Alternative: NextCloud<br>
   Rationale: A detailed comparison of Nextcloud and popular alternatives is available [here](https://nextcloud.com/compare/), which includes Dropbox and Google Drive. You will notice that Nextcloud just blows the competition out of the water. Add to that the fact that it's OSS unlike Dropbox, and you have a clear winner here.

1. **Chat Platform/Protocol**<br>
   Original: Slack/Discord<br>
   OSS Alternative: Matrix/IRC<br>
   Rationale: This is a no-brainer. I've always used, loved and preferred IRC but had to use Slack (or sometimes Discord) for work-related communications. Thankfully, Igalia uses matrix for internal communications and that allows me to stay in my terminal where I have my cozy Weechat perfectly configured for myself. I'm generally a big believer of (open) protocols over (closed) platforms.

1. **Chat Client**<br>
   Original: Slack/Discord<br>
   OSS Alternative: Riot/Weechat<br>
   Rationale: As I mentioned above, I'm a strong believer of (open) protocols over (closed) platforms, which largely stems from the distateful experience when you attempt to use these platforms from your preferred chat client (which in my case is Weechat). This experience ranges from the absolutely horrendous Discord literally banning the use of 3rd party clients to Slack being fairly good and everyone else somewhere in the middle. I stick to my neatly configured Weechat client, which can connect to bounced and unbouced IRC servers, Matrix servers and Slack workspaces.

1. **Password Manager**<br>
   Original: Lastpass<br>
   OSS Alternative: Keepass<br>
   Rationale: Now this is a little convoluted since I've used Lastpass for quite a while and heavily depend on it. I'm trying to gradually move to Keepass and will try to use Nextcloud as the storage for my passwords, but it will be very very hard to move away from Lastpass.

## Personal

1. **Coffee Grinder**: I use the original [Hario Skerton](https://www.hario.jp/seihin/productgroup.php?group=MSCS-2TB) hand grinder with conical ceramic burrs for the perfect grind.

1. **Brewer**: I use a run-of-the-mill (pun intended) standard glass French Press for my brewing. I might use an Aeropress at some point while travelling or you might catch me trying a paper filter or even a Chemex, but I'm pretty positive that I'll stick to my press for my daily brewing.

<style>
.container li {
  font-size: 1.5rem;
  margin: 2rem 0;
}
</style>
